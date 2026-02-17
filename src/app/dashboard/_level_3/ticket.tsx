'use client'

import { Box, Divider, Drawer, Typography } from '@mui/material';
import { CloseSharp } from '@mui/icons-material';
import { Ticket } from '@/types/ticket';
import TicketsList from '../_level_2/_list';
import TicketBoard from '../_level_2/_board';
import { useTickets } from '@/providers/tickets';
import Toolbar from '../_level_2/ticketsPageToolbar';
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
  const [formOpen, setFormOpen] = useState(false);
  const [grouped, setGrouped] = useState<Record<string, Ticket[]>>({});
  const [selectedTicket, setSelectedTicket] = useState<string | number | null>(null);
  const [view, setView] = useState<'board' | 'list'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);
  const [readAboutTickets, setReadAboutTickets] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tictask_view');
    if (stored === 'list' || stored === 'board') {
      setView(stored);
    }
  }, []);

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

  const openDetail = (id: number) => setSelectedTicket(id);
  const closeDetail = () => setSelectedTicket(null);
  const refresh = () => fetchTickets(true);

  return (
    <Box 
      sx={{ 
        minHeight: '75vh', 
        p: { xs: 1, sm: 2, md: 3 }, 
      }}
    >
      <Box mb={-1} display="flex" justifyContent="flex-end">
        <Typography
          sx={{ cursor: 'pointer', borderBottom: '1px solid cornflowerblue', height: 'fit-content'}}
          onClick={() => setReadAboutTickets(true)}
        >
          What is a <strong>ticket?</strong>
        </Typography>
      </Box>

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

      <Drawer
        anchor="right"
        open={readAboutTickets}
        onClose={() => setReadAboutTickets(false)}
      >
        <Box sx={{ width: 360, p: 4, mt: 5 }}>
          <Box display={'flex'} justifyContent={'end'} onClick={() => setReadAboutTickets(false)}> 
            <CloseSharp color="error" sx={{ boxShadow: 2, borderRadius: '50%', p: 1}} fontSize="large" /> 
          </Box>
          <Typography variant="h6" fontWeight={700} mb={2}>
            What are tickets?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }} mb={3}>
            Tickets are simple but powerful tools you can use to track and manage tasks, issues, or requests.{" "}
            They can represent anything that matter to you— a bug to fix, a project to complete, a client&apos;s invoice or even a personal goal.{" "}<br/>
            With customizable fields, statuses, and tags, tickets help you organize your work and collaborate with others effectively.
          </Typography>

          <Divider sx={{ my: 5 }} />

          <Typography fontWeight={600} mb={2}>
            Tickets Hub vs Task Manager?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }} mb={3}>
            While both tools are similar and help you manage tickets and tasks, <strong>Tickets Hub</strong> offers more flexibility in the kind of tickets you can create and manage.{" "}<br/>
            <strong>Task manager</strong> handle tickets more precisely with set deadlines on event-driven ticket types and a built-in calendar to track ticket due dates.{" "}
          </Typography>

          <Divider sx={{ my: 5 }} />

          <Typography fontWeight={600}>Best Use Cases</Typography>
          <ul style={{ padding: 10}}>
            <li>Project Management: Break down projects into actionable tasks and track progress.</li>
            <li>Event Planning: Organize events by creating tickets as meeting or events and send invitations.</li>
            <li>Personal Productivity: Keep track of your goals, habits, or anything you want to accomplish.</li>
            <li>Customer Support: Manage client requests and issues in an organized and efficient way.</li>
            <li>Team Collaboration: Assign tickets to team members, set deadlines on and communicate within tickets.</li>
            <li>Invoicing: Write invoices, bill clients by creating tickets as invoice and attack vital details.</li>
            <li>Community Notes: See updates from others by setting ticket comments.</li>
          </ul>
        </Box>
      </Drawer>

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

      <Box sx={{ position: 'fixed', bottom: 50, right: 25, zIndex: 10 }}>
        <section id="ai-assistant-trigger" style={{ width: 50, height: 50 }} />
      </Box>
    </Box>
  );
};

export default TicketsPage;