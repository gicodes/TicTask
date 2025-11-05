'use client';
import { Box } from '@mui/material';
import { Ticket } from '@/types/ticket';
import PlannerList from '../_level_2/_list';
import { useTickets } from '@/providers/tickets';
import PlannerCalendar from '../_level_2/_calendar';
import TaskFormDrawer from '../_level_2/ticketForm';
import PlannerToolbar from '../_level_2/plannerToolbar';
import TaskDetailDrawer from '../_level_2/ticketDetail';
import React, { useEffect, useMemo, useState } from 'react';
import { TASK_LIST_HEADERS } from '../_level_1/constants';

const PlannerPage: React.FC = () => {
  const { tickets, fetchTickets } = useTickets();
  const [filtered, setFiltered] = useState(tickets);
  const [newTaks, setTasks] = useState<Ticket[]>([]);
  const [view, setView] = useState<'calendar' | 'list'>(() => {
    if (typeof window !== 'undefined')
      return (localStorage.getItem('planner_view') as 'calendar' | 'list') || 'calendar';
    return 'calendar';
  });

  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('planner_view', view);
  }, [view]);

  const filteredTickets = useMemo(() => {
    if (!search) return tickets;
    const q = search.toLowerCase();
    return tickets.filter((t) =>
      [t.title, t.description, t.status, t.assignee]
        .filter(Boolean)
        .some((f) => f?.toLowerCase().includes(q))
    );
  }, [tickets, search]);

  const onTaskCreated = (t: Ticket) => setTasks((prev) => [t, ...prev]);
  const openDetail = (id: string | number) => setSelected(id);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, minHeight: '75vh' }}>
      <PlannerToolbar
        view={view}
        setView={setView}
        onOpenCreate={() => setFormOpen(true)}
        searchQuery={search}
        setSearchQuery={setSearch}
      />

      {view === 'calendar' ? (
        <PlannerCalendar tasks={filteredTickets} onSelectTask={setSelected} />
      ) : (
        <PlannerList list={TASK_LIST_HEADERS} tickets={filteredTickets} openDetail={openDetail} />
      )}

      <TaskDetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        ticketId={selected}
        onUpdate={fetchTickets}
      />

      <TaskFormDrawer
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={onTaskCreated}
      />
    </Box>
  );
};

export default PlannerPage;
