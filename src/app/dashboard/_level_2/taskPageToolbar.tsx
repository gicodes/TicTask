'use client';

import { useState } from 'react';
import { Button } from '@/assets/buttons';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import { FaPlusCircle } from 'react-icons/fa';
import { Close, Tune } from '@mui/icons-material';
import { Calendar, List, Search } from 'lucide-react';
import { PLANNER_TOOLBAR_PROPS } from '../_level_1/tSchema';
import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';

const PlannerToolbar: React.FC<PLANNER_TOOLBAR_PROPS> = ({
  view,
  setView,
  searchQuery,
  setSearchQuery,
  onOpenCreate,
  dateRangeLabel,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(!isMobile);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: { sm: 'wrap'},
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: 2,
        mb: { sm: 5 },
        pt: { xs: 2, sm: 1 }
      }}
    >
      <GenericDashboardPagesHeader 
        title="Task Manager"
        description="Manage your time, plan with a timeline in mind."
        extras={dateRangeLabel && (
          <Typography color="var(--secondary)" sx={{ fontWeight: 500 }}>
            {dateRangeLabel}
          </Typography>
        )}
      />

      <Collapse in={!isMobile || open} sx={{ width: '100%'}}>
        <Stack 
          direction={{ xs: 'column', sm: 'row'}} 
          justifyContent={'space-between'}
          width={'100%'}
          spacing={2}
          mb={{ xs: 3, sm: 0 }}
        >
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
              minWidth: { sm: 300, md: 360 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />

          <Box display={'flex'} justifyContent={{ xs: 'center', sm: 'end'}}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                maxWidth: 300,
                mx: { xs: '0 auto', sm: 0 },
                boxShadow: 2,
                borderRadius: 999,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <Tooltip
                arrow 
                title={view==="calendar" ? 
                  "Showing calendar. Currently on this view" 
                  : "View page on big calendar. Only show items with date"}
              >
                <IconButton
                  onClick={() => setView('calendar')}
                  color={view === 'calendar' ? 'success' : 'inherit'}
                  sx={{
                    p: 1.5,
                    backgroundColor: view === 'calendar' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    boxShadow: view === 'calendar' ? 2 : '',
                  }}
                >
                  <Calendar size={20} />
                </IconButton>
              </Tooltip>

              <Tooltip 
                arrow 
                title={view==="list" ? 
                  "Showing as list. Currently on this view" 
                  : "Switch to list all items created on this workspace"}
                >
                <IconButton
                  onClick={() => setView('list')}
                  color={view === 'list' ? 'success' : 'inherit'}
                  sx={{
                    p: 1.5,
                    backgroundColor: view === 'list' ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                    boxShadow: view === 'list' ? 2 : '',
                  }}
                >
                  <List size={20} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Create task as event or meeting and set date & time">
                <div>
                  <Button
                    onClick={onOpenCreate}
                    tone="action"
                    startIcon={<FaPlusCircle />}
                    sx={{ flexShrink: 0 }}
                  >
                    ADD EVENT
                  </Button>
                </div>
              </Tooltip>
            </Stack>
          </Box>
        </Stack>
      </Collapse>

      { isMobile && (
        <Tooltip title={open ? 'Hide tools' : 'Show tools'}>
          <IconButton
            onClick={() => setOpen(v => !v)}
            sx={{
              position: 'fixed',
              top: 80,
              left: 0,
              zIndex: 1200,
              width: 50,
              backgroundColor: 'var(--surface-2)',
              boxShadow: 5,
              borderRadius: '0 99px 99px 0',
            }}
          >
            {open ? (<Close sx={{ border: '1px solid tomato', borderRadius: '50%'}} />) : (<Tune />)}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default PlannerToolbar;
