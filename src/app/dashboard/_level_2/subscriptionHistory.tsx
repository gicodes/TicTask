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
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAlert } from '@/providers/alert';
import { apiGet } from '@/lib/axios';
import { GenericAPIRes } from '@/types/axios';

type HistoryItem = {
  id: string;
  type: string;
  plan?: string;
  amount?: number;
  currency?: string;
  status?: string;
  description: string;
  invoiceUrl?: string;
  createdAt: string;
};

type Props = {
  limit?: number;
  compact?: boolean;
};

export function SubscriptionHistory({ limit = 10, compact = false }: Props) {
  const { showAlert } = useAlert();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res: GenericAPIRes = await apiGet(`/subscription/history?limit=${limit}`);

        if (!res.ok) return

        const history = res.data as HistoryItem[] & {
          pagination?: { hasMore?: boolean };
        };

        setItems(history);
        setHasMore(history.pagination?.hasMore ?? false);
      } catch {
        showAlert('Failed to load billing history', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [limit]);

  const formatAmount = (amount?: number, currency = 'usd') => {
    if (amount == null) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const statusColor = (status?: string) => {
    switch (status) {
      case 'succeeded': return 'success';
      case 'failed': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress size={28} />
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              Billing History
            </Typography>
            {compact && hasMore && (
              <Button size="small" href="/dashboard/subscription/history">
                View all
              </Button>
            )}
          </Stack>

          <Divider sx={{ opacity: 0.2, mb: 2 }} />

          {!items.length ? (
            <Typography variant="body2" sx={{ opacity: 0.7, py: 2 }}>
              No billing history yet.
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Invoice</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.description}</Typography>
                        {item.plan && (
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            {item.plan}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
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
                      <TableCell align="right">
                        {item.invoiceUrl ? (
                          <Button
                            size="small"
                            href={item.invoiceUrl}
                            target="_blank"
                            rel="noopener"
                          >
                            PDF
                          </Button>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}