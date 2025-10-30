import { Card, Stack, TextField, Button, ButtonGroup, Box, Badge, Typography, Tooltip, Divider, InputAdornment } from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { TicketToolTip } from '../_level_1/tooltips';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutline from '@mui/icons-material/InfoOutlined';
import { FaPlusCircle } from 'react-icons/fa';
import styles from '@/app/page.module.css';
import React, { useState } from 'react';

export default function Toolbar({ 
  view, setView, onOpenCreate, searchQuery, setSearchQuery 
}: { 
    view: 'board' | 'list'; 
    setView: (v: 'board' | 'list') => void; 
    onOpenCreate: () => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
}) {
  const [description, setDescription] = useState(false);
  const toggleDescription = () => setDescription(!description);

  return (
    <Stack my={1} gap={2} maxWidth="99vw">
      <Box
        gap={3}
        width="100%"
        alignItems="end"
        flexWrap="wrap"
        display={{ xs: 'grid', md: 'flex' }}
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <Card
          sx={{
            width: 234,
            py: 1,
            px: 2,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Tickets
          </Typography>
          <Badge onClick={toggleDescription} sx={{ cursor: 'pointer' }}>
            <InfoOutline sx={{ boxShadow: 2, borderRadius: '50%' }} fontSize="small" color="disabled" />
          </Badge>
        </Card>

        {description && (
          <Card sx={{ p: 1.5 }}>
            <Typography variant="caption">{TicketToolTip}</Typography>
          </Card>
        )}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          display={{ xs: 'grid', sm: 'flex' }}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          width="100%"
          gap={3}
        >
          <TextField
            size="small"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: { xs: '100%', sm: 260, md: 300 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
            }}
          />

          <ButtonGroup>
            <Tooltip title="View tickets in Kanban board mode">
              <Button
                onClick={() => setView('board')}
                variant={view === 'board' ? 'contained' : 'outlined'}
                className={view === 'board' ? styles.btnPrimary : styles.btnSecondary}
                startIcon={<ViewKanbanIcon />}
              >
                BOARD
              </Button>
            </Tooltip>

            <Divider sx={{ border: '1px solid silver' }} />

            <Tooltip title="View tickets in tabular list mode">
              <Button
                onClick={() => setView('list')}
                variant={view === 'list' ? 'contained' : 'outlined'}
                className={view === 'list' ? styles.btnPrimary : styles.btnSecondary}
                startIcon={<ListAltIcon />}
              >
                LIST
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Tooltip title="Create New Ticket as Task, Invoice or Issue">
            <button className={styles.btnSecondary} onClick={onOpenCreate}>
              <FaPlusCircle /> &nbsp; NEW TICKET
            </button>
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  );
}
