import { useMemo, useState } from 'react';
import { TicketNote } from '@/types/ticket';
import { Button } from '@/assets/buttons';
import { 
  Box, 
  Stack, 
  Typography, 
  Card, 
  Fade, 
  Pagination, 
  TextField 
} from '@mui/material';

const PAGE_SIZE = 5;

export function CommentsPane({
  comments,
  newComment,
  setNewComment,
  onAddComment,
  isActive,
  isSubmitting,
}: {
  comments: TicketNote[];
  newComment: string;
  isActive: boolean;
  isSubmitting: boolean;
  setNewComment: (v: string) => void;
  onAddComment: () => Promise<void>;
}) {
  const [page, setPage] = useState(1);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return comments.slice(start, start + PAGE_SIZE);
  }, [comments, page]);

  const totalPages = Math.ceil(comments.length / PAGE_SIZE);

  return (
    <Card sx={{ p: 3, borderRadius: 2, maxWidth: 555 }}>
      {comments.length > 0 ? (
        <>
          {paginated.map((note) => (
            <Fade in key={note.id} timeout={300}>
              <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle2">{note.author?.name || 'Unknown'}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(note.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {note.content}
                </Typography>
              </Box>
            </Fade>
          ))}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, v) => setPage(v)}
                color="primary"
                size="small"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          No comments yet. Be the first to add one.
        </Typography>
      )}

      {isActive && (
        <Stack direction="row" alignItems="center" spacing={2} mt={4}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={6}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
          />
          <Button
            tone="retreat"
            onClick={onAddComment}
            disabled={!newComment.trim() || isSubmitting}
          >
            Post
          </Button>
        </Stack>
      )}
    </Card>
  );
}