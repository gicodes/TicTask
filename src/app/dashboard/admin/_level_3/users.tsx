'use client';

import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import { User_Type } from '@/types/users';
import { Button } from '@/assets/buttons';
import { useAlert } from '@/providers/alert';
import { useDebounce } from '../../_level_3/ticket';
import AdminComponents from '../_level_2/overview-cards';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { ADMIN_USERS_QUERY, DELETE_USER_MUTATION } from '../_level_1/graphQL';

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
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<User_Type | string>('');

  const { data, loading, error, fetchMore } = useQuery<UsersData>(ADMIN_USERS_QUERY, {
    variables: {
      first: 20,
      after: null,
      filter: {
        search: debouncedSearch || undefined,
        userType: typeFilter === "All users" || !typeFilter ? undefined : typeFilter === "Business" ? "BUSINESS" : "PERSONAL",
        role: roleFilter || undefined,
      },
    },
  });

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
    if (!pageInfo?.hasNextPage || loading) return;

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
    if (!confirm('Are you sure you want to delete this user?')) return;
    deleteUser({ variables: { id }});
    window.location.reload();
  };

  return (
    <Box>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="start" 
        my={3} 
        px={3}
      >
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
      
      <Card sx={{ boxShadow: 0, py: 1}}>
        <Box 
          display="flex" 
          pt={1}
          justifyContent={'space-between'}
          flexDirection={{ xs: 'column', md: 'row' }} 
        >
          <AdminComponents.Filters>
            <AdminComponents.SearchField
              value={searchQuery}
              placeholder="Search users"
              onChange={setSearchQuery}
            />
          </AdminComponents.Filters>

          <Stack direction={{ xs: 'column', sm: 'row'}}>
            <AdminComponents.SelectField
              label="Type"
              value={typeFilter}
              onChange={setTypeFilter}
              emptyLabel="All users"
              options={[
                { label: 'Business', value: 'BUSINESS' },
                { label: 'Personal', value: 'PERSONAL' },
              ]}
            />
            <AdminComponents.SelectField
              label="Role"
              value={roleFilter}
              onChange={setRoleFilter}
              emptyLabel="Any"
              options={[
                { label: 'User', value: 'USER' },
                { label: 'Admin', value: 'ADMIN' },
              ]}
            />
          </Stack>
        </Box>
        <CardContent>
          {loading && users.length === 0 ? (
            <Box textAlign="center" py={10}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box textAlign="center" py={10} color="error.main">
              <AlertCircle size={48} style={{ margin: '0 auto 16px' }} />
              <Typography>Failed to load users</Typography>
            </Box>
          ) : users.length === 0 ? (
            <Box textAlign="center" py={10} color="text.secondary">
              <Typography>No users found</Typography>
            </Box>
          ) : (
            <Box px={1} maxWidth={'96vw'}>
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
                          <TableCell><strong>No.</strong></TableCell>
                          <TableCell><strong>Name</strong></TableCell>
                          <TableCell><strong>ID</strong></TableCell>
                          <TableCell><strong>Email</strong></TableCell>
                          <TableCell><strong>Role</strong></TableCell>
                          <TableCell><strong>Joined</strong></TableCell>
                          <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map(({ node }, i) => (
                          <TableRow key={i} hover>
                            <TableCell>
                              {i+1}.
                            </TableCell>
                            <TableCell>{node.name || '-'}</TableCell>
                            <TableCell>{node.id}</TableCell>
                            <TableCell>{node.email}</TableCell>
                            <TableCell>
                              {node.role.charAt(0) + node.role.slice(1).toLowerCase()}
                            </TableCell>
                            <TableCell>
                              {format(new Date(node.createdAt), 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Delete user">
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
                    {loading ? (
                      <> Loading... </>
                    ) : (
                      'Load More Users'
                    )}
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
