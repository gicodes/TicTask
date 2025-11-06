'use client';
import React from 'react';
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
import styles from "@/app/page.module.css";
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
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: { xs: 3, sm: 2, md: 1},
        mb: 5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
        >
          Task Planner
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
        maxWidth={250}
        mx={{xs: 'auto', sm: 0}}
        justifyContent={'space-between'}
        sx={{ borderRadius: 999, pl: 2, bgcolor: 'var(--surface-1)', color: 'var(--foreground)' }} 
      >
        <Tooltip title="Calendar View">
          <IconButton
            onClick={() => setView('calendar')}
            color={view === 'calendar' ? 'success' : 'inherit'}
          >
            <Calendar size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="List View">
          <IconButton
            onClick={() => setView('list')}
            color={view === 'list' ? 'success' : 'inherit'}
          >
            <List size={20} />
          </IconButton>
        </Tooltip>

        <Typography
          component={'button'}
          onClick={onOpenCreate}
          className={styles.btnPrimary}
        >
          <FaPlusCircle />&nbsp;ADD TASK
        </Typography>
      </Stack>
    </Box>
  );
};

export default PlannerToolbar;
