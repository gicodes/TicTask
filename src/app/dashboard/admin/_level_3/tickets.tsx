'use client';

import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  Card,
  CardContent,
  CardHeader,
  Input,
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
} from '@mui/material';
import { Button } from '@/assets/buttons';
import {
  Loader2,
  Search,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { ADMIN_TICKETS_QUERY, DELETE_TICKET_MUTATION } from '../_level_1/graphQL';
import { getPriorityColor, getStatusColor, priorityColor } from '../../_level_1/tColorVariants';

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
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const { data, loading, error, fetchMore } = useQuery<TicketsData>(ADMIN_TICKETS_QUERY, {
    variables: {
      first: 20,
      filter: {
        search: search || null,
        priority: priority || null,
        status: status || null,
      },
    },
  });

  const [deleteTicket, { loading: deleting }] = useMutation(DELETE_TICKET_MUTATION, {
    onCompleted: () => {
      alert('Ticket deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['AdminTickets'] });
    },
    onError: (err) => {
      alert('Failed to delete ticket');
      console.error(err);
    },
  });

  const tickets = data?.adminTickets?.edges || [];
  const pageInfo = data?.adminTickets?.pageInfo;
  const totalCount = data?.adminTickets?.totalCount || 0;

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
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <div>
          <Typography variant="h4" fontWeight="bold">
            Tickets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and monitor all support tickets
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          Total: <strong>{totalCount}</strong> tickets
        </Typography>
      </Box>

      <Card>
        <CardHeader>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <Box position="relative" flex={1}>
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                }}
              />
              <Input
                fullWidth
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ pl: 5 }}
              />
            </Box>

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Priority</InputLabel>
              <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
                <MenuItem value="">All Priorities</MenuItem>
                <MenuItem value="URGENT">Urgent</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="OPEN">Open</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="RESOLVED">Resolved</MenuItem>
                <MenuItem value="CLOSED">Closed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardHeader>

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
            <>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
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
                            {format(new Date(Number(node.createdAt)), "MMM dd, yyyy")}
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

              {pageInfo?.hasNextPage && (
                <Box mt={4} textAlign="center">
                  <Button onClick={handleLoadMore} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading more...
                      </>
                    ) : (
                      'Load More Tickets'
                    )}
                  </Button>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}