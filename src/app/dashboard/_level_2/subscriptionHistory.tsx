'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Chip,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAlert } from '@/providers/alert';
import { apiGet } from '@/lib/axios';
import { GenericAPIRes } from '@/types/axios';
import { formatDateTime } from '@/lib/formatDateTime';
import { getExpiryDate } from '@/lib/getSubExpiryDate';
import { HistoryItem, HistoryProps, Pagination } from '@/types/subscription';

export function SubscriptionHistory({
  limit = 10,
  compact = false,
}: HistoryProps) {
  const { showAlert } = useAlert();

  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const res: GenericAPIRes = await apiGet(
          `/subscription/history?limit=${limit}`
        );

        if (!res.ok) return;

        const historyData = res.data as {
          items?: HistoryItem[];
          pagination?: Pagination;
        };

        setItems(historyData.items ?? []);
        setHasMore(historyData.pagination?.hasMore ?? false);
      } catch {
        showAlert('Failed to load billing history', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [limit, showAlert]);

  const formatAmount = (
    amount?: number,
    currency = 'usd'
  ) => {
    if (amount == null) return '—';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatAction = (type: string) => {
    if (!type) return '—';

    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const statusColor = (status?: string) => {
    switch (status) {
      case 'succeeded':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={4}
        width="100%"
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      style={{
        width: '100%',
        minWidth: 0,
      }}
    >
      <Card
        sx={{
          width: '100%',
          minWidth: 0,
          borderRadius: { xs: 2, sm: 4 },
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3 },
            '&:last-child': {
              pb: { xs: 2, sm: 3 },
            },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1}
            mb={2}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              Billing History
            </Typography>

            {compact && hasMore && (
              <Button
                size="small"
                href="/dashboard/subscription/history"
                sx={{
                  alignSelf: { xs: 'flex-start', sm: 'auto' },
                }}
              >
                View all
              </Button>
            )}
          </Stack>

          <Divider sx={{ opacity: 0.2, mb: 2 }} />

          {!items.length ? (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                py: 2,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              No billing history yet.
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                bgcolor: 'transparent',
                width: '100%',
                maxWidth: '100%',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',

                '&::-webkit-scrollbar': {
                  height: 6,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 3,
                },
              }}
            >
              <Table
                size="small"
                sx={{
                  minWidth: { xs: 750, sm: 900 },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Date · Time
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Description
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Amount
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Status
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Action
                    </TableCell>

                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      Expires On
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items.map((item) => {
                    const createdAt = new Date(item.createdAt);
                    const expiryDate = getExpiryDate(
                      item.billingCycle,
                      item.createdAt
                    );

                    return (
                      <TableRow key={item.id} hover>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {formatDateTime(createdAt)}
                        </TableCell>

                        <TableCell
                          sx={{
                            minWidth: 180,
                            maxWidth: 300,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: { xs: 'normal', sm: 'nowrap' },
                            }}
                          >
                            {item.description}
                          </Typography>

                          {item.plan && (
                            <Typography
                              variant="caption"
                              sx={{
                                opacity: 0.7,
                                display: 'block',
                              }}
                            >
                              {item.plan}
                            </Typography>
                          )}
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {formatAmount(item.amount, item.currency)}
                        </TableCell>

                        <TableCell>
                          {item.status && (
                            <Chip
                              label={item.status}
                              size="small"
                              color={statusColor(item.status) as any}
                              variant="outlined"
                            />
                          )}
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {formatAction(item.type)}
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {expiryDate.toDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
