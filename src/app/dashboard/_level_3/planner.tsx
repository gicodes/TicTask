'use client';

import { Box } from '@mui/material';
import PlannerList from '../_level_2/_list';
import { useAlert } from '@/providers/alert';
import { useTickets } from '@/providers/tickets';
import PlannerCalendar from '../_level_2/_calendar';
import TaskFormDrawer from '../_level_2/CNTFormsDrawer';
import PlannerToolbar from '../_level_2/taskPageToolbar';
import TaskDetailDrawer from '../_level_2/TWSMiniDrawer';
import { TASK_LIST_HEADERS } from '../_level_0/constants';
import React, { useEffect, useMemo, useState } from 'react';
import { DateSelectDialog } from '../_level_2/CNTonClickDialog';

const PlannerPage: React.FC = () => {
  const { showAlert } = useAlert()
  const { tickets, fetchTickets } = useTickets();
  const [view, setView] = useState<'calendar' | 'list'>(() => {
    if (typeof window !== 'undefined') 
      return (localStorage.getItem('planner_view') as 'calendar' | 'list') || 'calendar';        
    return 'calendar';
  });
  const [search, setSearch] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [createDate, setCreateDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    localStorage.setItem('planner_view', view);
  }, [view]);

  const filteredTickets = useMemo(() => {
    if (!search) return tickets;
    const q = search.toLowerCase();

    return tickets.filter((t) =>
      [t.title, t.description, t.status, t.assignedTo?.name]
        .filter(Boolean)
        .some((f) => f?.toLowerCase().includes(q))
    );
  }, [tickets, search]);

  const onTaskCreated = () => {
    setFormOpen(false);
    setCreateDate(null); 
  };

  const handleSlotSelect = (slotInfo: { start: Date; end: Date }) => {
    setCreateDate(slotInfo.start);
    setDialogOpen(true);
  };

  const handleCreateConfirm = (date: Date) => {
    if (new Date > new Date(date)) {
      showAlert("Cannot plan for the past!", 'warning')
      return;
    }
    setCreateDate(date);
    setFormOpen(true);
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 1, sm: 2, md: 3 }, 
        minHeight: '75vh' 
      }}
    >
      <PlannerToolbar
        view={view}
        setView={setView}
        onOpenCreate={() => setFormOpen(true)}
        searchQuery={search}
        setSearchQuery={setSearch}
      />

      {view === 'calendar' ? (
        <PlannerCalendar
          tasks={filteredTickets}
          onSelectTask={(id) => setSelected(id)}
          onSelectSlot={handleSlotSelect} 
        />
      ) : (
        <PlannerList
          columns={TASK_LIST_HEADERS}
          tickets={filteredTickets}
          onOpen={(id) => setSelected(id)}
        />
      )}

      <TaskDetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        ticketId={selected ? String(selected) : undefined}
        onUpdate={fetchTickets}
      />

      <TaskFormDrawer
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setCreateDate(null);
        }}
        task
        onCreated={onTaskCreated}
        defaultDueDate={createDate || undefined}  
      />

      <DateSelectDialog
        open={dialogOpen}
        date={createDate}
        onConfirm={handleCreateConfirm}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  );
};

export default PlannerPage;
