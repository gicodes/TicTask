'use client';

import { Box } from '@mui/material';
import { Ticket } from '@/types/ticket';
import { useAlert } from '@/providers/alert';
import { SlotInfo } from 'react-big-calendar';
import { useTickets } from '@/providers/tickets';
import PlannerList from '../_level_2/list/_list';
import PlannerToolbar from '../_level_2/taskPageToolbar';
import TaskDetailDrawer from '../_level_2/viewTicket/TWSMiniDrawer';
import { TASK_LIST_HEADERS } from '../_level_0/constants';
import React, { useEffect, useMemo, useState } from 'react';
import PlannerCalendar from '../_level_2/calendar/_calendar';
import TaskFormDrawer from '../_level_2/createTicket/CNTFormsDrawer';
import { DateSelectDialog } from '../_level_2/createTicket/CNTonClickDialog';

const PlannerPage = ({
  team = false,
  teamTickets,
  fetchTeamTickets
}: { 
  team: boolean 
  teamTickets?: Ticket[]
  fetchTeamTickets?: () => void;
}) => {
  const { showAlert } = useAlert()
  const { tickets, fetchTickets } = useTickets();
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  const [search, setSearch] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [createDate, setCreateDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('tictask_view');
    if (!team && stored === 'list' || stored === 'calendar') {
      setView(stored);
    }
  }, []);

  useEffect(() => {
    if (!team) localStorage.setItem('planner_view', view);
  }, [view]);

  const filteredTickets = useMemo(() => {
    if (!search) return team ? teamTickets : tickets;
    const q = search.toLowerCase();

    if (team) return teamTickets?.filter((t) =>
      [t.title, t.description, t.status, t.assignedTo?.name]
        .filter(Boolean)
        .some((f) => f?.toLowerCase().includes(q))
    );
    else return tickets.filter((t) =>
      [t.title, t.description, t.status, t.assignedTo?.name]
        .filter(Boolean)
        .some((f) => f?.toLowerCase().includes(q))
    );
  }, [tickets, teamTickets, search]);

  const onTaskCreated = () => {
    setFormOpen(false);
    setCreateDate(null); 
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setCreateDate(new Date(slotInfo.start));
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
      {!team && <PlannerToolbar
        view={view}
        setView={setView}
        onOpenCreate={() => setFormOpen(true)}
        searchQuery={search}
        setSearchQuery={setSearch}
      />}

      {team || view === 'calendar' ? (
        <PlannerCalendar
          tasks={filteredTickets!!}
          onSelectTask={(id) => setSelected(id)}
          onSelectSlot={handleSlotSelect} 
        />
      ) : (
        <PlannerList
          columns={TASK_LIST_HEADERS}
          tickets={filteredTickets!!}
          onOpen={(id: number) => setSelected(id)}
        />
      )}

      {!team && <>
        <TaskDetailDrawer
          open={!!selected}
          onClose={() => setSelected(null)}
          ticketId={selected ? String(selected) : undefined}
          onUpdate={team ? fetchTeamTickets : fetchTickets}
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
      </>
      }
    </Box>
  );
};

export default PlannerPage;
