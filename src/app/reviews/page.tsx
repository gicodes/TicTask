'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/assets/buttons';
import { apiGet } from '@/lib/axios';
import { useAuth } from '@/providers/auth';
import { Review } from '@/types/review';
import DeleteButton from '../resources/_level_1/deleteResource';

export default function ReviewsPage() {
  const { user, isAdmin } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiGet('/reviews');
        const data = (res as { data?: Review[] } | null)?.data;
        setReviews(Array.isArray(data) ? data : []);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h3" sx={{ fontWeight: 500, letterSpacing: '-0.03em', mb: 1.5 }}>
          Statements from users
        </Typography>
        <Typography variant="body1" color="var(--secondary)" sx={{ fontSize: '1.05rem' }}>
          Real feedback from individuals and teams using TicTask to stay focused.
        </Typography>
      </Box>

      { isAdmin && 
        <Box my={2} display={'flex'} justifyContent={'right'}>
          <Button tone='action' variant='contained' component={Link} href={'/dashboard/admin/reviews'}>
            Manage reviews
          </Button>
          <Divider /> <br/>
        </Box>
      }

      {loading ? (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rounded" height={220} />
          ))}
        </Box>
      ) : reviews.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 10,
            borderRadius: 4,
            border: '1px dashed var(--disabled)'
          }} 
        >
          <Typography variant="h6" sx={{ mb: 1 }}>No reviews yet</Typography>
          <Typography variant="body2" color="var(--secondary)">
            Be the first to share your experience.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            borderRadius: 4,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          }}
        >
          {reviews.map((review) => (
            <Box
              key={review.id}
              component={Link}
              href={`/reviews/${review.slug}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                borderRadius: 3,
                border: '1px solid var(--border-color)',
                bgcolor: 'var(--background)',
                textDecoration: 'none',
                color: 'var(--foreground)',
                transition: 'all 180ms ease',
                '&:hover': {
                  borderColor: 'var(--accent)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={review.rating && s <= review.rating ? 'var(--accent)' : 'none'}
                    color={review.rating && s <= review.rating ? 'var(--accent)' : 'var(--disabled)'}
                  />
                ))}
              </Stack>

              <Typography variant="h6" sx={{ fontWeight: 550, mb: 1, lineHeight: 1.3 }}>
                {review.title}
              </Typography>

              <Typography
                variant="body2"
                color="var(--secondary)"
                sx={{
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  mb: 2.5,
                }}
              >
                {review.content}
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <Avatar
                    src={review.author?.photo || undefined}
                    sx={{ width: 32, height: 32, fontSize: 13, color: 'black' }}
                  >
                    {review.author?.name?.[0] || 'T'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 550, lineHeight: 1.2 }}>
                      {review.author?.name || 'TicTask User'}
                    </Typography>
                    <Typography variant="caption" color="var(--secondary)">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
                <ArrowRight size={18} color="var(--disabled)" />
              </Stack>

              { isAdmin && 
                <Box mt={1} display="flex" justifyContent="flex-end">
                  <DeleteButton endpoint="/review" id={review.id} />
                </Box>
              }
            </Box>
          ))}
        </Box>
      )}

      { user && (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button tone="primary" component={Link} href="/reviews/create" sx={{ maxWidth: 220 }}>
            Write a review
          </Button>
        </Box>
      )}
    </Container>
  );
}