'use client';

import { useEffect, useState } from 'react';
import { Partner } from '@/types/partner';
import {
  Box,
  CardContent,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAuth } from '@/providers/auth';
import { WarningAmber } from '@mui/icons-material';
import { GenericUserMessageRes } from '@/types/axios';

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PartnersList() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth(); 

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = user?.accessToken;

        if (!token) return;

        const res = await fetch(`${SERVER_URL}/company/partners`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Session expired. Please log in again.');
          }
          if (res.status === 403) {
            throw new Error('You do not have permission to view partners.');
          }
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `Failed to fetch partners (${res.status})`);
        }

        const data = await res.json();
        const partnerList = data?.data?.partners || data?.partners || [];

        setPartners(partnerList);
      } catch (err) {
        console.error('Partners fetch error:', err);
        setError((err as GenericUserMessageRes).message || 'Failed to load partner records');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [user?.accessToken]);

  if (loading) {
    return (
      <Box py={8} display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return (
    <Box py={5} textAlign="center">
      <WarningAmber color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography color="text.secondary">{error}</Typography>
    </Box>
  );

  if (partners.length === 0) {
    return (
      <Box py={5} textAlign={{ xs: 'center', sm: 'left' }}>
        <Typography color="warning.main" variant="h6">
          No partner records available yet
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Register your first partner to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', mt: 3 }}>
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Business Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Reg. Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">{partner.name}</Typography>
                  </TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.user?.phone || '—'}</TableCell>
                  <TableCell>{partner.company || '—'}</TableCell>
                  <TableCell>
                    <Chip
                      label={partner.approved ? "APPROVED" : "PENDING"}
                      size="small"
                      color={partner.approved ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {new Date(partner.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Box>
  );
}
