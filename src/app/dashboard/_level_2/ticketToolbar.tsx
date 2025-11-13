import { 
  Stack, 
  TextField, 
  Button, 
  ButtonGroup, 
  Box, 
  Typography, 
  Tooltip, 
  Divider, 
  InputAdornment, 
} from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { FaPlusCircle, FaList } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import styles from '@/app/page.module.css';
import { motion } from 'framer-motion';

export default function Toolbar({ 
  view, setView, onOpenCreate, searchQuery, setSearchQuery 
}: { 
    view: 'board' | 'list'; 
    setView: (v: 'board' | 'list') => void; 
    onOpenCreate: () => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
}) {  
  return (
    <Stack gap={2} maxWidth="99vw" mb={2}>
      <Box
        gap={1}
        flexWrap={{ md: 'wrap'}}
        alignItems="center"
        display={{ xs: 'grid', md: 'flex' }}
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <section id='tickets'>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Stack spacing={1} my={2} textAlign={{ xs: 'center', sm: 'inherit'}}>
              <Typography
                variant="h4"
                fontWeight={600}
                sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}
              >
                Tickets Overview
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }} minWidth={{ lg: 555}}>
                Create new ticket, change view from kanban to list and search for tickets. 
              </Typography>
            </Stack>
          </motion.div>
        </section>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          display={{ xs: 'grid', sm: 'flex' }}
          justifyContent={{ xs: 'center', sm: "space-between"}}
          alignItems="center"
          width="100%"
          gap={2}
        >
          <section id='search'>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              size="small"
              sx={{ minWidth: { xs: 333, sm: 200}}}
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
            <ButtonGroup sx={{ display: 'flex', justifyContent: 'center'}}>
              <Tooltip title="View tickets in Kanban board mode">
                <Button
                  onClick={() => setView('board')}
                  color='inherit'
                  size='small'
                  variant={view === 'board' ? 'outlined' : 'contained'}
                  startIcon={<ViewKanbanIcon />}
                >
                  BOARD
                </Button>
              </Tooltip>
              <Divider sx={{ border: '1px solid var(--secondary)' }} />
              <Tooltip title="View tickets in tabular list mode">
                <Button
                  color='inherit'
                  size='small'
                  onClick={() => setView('list')}
                  variant={view === 'list' ? 'outlined' : 'contained'}
                  startIcon={<FaList />}
                >
                  LIST
                </Button>
              </Tooltip>
            </ButtonGroup>
          </section>

          <section id='new-ticket-btn'>
            <Tooltip title="Create New Ticket as Task, Invoice or Issue">
              <button className={`${styles.btnAction} mx-auto`} onClick={onOpenCreate}>
                <FaPlusCircle /> &nbsp; NEW TICKET
              </button>
            </Tooltip>
          </section>
        </Stack>
      </Box>
    </Stack>
  );
}
