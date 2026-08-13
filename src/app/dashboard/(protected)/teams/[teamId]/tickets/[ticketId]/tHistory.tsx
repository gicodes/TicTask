import { useMemo, useState } from 'react';
import { TicketHistory } from '@/types/ticket';
import ReadableJsonDiff from '@/app/dashboard/_level_1/readableJsonDiff';
import { Box, Typography, Card, Fade, Pagination, } from '@mui/material';

const PAGE_SIZE = 1;

export function HistoryPane({ history }: { history: TicketHistory[] }) {
  const [page, setPage] = useState(1);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return history.slice(start, start + PAGE_SIZE);
  }, [history, page]);

  const totalPages = Math.ceil(history.length / PAGE_SIZE);

  return (
    <Card sx={{ p: 3, borderRadius: 2, maxWidth: 555 }}>
      {history.length > 0 ? (
        <>
          {paginated.map((h) => (
            <Fade in key={h.id} timeout={300}>
              <Box sx={{ mb: 2, pb: 1, borderColor: 'divider' }}>
                <Typography display={'flex'} sx={{ fontWeight: 600 }} justifyContent={'end'}>
                  {h.action}
                </Typography>

                {(h.oldValue || h.newValue) && (
                  <Box sx={{ mt: 0.5, mb: 1 }}>
                    <ReadableJsonDiff
                      from={h.oldValue}
                      to={h.newValue}
                      variant="compact"
                      showRawJsonButton={false}
                    />
                  </Box>
                )}

                <Typography variant="caption" color="text.disabled">
                  {new Date(h.createdAt).toLocaleString()} • {h.performedBy?.name || 'System'}
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
          No activity recorded yet.
        </Typography>
      )}
    </Card>
  );
}
