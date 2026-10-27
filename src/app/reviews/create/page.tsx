'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { apiPost } from '@/lib/axios';
import { Button } from '@/assets/buttons';
import { useAuth } from '@/providers/auth';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/providers/alert';

export default function CreateReviewPage() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number | null>(5);
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          py: 12, 
          textAlign: 'center' 
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>Sign in required</Typography>
        <Typography variant="body2" color="var(--secondary)" sx={{ mb: 10 }}>
          Only registered users can write a review.
        </Typography>

        <Button
          tone="primary"
          component={Link}
          href={`/auth/login?returnUrl=${encodeURIComponent('/reviews/create')}`}
          sx={{ maxWidth: 200 }}
        >
          Sign in
        </Button>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      showAlert("You must be signed in to submit a review!");
      return;
    }

    if (!title.trim() || !content.trim()) {
      showAlert('Title and content are required', 'warning');
      return;
    }

    setSubmitting(true);

    try {
      await apiPost('/reviews', {
        title: title.trim(),
        content: content.trim(),
        rating,
      });
      showAlert('Review submitted! It will appear after admin approval.', 'success');
      router.push('/reviews');
    } catch {
      showAlert('Failed to submit review. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Box display={'grid'} gap={2} textAlign={'center'}>
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 500, letterSpacing: '-0.025em'}}
        >
          Write a review
        </Typography>
        <Typography variant="body1" color="var(--secondary)" sx={{ mb: 5 }}>
          Share your experience with TicTask <br/> Published reviews can be featured as testimonials
        </Typography>
      </Box>
     

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
      >
        <Paper 
          sx={{ 
            p: 3, 
            borderRadius: { xs: 2, md: 3 } 
          }} 
          elevation={0.5}
        >
          <Stack spacing={3}>
            <Box>
              <Typography 
                variant="subtitle2" 
                color='var(--secondary)'
                sx={{ mb: 1, letterSpacing: 1 }}
              >
                Rating
              </Typography>
              <Rating
                value={rating}
                onChange={(_, value) => setRating(value)}
                size="large"
                sx={{
                  color: 'var(--accent)',
                  '& .MuiRating-iconEmpty': { color: 'var(--disabled)' },
                }}
              />
            </Box>

            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Your review"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              multiline
              minRows={6}
              variant="outlined"
              placeholder="What do you like? How has TicTask helped you or your team?"
            />

            <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
              <Button
                type="submit"
                tone="primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit review'}
              </Button>
              <Button
                tone="secondary"
                component={Link}
                href="/reviews"
                sx={{ maxWidth: 120 }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
