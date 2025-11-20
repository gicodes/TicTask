'use client';

import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/buttons';
import { FaPlusCircle } from 'react-icons/fa';
import { Calendar, List, Search } from 'lucide-react';

interface PlannerToolbarProps {
  view: 'calendar' | 'list';
  setView: (v: 'calendar' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCreate: () => void;
  dateRangeLabel?: string;
}

const PlannerToolbar: React.FC<PlannerToolbarProps> = ({
  view,
  setView,
  searchQuery,
  setSearchQuery,
  onOpenCreate,
  dateRangeLabel,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: { sm: 'wrap'},
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: { xs: 3, sm: 2, md: 1},
        mb: 5,
      }}
    >
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Stack spacing={1} my={2} textAlign={{ xs: 'center', sm: 'inherit'}}>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}
          >
            Planner & Calendar
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Plan with time in mind. Calendar shows task and tickets with a due date.
          </Typography>
          {dateRangeLabel && (
            <Typography
              color="var(--secondary)"
              sx={{ fontWeight: 500 }}
            >
              {dateRangeLabel}
            </Typography>
          )}
        </Stack>
      </motion.div>

      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tasks..."
        size="small"
        fullWidth={isMobile}
        sx={{
          flex: isMobile ? '1 1 auto' : '0 0 300px',
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          maxWidth: 300,
          mx: { xs: 'auto', sm: 0 },
          pl: 0.5,
          boxShadow: 2,
          borderRadius: 999,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <Tooltip title="Calendar shows task and tickets with a due date">
          <IconButton
            onClick={() => setView('calendar')}
            color={view === 'calendar' ? 'success' : 'inherit'}
            sx={{
              p: 1.5,
              backgroundColor: view === 'calendar' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            }}
          >
            <Calendar size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="List all task and tickets created on this workspace">
          <IconButton
            onClick={() => setView('list')}
            color={view === 'list' ? 'success' : 'inherit'}
            sx={{
              p: 1.5,
              backgroundColor: view === 'list' ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
            }}
          >
            <List size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Create task as event or meeting and set date & time">
          <><Button
            onClick={onOpenCreate}
            tone="action"
            startIcon={<FaPlusCircle />}
            sx={{ flexShrink: 0 }}
          >
            ADD EVENT
          </Button></>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default PlannerToolbar;
