'use client'

import { Box } from '@mui/material';
import { Ticket } from '@/types/ticket';
import TicketsList from '../_level_2/_list';
import TicketBoard from '../_level_2/_board';
import Toolbar from '../_level_2/ticketToolbar';
import { useTickets } from '@/providers/tickets';
import TicketFormDrawer from '../_level_2/ticketTaskFormsDrawer';
import TicketDetailDrawer from '../_level_2/ticketDrawer';
import React, { useEffect, useMemo, useState } from 'react';
import { TICKET_STATUSES, TICKET_LIST_HEADERS } from '../_level_1/constants';

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const TicketsPage: React.FC = () => {
  const { tickets, fetchTickets } = useTickets();
  const [newTickets, setTickets] = useState<Ticket[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Ticket[]>>({});
  const [selectedTicket, setSelectedTicket] = useState<string | number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [view, setView] = useState<'board' | 'list'>(() => {
    if (typeof window !== 'undefined') 
      return (localStorage.getItem('tictask_view') as 'board' | 'list') || 'board';
    return 'board';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('tictask_view', view);
  }, [view]);

  useEffect(() => {
    setTickets(tickets);
  }, [tickets]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    if (!debouncedQuery) return newTickets;
    const q = debouncedQuery.toLowerCase();

    return newTickets.filter((t) =>
      [t.title, t.description, t.status, t.assignee, t.tags?.join(' ')]
        .filter(Boolean)
        .some((field) => field?.toLowerCase().includes(q))
    );
  }, [newTickets, debouncedQuery]);

  useEffect(() => {
    const map: Record<string, Ticket[]> = Object.fromEntries(
      TICKET_STATUSES.map((s) => [s, []])
    );

    const priorityOrder = { URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };

    const sorted = [...filteredTickets].sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (a.dueDate && b.dueDate) {
        const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (diff !== 0) return diff;
      }
      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    sorted.forEach((t) => {
      if (map[t.status]) map[t.status].push(t);
      else map['OPEN'].push(t);
    });

    setGrouped(map);
  }, [filteredTickets]);

  const openDetail = (id: string | number) => setSelectedTicket(id);
  const closeDetail = () => setSelectedTicket(null);

  const onTicketCreated = (t: Ticket | void) => 
    setTickets((prev) => [t, ...prev] as Ticket[]);

  const refreshTickets = async () => {
    await fetchTickets();
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, minHeight: '75vh' }}>
      <Toolbar
        view={view}
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreate={() => setFormOpen(true)}
      />

      {view === 'board' ? (
        <TicketBoard
          grouped={grouped}
          setGrouped={setGrouped}
          openDetail={openDetail}
          isSearching={!!debouncedQuery}
        />
      ) : (
        <TicketsList 
          list={TICKET_LIST_HEADERS}
          tickets={filteredTickets} 
          openDetail={openDetail} 
        />
      )}

      <TicketDetailDrawer
        open={!!selectedTicket}
        onClose={closeDetail}
        ticketId={selectedTicket !== null ? String(selectedTicket) : null}
        onUpdate={refreshTickets}
      />

      <TicketFormDrawer
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={onTicketCreated}
      />

      <Box bottom={0} right={0} display={'flex'} justifyContent={'right'}>
        <section style={{ position: 'fixed', bottom: 25, right: 25, height: 50, width: 50}} id='ai-assistant-trigger'/>
      </Box>
    </Box>
  );
};

export default TicketsPage;
