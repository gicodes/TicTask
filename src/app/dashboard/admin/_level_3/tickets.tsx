'use client';

import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import { Button } from '@/assets/buttons';
import { useAlert } from '@/providers/alert';
import { useDebounce } from '../../_level_3/ticket';
import AdminComponents from '../_level_2/overview-cards';
import { Loader2, Trash2, AlertCircle } from 'lucide-react';
import { getPriorityColor, getStatusColor } from '../../_level_1/tColorVariants';
import { ADMIN_TICKETS_QUERY, DELETE_TICKET_MUTATION } from '../_level_1/graphQL';

interface TicketNode {
  id: string;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

interface TicketsData {
  adminTickets: {
    totalCount: number;
    edges: { node: TicketNode; cursor: string }[];
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
    };
  };
}

export default function AdminTicketsPage() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const [searchQuery, setSearchQuery] = useState('');
  const [priority, setPriority] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, loading, error, fetchMore } = useQuery<TicketsData>(ADMIN_TICKETS_QUERY, {
    variables: {
      first: 20,
      filter: {
        search: debouncedSearch || null,
        priority: priority || null,
        status: status || null,
      },
    },
  });

  const [deleteTicket, { loading: deleting }] = useMutation(DELETE_TICKET_MUTATION, {
    onCompleted: () => {
      showAlert('Ticket deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['AdminTickets'] });
    },
    onError: (err) => {
      showAlert('Failed to delete ticket', 'error');
      console.error(err);
    },
  });

  const tickets = data?.adminTickets?.edges ?? [];
  const pageInfo = data?.adminTickets?.pageInfo;
  const totalCount = data?.adminTickets?.totalCount ?? 0;

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage || loading) return;

    fetchMore({
      variables: { first: 20, after: pageInfo.endCursor },
      updateQuery: (prev: TicketsData, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          adminTickets: {
            ...fetchMoreResult.adminTickets,
            edges: [...prev.adminTickets.edges, ...fetchMoreResult.adminTickets.edges],
          },
        };
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    deleteTicket({ variables: { id } });
    window.location.reload();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="start" my={4} px={3}>
        <div className="grid gap-1">
          <Typography variant="h5" fontWeight="bold">
            All Tickets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and monitor all active tickets
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          Total: <strong>{totalCount}</strong>
        </Typography>
      </Box>

      <Card>
        <Box 
          gap={2}
          display="flex" 
          pt={{ xs: 1, sm: 0 }}
          justifyContent={'space-between'}
          flexDirection={{ xs: 'column', md: 'row' }} 
        >
          <AdminComponents.Filters>
            <AdminComponents.SearchField 
              value={searchQuery}
              placeholder="Search tickets…" 
              onChange={setSearchQuery}
            />
          </AdminComponents.Filters>

          <Stack  
            px={3} 
            gap={1.5}
            display="flex" 
            direction={{ xs: 'column', sm: 'row'}}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Stack py={1}>
              <FormControl sx={{ minWidth: 180 }} size='small'>
                <InputLabel sx={{ height: 'auto'}}>Priority</InputLabel>
                <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
                  <MenuItem value="">All Priorities</MenuItem>
                  <MenuItem value="URGENT">Urgent</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack py={1}>
              <FormControl sx={{ minWidth: 180 }} size='small'>
                <InputLabel>Status</InputLabel>
                <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="OPEN">Open</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="RESOLVED">Resolved</MenuItem>
                  <MenuItem value="CLOSED">Closed</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Box>

        <CardContent>
          {loading && tickets.length === 0 ? (
            <Box display="flex" justifyContent="center" py={10}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box textAlign="center" py={10} color="error.main">
              <AlertCircle size={48} style={{ margin: '0 auto 16px' }} />
              <Typography>Failed to load tickets</Typography>
            </Box>
          ) : tickets.length === 0 ? (
            <Box textAlign="center" py={10} color="text.secondary">
              <Typography>No tickets found</Typography>
            </Box>
          ) : (
            <Box p={1} maxWidth={'96vw'}>
              <Box
                sx={{
                  my: 1,
                  width: '100%',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  borderRadius: 2,
                  border: '0.1px solid var(--dull-gray)',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'thin',
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': { height: 6,},
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'var(--secondary)',
                    borderRadius: 10,
                  },
                  '@media (max-width: 600px)': {
                    display: 'block',
                    maxWidth: '90vw',
                  },
                }}
              >
                <Box
                  sx={{
                    minWidth: 750,
                    width: '100%',
                    borderCollapse: 'collapse',
                    tableLayout: 'auto',
                  }}
                >
                  <TableContainer component={Paper} elevation={0}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Title</strong></TableCell>
                          <TableCell><strong>Priority</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Created</strong></TableCell>
                          <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tickets.map(({ node }) => (
                          <TableRow key={node.id} hover>
                            <TableCell sx={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <Typography noWrap>{node.title}</Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={node.priority}
                                size="small"
                                sx={{ ...getPriorityColor(node.priority), fontWeight: 600 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={node.status.replace('_', ' ')}
                                size="small"
                                sx={{ ...getStatusColor(node.status), fontWeight: 600 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {format(new Date(node.createdAt), 'MMM dd, yyyy')}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Delete ticket">
                                <IconButton
                                  onClick={() => handleDelete(Number(node.id))}
                                  disabled={deleting}
                                  color="error"
                                >
                                  {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>

              {pageInfo?.hasNextPage && (
                <Box mt={4} textAlign="center">
                  <Button onClick={handleLoadMore} disabled={loading}>
                    { loading ? <> Loading more... </>
                      : 'Load More Tickets'
                    }
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
