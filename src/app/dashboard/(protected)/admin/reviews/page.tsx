'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Star } from 'lucide-react';
import { Button } from '@/assets/buttons';
import { apiGet, apiPost, apiPatch } from '@/lib/axios';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import DeleteButton from '@/app/resources/_level_1/deleteResource';
import { Review } from '@/types/review';

const STATUS_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Published', value: 'published' },
  { label: 'Testimonials', value: 'postedAsTestimonial' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'var(--autumn)';
    case 'published':
      return 'var(--spring)';
    case 'postedAsTestimonial':
      return 'var(--accent)';
    default:
      return 'var(--disabled)';
  }
};

export default function AdminReviewsPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const isAdmin = user?.role === 'ADMIN';

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const [actingId, setActingId] = useState<number | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const query = tab === 'all' ? '' : `?status=${tab}`;
      const res = await apiGet(`/reviews${query}`);
      setReviews((res as { data?: Review[] })?.data || []);
    } catch {
      setReviews([]);
      showAlert('Failed to load reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchReviews();
  }, [tab, isAdmin]);

  const handleApprove = async (id: number) => {
    setActingId(id);
    try {
      await apiPost(`/reviews/${id}/approve`);
      showAlert('Review approved & published', 'success');
      fetchReviews();
    } catch {
      showAlert('Failed to approve review', 'error');
    } finally {
      setActingId(null);
    }
  };

  const handleSetTestimonial = async (id: number) => {
    setActingId(id);
    try {
      await apiPatch(`/reviews/${id}/testimonial`);
      showAlert('Review set as testimonial', 'success');
      fetchReviews();
    } catch {
      showAlert('Failed to set testimonial', 'error');
    } finally {
      setActingId(null);
    }
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h5">Admin access required</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
            Reviews
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Approve submissions and promote strong ones to the landing page.
          </Typography>
        </Box>
        <Button tone="secondary" component={Link} href="/reviews" sx={{ maxWidth: 250 }}>
          View public page
        </Button>
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        sx={{
          mb: 3,
          borderBottom: '1px solid var(--border-color)',
          '& .MuiTab-root': { textTransform: 'none', minHeight: 42 },
        }}
      >
        {STATUS_TABS.map((t) => (
          <Tab key={t.value} label={t.label} value={t.value} />
        ))}
      </Tabs>

      {loading ? (
        <Stack spacing={2}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={140} />
          ))}
        </Stack>
      ) : reviews.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>No reviews</Typography>
          <Typography variant="body2" color="text.secondary">
            Nothing matches this filter.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                p: 3,
                borderRadius: 2,
                border: '1px solid var(--border-color)',
                bgcolor: 'var(--background)',
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
                spacing={2}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                      label={review.status}
                      size="small"
                      sx={{
                        bgcolor: `color-mix(in srgb, ${statusColor(review.status)} 15%, transparent)`,
                        color: statusColor(review.status),
                        fontWeight: 550,
                        textTransform: 'capitalize',
                        height: 22,
                      }}
                    />
                    {review.rating && (
                      <Stack direction="row" alignItems="center" spacing={0.3}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={14}
                            fill={s <= review.rating! ? 'var(--accent)' : 'none'}
                            color={s <= review.rating! ? 'var(--accent)' : 'var(--disabled)'}
                          />
                        ))}
                      </Stack>
                    )}
                  </Stack>

                  <Typography variant="h6" sx={{ fontWeight: 550, mb: 0.5, lineHeight: 1.3 }}>
                    {review.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 1.5,
                    }}
                  >
                    {review.content}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      src={review.author?.photo || undefined}
                      sx={{ width: 24, height: 24, fontSize: 11 }}
                    >
                      {review.author?.name?.[0] || 'T'}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {review.author?.name || 'Unknown'} ·{' '}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  {review.status === 'pending' && (
                    <Button
                      tone="primary"
                      size="small"
                      disabled={actingId === review.id}
                      onClick={() => handleApprove(review.id)}
                      sx={{ maxWidth: 110 }}
                    >
                      Approve
                    </Button>
                  )}

                  {review.status === 'published' && (
                    <Button
                      tone="action"
                      size="small"
                      disabled={actingId === review.id}
                      onClick={() => handleSetTestimonial(review.id)}
                      sx={{ maxWidth: 150 }}
                    >
                      Set as testimonial
                    </Button>
                  )}

                  <Button
                    tone="secondary"
                    size="small"
                    component={Link}
                    href={`/reviews/${review.slug}`}
                    sx={{ maxWidth: 80 }}
                  >
                    View
                  </Button>

                  <DeleteButton endpoint="/review" id={review.id} />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
}