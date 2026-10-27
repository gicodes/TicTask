'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/assets/buttons';
import { apiGet } from '@/lib/axios';
import { Review } from '@/types/review';

export default function SingleReviewPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchReview = async () => {
      try {
        const res = (await apiGet(`/reviews/${slug}`)) as { data?: Review };
        setReview(res.data ?? null);
      } catch {
        setReview(null);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Skeleton variant="text" width="40%" height={48} />
        <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
        <Skeleton variant="rounded" height={180} sx={{ mt: 4 }} />
      </Container>
    );
  }

  if (!review) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Review not found</Typography>
        <Typography variant="body2" color="var(--secondary)" sx={{ mb: 3 }}>
          This review may have been removed or is still pending approval.
        </Typography>
        <Button tone="secondary" component={Link} href="/reviews">
          Back to reviews
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Button
        tone="retreat"
        startIcon={<ArrowLeft size={16} />}
        onClick={() => router.back()}
        sx={{ maxWidth: 140 }}
      >
        Back
      </Button>

      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ my: 2 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={18}
            fill={review.rating && s <= review.rating ? 'var(--accent)' : 'none'}
            color={review.rating && s <= review.rating ? 'var(--accent)' : 'var(--disabled)'}
          />
        ))}
      </Stack>

      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 500, letterSpacing: '-0.025em', mb: 2, lineHeight: 1.15 }}
      >
        {review.title}
      </Typography>

      <Typography variant="body1" color="var(--secondary)" sx={{ mb: 4 }}>
        {new Date(review.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          mb: 6,
        }}
      >
        {review.content}
      </Typography>

      <Divider sx={{ mb: 4, borderColor: 'var(--border-color)' }} />

      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={review.author?.photo || undefined}
          sx={{ width: 48, height: 48 }}
        >
          {review.author?.name?.[0] || 'T'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 550 }}>
            {review.author?.name || 'TicTask User'}
          </Typography>
          <Typography variant="caption" color="var(--secondary)">
            Verified user
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}