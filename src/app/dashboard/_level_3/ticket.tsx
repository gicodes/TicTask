import { Box } from '@mui/material';
import { api } from '../_level_1/tApi';
import { Ticket } from '@/types/ticket';
import Toolbar from '../_level_2/toolbar';
import TicketsList from '../_level_2/_list';
import TicketBoard from '../_level_2/_board';
import TicketFormDrawer from '../_level_2/ticketForm';
import { TICKET_STATUSES } from '../_level_1/constants';
import TicketDetailDrawer from '../_level_2/ticketDetail';
import React, { useEffect, useMemo, useState } from 'react';
import { apiGet } from '@/lib/api';
import { useAuth } from '@/providers/auth';
import { TicketsRes } from '@/types/axios';
import { useAlert } from '@/providers/alert';
import { useTickets } from '@/providers/tickets';

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const TicketsPage: React.FC = () => {
  const { tickets } = useTickets();
  const [newTickets, setTickets] = useState<Ticket[] | []>([]);
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
    setTickets(tickets)
  }, [view]);

  const filteredTickets = useMemo(() => {
    if (!debouncedQuery) return newTickets;
    const q = debouncedQuery.toLowerCase();

    return newTickets?.filter((t) =>
      [t.title, t.description, t.status, t.assignee, t.tags?.join(' ')]
        .filter(Boolean)
        .some((field) => field?.toLowerCase().includes(q))
    );
  }, [newTickets, debouncedQuery]);

  useEffect(() => {
    const map: Record<string, Ticket[]> = Object.fromEntries(
      TICKET_STATUSES.map((s) => [s, []])
    );

    const sorted = [...filteredTickets].sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (a.dueDate && b.dueDate) {
        const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (diff !== 0) return diff;
      }
      const priorityOrder = { URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };
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
  const onTicketCreated = (t: Ticket) => setTickets((prev) => [t, ...prev]);
  const refreshTickets = () => api.getTickets().then(setTickets);
  
  const reversedTickets = useMemo(() => [...filteredTickets]?.reverse(), [filteredTickets]);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Toolbar
        view={view}
        setView={setView}
        onOpenCreate={() => setFormOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {view === 'board' ? (
        <TicketBoard
          grouped={grouped}
          setGrouped={setGrouped}
          openDetail={openDetail}
          isSearching={!!debouncedQuery}
        />
      ) : (
        <TicketsList tickets={reversedTickets} openDetail={openDetail} />
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
    </Box>
  );
};

export default TicketsPage;