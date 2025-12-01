'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useAlert } from '@/providers/alert';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@apollo/client/react';
import { ADMIN_USERS_QUERY, DELETE_USER_MUTATION } from '../_level_1/graphQL';
import {
  Card, CardHeader, CardContent,
  Typography, Box, Input,
  Table, TableBody, TableCell, TableRow,
  TableHead, TableContainer, Paper,
  CircularProgress, IconButton, Tooltip
} from '@mui/material';
import { Button } from '@/assets/buttons';
import { Search, Trash2, Loader2, AlertCircle } from 'lucide-react';

interface UserNode {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UsersData {
  adminUsers: {
    totalCount: number;
    edges: { node: UserNode; cursor: string }[];
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
    };
  };
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const { data, loading, error, fetchMore } = useQuery<UsersData>(
    ADMIN_USERS_QUERY,
    {
      variables: { first: 20, search: search || null },
    }
  );

  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      showAlert('User deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['AdminUsers'] });
    },
    onError: () => showAlert('Failed to delete user', 'error'),
  });

  const users = data?.adminUsers?.edges ?? [];
  const pageInfo = data?.adminUsers?.pageInfo;
  const totalCount = data?.adminUsers?.totalCount ?? 0;

  const handleLoadMore = () => {
    if (!pageInfo?.hasNextPage) return;

    fetchMore({
      variables: { first: 20, after: pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          adminUsers: {
            ...fetchMoreResult.adminUsers,
            edges: [...prev.adminUsers.edges, ...fetchMoreResult.adminUsers.edges],
          },
        };
      },
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this user?')) return;
    deleteUser({ variables: { id } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <div className="grid gap-1">
          <Typography variant="h5" fontWeight="bold">
            All Users
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all platform users
          </Typography>
        </div>

        <Typography variant="body2" color="text.secondary">
          Total: <strong>{totalCount}</strong>
        </Typography>
      </Box>

      <Card>
        <CardHeader>
          <Box display="flex" gap={2}>
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
                placeholder="Search users…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ pl: 5 }}
              />
            </Box>
          </Box>
        </CardHeader>

        <CardContent>
          {loading && users.length === 0 ? (
            <Box textAlign="center" py={10}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box textAlign="center" py={10} color="error.main">
              <AlertCircle size={40} />
              <Typography mt={2}>Error loading users</Typography>
            </Box>
          ) : users.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Typography>No users found</Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell><strong>Joined</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users.map(({ node }) => (
                      <TableRow key={node.id} hover>
                        <TableCell>{node.name}</TableCell>
                        <TableCell>{node.email}</TableCell>
                        <TableCell>{node.role}</TableCell>
                        <TableCell>
                          {format(new Date(Number(node.createdAt)), 'MMM dd, yyyy')}
                        </TableCell>

                        <TableCell align="right">
                          <Tooltip title="Delete User">
                            <IconButton
                              onClick={() => handleDelete(Number(node.id))}
                              color="error"
                              disabled={deleting}
                            >
                              {deleting ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {pageInfo?.hasNextPage && (
                <Box textAlign="center" mt={4}>
                  <Button onClick={handleLoadMore}>
                    {loading ? 'Loading…' : 'Load More Users'}
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
