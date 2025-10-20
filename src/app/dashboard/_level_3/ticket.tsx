import React, { useMemo } from 'react';
import { Box, Container, Stack, Button, Card } from '@mui/material';
import BoardColumn from '../_level_2/boardColumn';
import { mockTickets } from '../_level_0/seed';
import styles from '@/app/page.module.css'; 
import { Ticket, TicketPriority } from '@/types/ticket';

const STATUSES = ['UPCOMING','OPEN','IN_PROGRESS','RESOLVED','CLOSED','CANCELLED'];

const TicketsBoardPage: React.FC = () => {
  const grouped = useMemo(() => {
    const map: Record<string, Ticket[]> = {};
    STATUSES.forEach(s => (map[s] = []));
    mockTickets.forEach(t => {
      const s = t.status ?? 'OPEN';
      if (!map[s]) map[s] = [];
      map[s].push({
        ...t,
        priority: t.priority as TicketPriority,
      });
    });
    return map;
  }, []);

  const openTicket = (id: number) => {
    console.log('open', id);
  };

  return (
    <Container maxWidth='xl'>
      <Box maxWidth={1400} sx={{ py: 3 }}>
        <Stack pb={3} direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Card sx={{ py: 1, px: 3}}>
            <h3>Tickets</h3>
          </Card>

          <Stack direction="row" spacing={1}>
            <Button className={styles.btnSecondary}>List view</Button>
            <Button className={styles.btnPrimary}>New Ticket</Button>
          </Stack>
        </Stack>

        <Box sx={{
          display: 'flex',
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { background: '#ccc', borderRadius: 8 }
        }}>
          {STATUSES.map(s => (
            <BoardColumn key={s} title={s} tickets={grouped[s]} onOpen={openTicket}/>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default TicketsBoardPage;