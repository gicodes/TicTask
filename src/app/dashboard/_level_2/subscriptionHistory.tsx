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
import { DoneOutlined } from '@mui/icons-material';

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

  const formatAmount = (amount?: number, currency = 'usd') => {
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
            p: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
              lg: 3,
            },
            '&:last-child': {
              pb: {
                xs: 1.5,
                sm: 2,
                md: 2.5,
                lg: 3,
              },
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{
              minWidth: 0,
              mb: {
                xs: 1.5,
                sm: 2,
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                minWidth: 0,
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.2rem',
                  lg: '1.25rem',
                },
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
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
                  px: {
                    xs: 1,
                    sm: 1.25,
                    md: 1.5,
                  },
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.8rem',
                    md: '0.875rem',
                  },
                }}
              >
                View all
              </Button>
            )}
          </Stack>

          <Divider
            sx={{
              opacity: 0.2,
              mb: {
                xs: 1.5,
                sm: 2,
              },
            }}
          />

          {!items.length ? (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                py: 2,
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              No billing history yet.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: {
                    xs: 'flex',
                    sm: 'none',
                  },
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
                                whiteSpace: 'nowrap',
                              },
                            }}
                          />
                        )}
                      </Stack>

                      <Divider
                        sx={{
                          my: 1.25,
                          opacity: 0.15,
                        }}
                      />

                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns:
                            'minmax(0, 1fr) minmax(0, 1fr)',
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

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: 0,
                  bgcolor: 'transparent',
                  overflowX: 'hidden',
                }}
              >
                <Table
                  size="small"
                  sx={{
                    width: '100%',
                    tableLayout: 'fixed',

                    '& .MuiTableCell-root': {
                      px: {
                        sm: 1,
                        md: 1.25,
                        lg: 1.5,
                      },
                      py: {
                        sm: 1,
                        md: 1.25,
                        lg: 1.5,
                      },
                      fontSize: {
                        sm: '0.75rem',
                        md: '0.8rem',
                        lg: '0.875rem',
                      },
                      verticalAlign: 'top',
                    },

                    '& .MuiTableCell-head': {
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    },
                  }}
                >
                  <colgroup>
                    <col
                      style={{
                        width: '15%',
                      }}
                    />

                    <col
                      style={{
                        width: '36%',
                      }}
                    />

                    <col
                      style={{
                        width: '12%',
                      }}
                    />

                    <col
                      style={{
                        width: '12%',
                      }}
                    />

                    <col
                      style={{
                        width: '10%',
                      }}
                    />

                    <col
                      style={{
                        width: '15%',
                      }}
                    />
                  </colgroup>

                  <TableHead>
                    <TableRow>
                      <TableCell>Date · Time</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Expires On</TableCell>
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
                              whiteSpace: {
                                sm: 'normal',
                                md: 'nowrap',
                              },
                              overflowWrap: 'anywhere',
                              wordBreak: 'break-word',
                            }}
                          >
                            <div style={{ whiteSpace: 'pre-line' }}>
                              {formatDateTime(createdAt)}
                            </div>
                          </TableCell>
                          <TableCell
                            sx={{
                              minWidth: 0,
                              maxWidth: 0,
                              overflow: 'hidden',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: {
                                  sm: 'ellipsis',
                                  md: 'ellipsis',
                                  lg: 'clip',
                                },
                                display: {
                                  sm: '-webkit-box',
                                  lg: 'block',
                                },
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: {
                                  sm: 2,
                                  md: 2,
                                },
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                                lineHeight: 1.4,
                              }}
                            >
                              {(item.description || 'Subscription payment').replace(
                                /,/g,
                                ',\u200B'
                              )}
                            </Typography>

                            {item.plan && (
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mt: 0.25,
                                  opacity: 0.7,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {item.plan}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              minWidth: 0,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              maxWidth: { sm: 150, md: 200 },
                            }}
                          >
                            {formatAmount(item.amount, item.currency)}
                          </TableCell>

                          <TableCell
                            sx={{
                            }}
                          >
                            {item.status && (
                              <Typography width={'100%'}> {item.status==="succeeded" ? <DoneOutlined color='primary' /> : "❌"} </Typography>
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              minWidth: 0,
                              overflowWrap: 'anywhere',
                              wordBreak: 'break-word',
                            }}
                          >
                            {formatAction(item.type)}
                          </TableCell>

                          <TableCell
                            sx={{
                              whiteSpace: {
                                sm: 'normal',
                                md: 'nowrap',
                              },
                              overflowWrap: 'anywhere',
                              wordBreak: 'break-word',
                            }}
                          >
                            <div style={{ whiteSpace: 'pre-line' }}>
                              {formatDateTime(expiryDate)}
                            </div>
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
