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
        sx={{
          width: '100%',
          minWidth: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 3, sm: 4 },
        }}
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
        maxWidth: '100%',
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          borderRadius: { xs: 2, sm: 4 },
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            p: { xs: 1.5, sm: 3 },
            '&:last-child': {
              pb: { xs: 1.5, sm: 3 },
            },
          }}
        >
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', sm: 'center' }}
            spacing={1}
            sx={{
              minWidth: 0,
              mb: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                minWidth: 0,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Billing History
            </Typography>

            {compact && hasMore && (
              <Button
                size="small"
                href="/dashboard/subscription/history"
                sx={{
                  flexShrink: 0,
                  minWidth: 'auto',
                  px: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                View all
              </Button>
            )}
          </Stack>

          <Divider sx={{ opacity: 0.2, mb: { xs: 1.5, sm: 2 } }} />

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
            <>
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  flexDirection: 'column',
                  gap: 1.5,
                  width: '100%',
                  minWidth: 0,
                }}
              >
                {items.map((item) => {
                  const createdAt = new Date(item.createdAt);

                  const expiryDate = getExpiryDate(
                    item.billingCycle,
                    item.createdAt
                  );

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        py: 2,
                        px: 1.5,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                      }}
                    >
                      {/* Top row */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{
                          width: '100%',
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{
                              overflowWrap: 'anywhere',
                              wordBreak: 'break-word',
                              lineHeight: 1.4,
                            }}
                          >
                            {item.description || 'Subscription payment'}
                          </Typography>

                          {item.plan && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 0.25,
                                opacity: 0.65,
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                              }}
                            >
                              {item.plan}
                            </Typography>
                          )}
                        </Box>

                        {item.status && (
                          <Chip
                            label={item.status}
                            size="small"
                            color={statusColor(item.status) as any}
                            variant="outlined"
                            sx={{
                              flexShrink: 0,
                              height: 24,
                              maxWidth: '40%',
                              '& .MuiChip-label': {
                                px: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              },
                            }}
                          />
                        )}
                      </Stack>

                      <Divider sx={{ my: 1.25, opacity: 0.15 }} />

                      {/* Details */}
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                          columnGap: 1.5,
                          rowGap: 1.25,
                          width: '100%',
                        }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              opacity: 0.6,
                              mb: 0.25,
                            }}
                          >
                            Amount
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{
                              overflowWrap: 'anywhere',
                            }}
                          >
                            {formatAmount(item.amount, item.currency)}
                          </Typography>
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              opacity: 0.6,
                              mb: 0.25,
                            }}
                          >
                            Action
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              overflowWrap: 'anywhere',
                              wordBreak: 'break-word',
                            }}
                          >
                            {formatAction(item.type)}
                          </Typography>
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              opacity: 0.6,
                              mb: 0.25,
                            }}
                          >
                            Date
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              overflowWrap: 'anywhere',
                            }}
                          >
                            {formatDateTime(createdAt)}
                          </Typography>
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              opacity: 0.6,
                              mb: 0.25,
                            }}
                          >
                            Expires
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              overflowWrap: 'anywhere',
                            }}
                          >
                            {expiryDate.toDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* =========================================================
                  TABLET / DESKTOP VIEW
                  ========================================================= */}
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  display: { xs: 'none', sm: 'block' },
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
                    width: '100%',
                    minWidth: 760,
                    tableLayout: 'auto',
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        Date · Time
                      </TableCell>

                      <TableCell
                        sx={{
                          minWidth: 180,
                        }}
                      >
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
                          <TableCell
                            sx={{
                              whiteSpace: 'nowrap',
                              verticalAlign: 'top',
                            }}
                          >
                            {formatDateTime(createdAt)}
                          </TableCell>

                          <TableCell
                            sx={{
                              minWidth: 180,
                              maxWidth: 320,
                              verticalAlign: 'top',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
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
                                  overflowWrap: 'anywhere',
                                  wordBreak: 'break-word',
                                }}
                              >
                                {item.plan}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              whiteSpace: 'nowrap',
                              verticalAlign: 'top',
                            }}
                          >
                            {formatAmount(item.amount, item.currency)}
                          </TableCell>

                          <TableCell
                            sx={{
                              verticalAlign: 'top',
                            }}
                          >
                            {item.status && (
                              <Chip
                                label={item.status}
                                size="small"
                                color={statusColor(item.status) as any}
                                variant="outlined"
                              />
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              whiteSpace: 'nowrap',
                              verticalAlign: 'top',
                            }}
                          >
                            {formatAction(item.type)}
                          </TableCell>

                          <TableCell
                            sx={{
                              whiteSpace: 'nowrap',
                              verticalAlign: 'top',
                            }}
                          >
                            {expiryDate.toDateString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
