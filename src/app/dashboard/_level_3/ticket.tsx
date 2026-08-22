'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { CloseSharp } from '@mui/icons-material';
import { Ticket } from '@/types/ticket';
import { FaPlusCircle } from 'react-icons/fa';
import { useTickets } from '@/providers/tickets';
import TicketsList from '../_level_2/list/_list';
import TicketBoard from '../_level_2/board/_board';
import Toolbar from '../_level_2/ticketsPageToolbar';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import TicketDetailDrawer from '../_level_2/viewTicket/TWSMiniDrawer';
import TicketFormDrawer from '../_level_2/createTicket/CNTFormsDrawer';
import { PLANNER_TASK_TYPES, TICKET_LIST_HEADERS, TICKET_STATUSES, TICKET_TYPES } from '../_level_0/constants';
import Link from 'next/link';

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
    if (stored === 'board' || stored === 'list') {
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
        pt: { sm: 1, md: 2}
      }}
    >
      <Box mb={{ xs: 2 }} display="flex" justifyContent="flex-end">
        <Typography
          sx={{ 
            fontSize: { xs: 13, sm: 14, md: 15, lg: 16},
            opacity: 0.75,
            cursor: 'pointer', 
            height: 'fit-content',
            borderBottom: '1px solid cornflowerblue', 
          }}
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
        <Box sx={{ width: { xs: 360, sm: 400, lg: 500 }, py: 4, px: 3, mt: 5 }}>
          <Box display={'flex'} justifyContent={'end'} onClick={() => setReadAboutTickets(false)}> 
            <CloseSharp color="error" sx={{ boxShadow: 2, borderRadius: '50%', p: 1}} fontSize="large" /> 
          </Box>
          <Typography variant="h6" fontWeight={700} mb={2}>
            What are tickets?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }} mb={3}>
            Tickets are simple but powerful tools you can use to create & manage tasks, issues or events.{" "}
            They can represent anything that matter to you— bug to fix, project to finish, client invoice or even a personal goal.{" "}<br/>
            With customizable fields, statuses, and tags, tickets help you organize your work and collaborate with others effectively.
          </Typography>

          <Divider sx={{ my: 5 }} />

          <Typography variant="h6" fontWeight={700} mb={2}>
            Creating tickets?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Starts with identifying what kind of ticket you want to create.{" "}<br/>
            There are up to 12 different ticket types. Some have unique fields, features and use cases. 
            As you advance, you will find more ways to create, view and manage more complex tickets.
          </Typography>
          <br/>
          <Link href={'#'}>Ticket Hub</Link> lets you create <br/>
          <ul style={{ padding: 10}}>
            {TICKET_TYPES.map((type) => (
              <li key={type}>
                {type.slice(0,1).toUpperCase() + type.slice(1).toLowerCase().replace(/_/g, ' ')}</li>
            ))}
          </ul>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            You can manage more tickets via Board and List view. <br/> <br/> 
          </Typography> 

          <Link href={'/dashboard/tasks'}>Task Manager</Link> is an event-based ticket hub for<br/>
          <ul style={{ padding: 10}}>
            {PLANNER_TASK_TYPES.map((type) => (
              <li key={type}>
                {type.slice(0,1).toUpperCase() + type.slice(1).toLowerCase().replace(/_/g, ' ')}
              </li>
            ))}
          </ul>

          <Typography variant="body1">
            Similarly, you can manage more (event-based or timeline) tickets via Calendar and List view.
            <br/>
            To manually create a ticket, find and click<button className='btn'><span className='flex items-center gap-1'>
              <FaPlusCircle/> NEW TICKET</span>
            </button>
          </Typography>
          
          <Box 
            p={1} 
            my={1}  
            gap={1}
            display={'grid'} 
            borderRadius={2} 
            bgcolor={'rgba(0,0,0,0.07)'}
          >
            <Typography variant='caption' color='info'>Can&apos;t find it on your a mobile device?</Typography>
            <Typography fontSize={14} color='text.secondary'>✦ Expand toolbar (top-left corner) to see action buttons ✦<br/></Typography>
          </Box>

          <Divider sx={{ my: 5 }} />

          <Typography variant="h6" fontWeight={600} mb={2}>
            Ticket Hub vs Task Manager?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }} mb={3}>
            While both tools are similar and help you manage tickets, <strong>Ticket Hub</strong> offer range and simplicity.{" "}
            <strong>Task manager</strong> handle specific tickets with timeline & built-in calendar to track tickets.{" "}
          </Typography>

          <Divider sx={{ my: 5 }} />

          <Typography variant="h6" fontWeight={600}>Best Use Cases</Typography>
          <ul style={{ padding: 10}}>
            <li>Project Management: Break projects into actionable tickets & track progress.</li>
            <li>Customer Support: Manage personal or client requests & issues efficiently.</li>
            <li>Personal Productivity: Track your goals, habits, or anything worth accomplishing.</li>
            <li>Event Planning: Organize, invite others to events by creating tickets as events/ meeting via <strong>Task Manager</strong>.</li>
            <li>Team Collaboration: Assign tickets to team member(s), set deadlines, tags and communicate within tickets.</li>
            <li>Invoicing: Bill clients by creating tickets as invoice and attach vital details.</li>
            <li>Community Notes: See updates, activity log with ticket comments and history.</li>
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