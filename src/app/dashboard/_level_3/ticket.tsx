import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Ticket } from '@/types/ticket';

import { api } from '../_level_1/tApi';
import Board from '../_level_2/_board';
import Toolbar from '../_level_2/toolbar';
import TicketFormDrawer from '../_level_2/ticketForm';
import TicketDetailDrawer from '../_level_2/ticketDetail';
import TicketsList from '../_level_2/_list';

const STATUSES = ['UPCOMING','OPEN','IN_PROGRESS','RESOLVED','CLOSED','CANCELLED'];

const TicketsBoardPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [grouped, setGrouped] = useState<Record<string,Ticket[]>>({});
  const [selectedTicket, setSelectedTicket] = useState<string | number |null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [view, setView] = useState<'board'|'list'>('board');

  useEffect(() => {
    api.getTickets().then(setTickets);
  }, []);

  useEffect(() => {
    const map: Record<string, Ticket[]> = {};
    STATUSES.forEach(s => map[s] = []);
    tickets.forEach(t => (map[t.status] ?? map['OPEN']).push(t));
    setGrouped(map);
  }, [tickets]);

  const openDetail = (id: string | number) => setSelectedTicket(id);
  const closeDetail = () => setSelectedTicket(null);

  const onTicketCreated = (t: Ticket) => {
    setTickets(prev => [t, ...prev]);
  };

  const refreshTickets = () => {
    api.getTickets().then(setTickets);
  };

  return (
    <Container maxWidth='xl'>
      <Box maxWidth={1400} sx={{ py: 2 }} width={'100%'}>
        <Toolbar view={view} setView={setView} onOpenCreate={() => setFormOpen(true)} />

        {view === 'board'
        ? <Board grouped={grouped} setGrouped={setGrouped} openDetail={openDetail} />
        : (
          <TicketsList tickets={tickets} openDetail={openDetail} />
        )}

      <TicketDetailDrawer
        open={!!selectedTicket}
        onClose={closeDetail}
        ticketId={selectedTicket !== null ? String(selectedTicket) : null}
        onUpdate={refreshTickets}
      />
      <TicketFormDrawer open={formOpen} onClose={() => setFormOpen(false)} onCreated={onTicketCreated} />
      </Box>
    </Container>
  );
};

export default TicketsBoardPage;