import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';
import { TICKET_TOOLBAR_PROPS } from '../_level_1/tSchema';
import { Button } from '@/assets/buttons';
import { useState } from 'react';
import { 
  Box, 
  Stack, 
  Tooltip, 
  TextField,
  InputAdornment,
  useMediaQuery,
  Collapse,
  IconButton,
  Switch, 
  FormControlLabel
} from '@mui/material';
import { PenTool } from 'lucide-react';
import { FaPlusCircle, FaList } from 'react-icons/fa';
import {  } from '@mui/material';
import { Close, Search, ViewKanban } from '@mui/icons-material';

const Toolbar: React.FC<TICKET_TOOLBAR_PROPS> = ({ 
  view, 
  setView, 
  onOpenCreate, 
  searchQuery, 
  setSearchQuery 
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
        pt: { xs: 1, sm: 0 }
      }}
    >
      <section id='tickets'>
        <GenericDashboardPagesHeader
          title='Tickets Hub'
          description='Create and manage tickets in easy mode.'
        />
      </section>

      <Collapse in={!isMobile || open} sx={{ width: '100%'}}>
        <Stack
          spacing={{ xs: 2, md: 3, lg: 5 }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          width="100%"
          mb={{ xs: 1, sm: 0 }}
        >
          <section id="search" className='full-width'>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              size="small"
              fullWidth={isMobile}
              sx={{
                width: { sm: 212, md: 234, lg: 360 },
                backgroundColor: 'background.paper',
                borderRadius: 2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </section>

          <Stack 
            direction={'row'} 
            spacing={2} 
            alignItems="center" 
            width={'100%'}
            justifyContent={'space-between'}
          >
            <section id="view-toggle">
              <Tooltip
                title={
                  view === "board"
                    ? "Currently in board view. Toggle to switch to list view"
                    : "Currently in list view. Toggle to switch to board view"
                }
                arrow
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={view === 'board'}
                      onChange={(e) =>
                        setView(e.target.checked ? 'board' : 'list')
                      }
                      color="info"
                    />
                  }
                  label={
                    <Box sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box display={{ xs: 'none', sm: 'block'}} mr={0.5} fontSize={15}>
                        {view === 'board' ? 'Board' : 'List'}
                      </Box>
                      {view === 'board' ? <ViewKanban
                        color={view === 'board' ? 'action' : 'disabled'}
                      />
                      : <FaList
                        color={view === 'list' ? 'var(--primary)' : 'var(--disabled)'}
                      />
                    }
                    </Box>
                    }
                  sx={{ m: 0 }}
                />
              </Tooltip>
            </section>

            <section 
              id="new-ticket-btn" 
              className='flex justify-center'
            >
              <Tooltip title="Create New Ticket">
                <div>
                  <Button
                    startIcon={<FaPlusCircle />}
                    onClick={onOpenCreate}
                    tone="action"
                    sx={{ minWidth: 196 }}
                  >
                    NEW TICKET
                  </Button>
                </div>
              </Tooltip>
            </section>
          </Stack>

        </Stack>
      </Collapse>

      {isMobile && (
        <Tooltip title={open ? 'Hide tools' : 'Show tools'}>
          <IconButton
            onClick={() => setOpen(v => !v)}
            sx={{
              position: 'fixed',
              top: '20%',
              left: 0,
              zIndex: 1200,
              width: 50,
              backgroundColor: 'var(--surface-1)',
              boxShadow: 5,
              borderRadius: '0 99px 99px 0',
            }}
          > 
            {open ? (
              <Close sx={{ border: '1px solid tomato', borderRadius: '50%'}} />
            ) : (
              <PenTool />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default Toolbar;
