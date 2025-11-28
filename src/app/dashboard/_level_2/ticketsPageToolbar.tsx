import { 
  Box, 
  Stack, 
  Tooltip, 
  TextField,
  Typography,  
  ButtonGroup, 
  InputAdornment,
} from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { TICKET_TOOLBAR_PROPS } from '../_level_1/tSchema';
import { FaPlusCircle, FaList } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@/assets/buttons';
import { motion } from 'framer-motion';
import React from 'react';

const Toolbar: React.FC<TICKET_TOOLBAR_PROPS> = ({ 
  view, 
  setView, 
  onOpenCreate, 
  searchQuery, 
  setSearchQuery 
}) => {  
  return (
    <Box
      px={1}
      pb={2}
      gap={1}
      width={'100%'}
      alignItems="center"
      flexWrap={{ md: 'wrap'}}
      display={{ xs: 'grid', md: 'flex' }}
      justifyContent={{ xs: 'center', md: 'space-between' }}
    >
      <section id='tickets'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <Stack 
            my={2} 
            spacing={1} 
            textAlign={{ xs: 'center', sm: 'inherit'}}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}
            >
              Tickets Overview
            </Typography>
            <Typography sx={{ opacity: 0.7 }} minWidth={{ sm: 360 }}>
              Create new ticket, change view from kanban to list and search for tickets. 
            </Typography>
          </Stack>
        </motion.div>
      </section>

      <Stack
        justifyContent={{ xs: 'center', sm: "space-between"}}
        direction={{ xs: 'column', sm: 'row' }}
        display={{ xs: 'grid', sm: 'flex' }}
        gap={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        alignItems="center"
        width={'100%'}
      >
        <section id='search'>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
            size="small"
            sx={{ 
              minWidth: { xs: 300, sm: 150, lg: 360 }, 
              maxWidth: { xs: 321, sm: 234, lg: 420 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
            }}
          />
        </section>
        
        <section id='view-toggle'>
          <ButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title="View tickets in Kanban board mode" arrow>
              <div>
                <Button
                  onClick={() => setView('board')}
                  tone={view === 'board' ? "primary" : 'action'}
                  variant={view === 'board' ? 'contained' : 'outlined'}
                  startIcon={<ViewKanbanIcon />}
                  sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  BOARD
                </Button>
              </div>
            </Tooltip>
            <Tooltip title="View tickets in tabular list mode" arrow>
              <div>
                <Button
                  tone={view === 'list' ? 'primary' : "action"}
                  variant={view === 'list' ? 'contained' : 'outlined'}
                  onClick={() => setView('list')}
                  startIcon={<FaList />}
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  LIST
                </Button>
              </div>
            </Tooltip>
          </ButtonGroup>
        </section>

        <section id="new-ticket-btn">
          <Box sx={{ display: { xs: 'block', sm: 'none', minHeight: 15 }}} />
          <Tooltip title="Create New Ticket as Task, Invoice or Issue">
            <div>
              <Button
                startIcon={<FaPlusCircle />}
                onClick={onOpenCreate}
                tone='action'
                sx={{ margin: '0 auto', display: 'flex', minWidth: 196 }}
              >
                NEW TICKET
              </Button>
            </div>
          </Tooltip>
        </section>
      </Stack>
    </Box>
  );
}

export default Toolbar;
