'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { apiGet } from '@/lib/axios';
import { GenericAPIRes } from '@/types/axios';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Meta, Subscription } from '@/types/subscription';
import GenericGridPageLayout from '../../../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../../../_level_1/genDashPagesHeader';

const statusColorMap: Record<string, 'success' | 'error' | 'warning' | 'default' | 'info'> = {
  ACTIVE: 'success',
  TRIAL: 'info',
  EXPIRED: 'error',
  CANCELLED: 'default',
  NULL: 'default'
};

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page + 1),
        limit: String(rowsPerPage),
      });

      if (statusFilter) params.set('status', statusFilter);
      if (searchDebounced) params.set('search', searchDebounced);

      const res = await apiGet<GenericAPIRes>(`/subscription/all?${params.toString()}`);

      if (!res.ok) {
        throw new Error(res.message || 'Failed to load subscriptions');
      }

      setSubscriptions((res.data as Subscription[]) || []);
      setMeta(res.meta || null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while fetching subscriptions');
      setSubscriptions([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, statusFilter, searchDebounced]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatCurrency = (amount: number, currency = 'USD') =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount / 100);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const renderMobileCards = () => (
    <Stack spacing={2}>
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={140} />
          ))
        : subscriptions.map((sub) => (
            <Card key={sub.id} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Box>
                    <Typography fontWeight={600}>{sub.user?.name || '—'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {sub.user?.email}
                    </Typography>
                  </Box>
                  <Chip
                    label={sub.active ? "ACTIVE" : "Null"}
                    size="small"
                    color={statusColorMap[sub.active ? "ACTIVE" : "NULL"] || 'default'}
                  />
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                <Stack spacing={0.5}>
                  <Typography variant="body2">
                    <strong>Plan:</strong> {sub.plan}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Amount:</strong> {formatCurrency(sub.amount, "USD")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Expires:</strong> {formatDate(sub.expiresAt)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sub.user.name} · ID {sub.user?.id}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
    </Stack>
  );

  const renderDesktopTable = () => (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
      <Table size="medium">
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell>User</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: rowsPerPage }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : subscriptions.map((sub) => (
                <TableRow key={sub.id} hover>
                  <TableCell>
                    <Typography fontWeight={500}>{sub.user?.name || '—'}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {sub.user?.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>
                    <Chip
                      label={sub.active ? "ACTIVE" : "NULL"}
                      size="small"
                      color={statusColorMap[sub?.active ? "ACTIVE" : "NULL"] || 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(sub.amount, "USD")}
                  </TableCell>
                  <TableCell>{formatDate(sub.startedAt)}</TableCell>
                  <TableCell>{formatDate(sub.expiresAt)}</TableCell>
                  <TableCell>
                    <Chip
                      label={sub.user?.userType}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader
        title="Subscriptions & Revenue"
        description="All subscribed users and teams are curated here with special options for revenue sorting"
      />

      <Box
        mt={3}
        sx={{
          overflowX: { xs: "auto", md: "visible" },
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          // Modern thin scrollbar (mobile-friendly)
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,0.2) transparent",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,0.35)",
          },
        }}
      >        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          mb={3}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <TextField
            size="small"
            placeholder="Search by name, email or plan…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: { sm: 280 }, flex: 1 }}
          />

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="TRIAL">Trial</MenuItem>
              <MenuItem value="EXPIRED">Expired</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Refresh">
            <IconButton onClick={fetchSubscriptions} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {!loading && !error && subscriptions.length === 0 && (
          <Box py={8} textAlign="center">
            <Typography color="text.secondary">
              No subscriptions found
              {searchDebounced || statusFilter ? ' matching your filters' : ''}.
            </Typography>
          </Box>
        )}

        {!error && (loading || subscriptions.length > 0) && (
          <>
            {isMobile ? renderMobileCards() : renderDesktopTable()}

            {meta && (
              <TablePagination
                component="div"
                count={meta.total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                sx={{ mt: 1 }}
              />
            )}
          </>
        )}
      </Box>
    </GenericGridPageLayout>
  );
};

export default Page;