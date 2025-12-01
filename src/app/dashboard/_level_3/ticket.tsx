'use client'

import { Box } from '@mui/material';
import { Ticket } from '@/types/ticket';
import TicketsList from '../_level_2/_list';
import TicketBoard from '../_level_2/_board';
import Toolbar from '../_level_2/ticketsPageToolbar';
import { useTickets } from '@/providers/tickets';
import TicketFormDrawer from '../_level_2/CNTFormsDrawer';
import TicketDetailDrawer from '../_level_2/TWSMiniDrawer';
import React, { useEffect, useMemo, useState } from 'react';
import { TICKET_LIST_HEADERS, TICKET_STATUSES } from '../_level_0/constants';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  
  return debounced;
}

const TicketsPage: React.FC = () => {
  const { tickets, fetchTickets, updateTicket } = useTickets();
  const [grouped, setGrouped] = useState<Record<string, Ticket[]>>({});
  const [selectedTicket, setSelectedTicket] = useState<string | number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);

  const [view, setView] = useState<'board' | 'list'>(() => {
    if (typeof window === 'undefined') return 'board';
    
    return (localStorage.getItem('tictask_view') as 'list' | 'board') || 'board';
  });

  useEffect(() => {
    localStorage.setItem('tictask_view', view);
  }, [view]);

  const filteredTickets = useMemo(() => {
    if (!debouncedQuery.trim()) return tickets;
    const q = debouncedQuery.toLowerCase();
    
    return tickets.filter(t =>
      [t.title, t.description, t.status, t.assignedTo?.name, t.tags?.join(' ')]
        .filter(Boolean).some(field => field!.toLowerCase().includes(q))
    );
  }, [tickets, debouncedQuery]);

  useEffect(() => {
    const map: Record<string, Ticket[]> = {};
    TICKET_STATUSES.forEach(s => map[s] = []);

    filteredTickets.forEach(t => {
      const status = t.status || 'OPEN';
      if (map[status]) map[status].push(t);
      else map['OPEN'].push(t);
    });

    setGrouped(map);
  }, [filteredTickets]);

  const openDetail = (id: string | number) => setSelectedTicket(id);
  const closeDetail = () => setSelectedTicket(null);
  const refresh = () => fetchTickets(true);

  return (
    <Box 
      sx={{ 
        minHeight: '75vh', 
        p: { xs: 1, sm: 2, md: 3 }, 
      }}
    >
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
          updateTicket={() => updateTicket}
        />
      ) : (
        <TicketsList
          columns={TICKET_LIST_HEADERS}
          tickets={filteredTickets}
          onOpen={openDetail}
        />
      )}

      <TicketDetailDrawer
        open={!!selectedTicket}
        onClose={closeDetail}
        ticketId={selectedTicket ? selectedTicket : undefined}
        onUpdate={refresh}
      />

      <TicketFormDrawer
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={() => {
          setFormOpen(false);
          refresh();
        }}
      />

      <Box sx={{ position: 'fixed', bottom: 25, right: 25, zIndex: 10 }}>
        <section id="ai-assistant-trigger" style={{ width: 50, height: 50 }} />
      </Box>
    </Box>
  );
};

export default TicketsPage;