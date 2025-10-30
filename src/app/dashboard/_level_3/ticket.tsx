import { Box } from '@mui/material';
import { api } from '../_level_1/tApi';
import { Ticket } from '@/types/ticket';
import Toolbar from '../_level_2/toolbar';
import TicketsList from '../_level_2/_list';
import TicketBoard from '../_level_2/_board';
import React, { useEffect, useState } from 'react';
import TicketFormDrawer from '../_level_2/ticketForm';
import { TICKET_STATUSES } from '../_level_1/constants';
import TicketDetailDrawer from '../_level_2/ticketDetail';

const TicketsBoardPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Ticket[]>>({});
  const [selectedTicket, setSelectedTicket] = useState<string | number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [view, setView] = useState<'board' | 'list'>('board');

  useEffect(() => {
    api.getTickets().then(setTickets);
  }, []);

  useEffect(() => {
    const map: Record<string, Ticket[]> = Object.fromEntries(
      TICKET_STATUSES.map((s) => [s, []])
    );

    tickets.forEach((t) => {
      if (map[t.status]) map[t.status].push(t);
      else map['OPEN'].push(t);
    });

    setGrouped(map);
  }, [tickets]);

  const openDetail = (id: string | number) => setSelectedTicket(id);
  const closeDetail = () => setSelectedTicket(null);

  const onTicketCreated = (t: Ticket) => {
    setTickets((prev) => [t, ...prev]);
  };

  const refreshTickets = () => {
    api.getTickets().then(setTickets);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Toolbar
        view={view}
        setView={setView}
        onOpenCreate={() => setFormOpen(true)}
      />

      {view === 'board' ? (
        <TicketBoard grouped={grouped} setGrouped={setGrouped} openDetail={openDetail} />
      ) : (
        <TicketsList tickets={tickets} openDetail={openDetail} />
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

export default TicketsBoardPage;