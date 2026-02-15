'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import WorkspaceTabs from './wsTabs';
import WorkspaceShell from './wsShell';
import { Ticket } from '@/types/ticket';
import { Button } from '@/assets/buttons';
import WorkspaceWidgets from './wsWidgets';
import { useAuth } from '@/providers/auth';
import { Search } from '@mui/icons-material';
import { useTickets } from '@/providers/tickets';
import TicketsList from '../../../_level_2/_list';
import TicketBoard from '../../../_level_2/_board';
import { Stack, TextField, InputAdornment } from '@mui/material';
import { TICKET_STATUSES, TICKET_LIST_HEADERS,} from '../../../_level_0/constants';
import { useTeamTicket } from '@/providers/teamTickets';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export default function TeamTicketsWorkspace() {
  const { tickets, updateTicket } = useTeamTicket();
  const { isAuthenticated } = useAuth();

  const [view, setView] =
    useState<'board' | 'list' | 'timeline' | 'gantt'>('board');

  const [grouped, setGrouped] = useState<Record<string, Ticket[]>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);

  const now = new Date();

  const isOverdue = (due: string | Date | null | undefined) =>
    due ? new Date(due) < now : false;

  const isDueToday = (due: string | Date | null | undefined) => {
    if (!due) return false;
    const d = new Date(due);
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  const isCreatedThisWeek = (createdAt: string | Date | null | undefined) => {
    if (!createdAt) return false;

    const created = new Date(createdAt);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return created >= startOfWeek;
  };

  const filteredTickets = useMemo(() => {
    if (!debouncedQuery.trim()) return tickets;

    const q = debouncedQuery.toLowerCase();

    return tickets.filter(t =>
      [
        t.title,
        t.description,
        t.status,
        t.assignedTo?.name,
        t.tags?.join(' ')
      ]
        .filter(Boolean)
        .some(field => field!.toLowerCase().includes(q))
    );
  }, [tickets, debouncedQuery]);

  useEffect(() => {
    const map: Record<string, Ticket[]> = {};
    TICKET_STATUSES.forEach(s => (map[s] = []));

    filteredTickets.forEach(t => {
      const status = t.status || 'OPEN';
      if (map[status]) map[status].push(t);
      else map['OPEN'].push(t);
    });

    setGrouped(map);
  }, [filteredTickets]);

  const stats = useMemo(() => {
    return {
      total: filteredTickets.length,
      overdue: filteredTickets.filter(t => isOverdue(t.dueDate)).length,
      dueToday: filteredTickets.filter(t => isDueToday(t.dueDate)).length,
      inProgress: filteredTickets.filter(
        t => t.status === 'IN_PROGRESS'
      ).length,
      createdThisWeek: filteredTickets.filter(t =>
        isCreatedThisWeek(t.createdAt)
      ).length,
      completed: filteredTickets.filter(
        t => t.status === 'RESOLVED' || t.status === 'CLOSED'
      ).length,
    };
  }, [filteredTickets]);

  const openDetail = (id: number) => setSelected(id);

  const DateToday = () => (
    <Stack textAlign={{ xs: 'center', sm: 'left'}}>
      <strong>{now.toDateString()}</strong>
    </Stack>
  )

  if (!isAuthenticated) return <WorkspaceShell><DateToday /></WorkspaceShell>

  return (
    <WorkspaceShell>
      <Stack mb={2.5} direction={'row'} justifyContent={'space-between'}>
        <DateToday />
        <Button tone='action' component={Link} href={'tickets/create'}> New Ticket</Button>
      </Stack>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', lg: 'flex-start' }}
        mb={3}
      >
        <WorkspaceWidgets {...stats} />
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tickets..."
          size="small"
          sx={{
            width: { xs: '100%', sm: 300 },
            alignSelf: { xs: 'stretch', lg: 'flex-start' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {view === 'board' && (
        <TicketBoard
          grouped={grouped}
          setGrouped={setGrouped}
          openDetail={openDetail}
          isSearching={!!debouncedQuery}
          updateTicket={updateTicket}
        />
      )}
      {view === 'list' && (
        <TicketsList
          columns={TICKET_LIST_HEADERS}
          tickets={filteredTickets}
          onOpen={openDetail}
        />
      )}

      <WorkspaceTabs
        view={view}
        setView={setView}
        isEnterprise={false}
      />
    </WorkspaceShell>
  );
}
