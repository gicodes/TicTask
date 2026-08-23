'use client';

import { Box } from '@mui/material';
import { Ticket } from '@/types/ticket';
import { useRouter } from 'next/navigation';

import { useAlert } from '@/providers/alert';
import { SlotInfo } from 'react-big-calendar';
import { useTickets } from '@/providers/tickets';
import PlannerList from '../_level_2/list/_list';
import PlannerToolbar from '../_level_2/taskPageToolbar';
import { TASK_LIST_HEADERS } from '../_level_0/constants';
import React, { useEffect, useMemo, useState } from 'react';
import PlannerCalendar from '../_level_2/calendar/_calendar';
import TaskDetailDrawer from '../_level_2/viewTicket/TWSMiniDrawer';
import TaskFormDrawer from '../_level_2/createTicket/CNTFormsDrawer';
import { DateSelectDialog } from '../_level_2/createTicket/CNTonClickDialog';
import { PlannerCalendarProps } from '@/types/planner';

const Calendar = ({
  team = false,
  teamId,
  localTickets,
  fetchLocalTickets
}: PlannerCalendarProps) => { 
  const router = useRouter();
  const { showAlert, confirm } = useAlert()
  const { tickets, fetchTickets } = useTickets();
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  const [search, setSearch] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [createDate, setCreateDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('planner_view');
    if (!team && stored === 'list' || stored === 'calendar') {
      setView(stored);
    }
  }, []);

  useEffect(() => {
    if (!team) localStorage.setItem('planner_view', view);
  }, [view]);

  const filteredTickets = useMemo(() => {
    if (!search) return team ? localTickets : tickets;
    const q = search.toLowerCase();

    if (team) return localTickets?.filter((t) =>
      [t.title, t.description, t.status, t.assignedTo?.name]
        .filter(Boolean)
        .some((f) => f?.toLowerCase().includes(q))
    );
    else return tickets.filter((t) =>
      [t.title, t.description, t.status, t.assignedTo?.name]
        .filter(Boolean)
        .some((f) => f?.toLowerCase().includes(q))
    );
  }, [tickets, localTickets, search]);

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

  const handleSelectTeamEvent = async (ticketId: number) => {    
    if (!teamId) return

    const selectEvent = await confirm(
      "Do you want to open this ticket playground?",
      "Go to ticket?",
      "Open Ticket"
    )
    if (!selectEvent) return 

    router.push(`/dashboard/teams/${teamId}/tickets/${ticketId}`);
  }

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
          onSelectTask={team ? handleSelectTeamEvent : (ticketId: number) => setSelected(ticketId)}
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
          onUpdate={team ? fetchLocalTickets : fetchTickets}
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

export default Calendar;
