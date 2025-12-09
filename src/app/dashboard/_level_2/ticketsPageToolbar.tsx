import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader';
import { Button } from '@/assets/buttons';
import { 
  Box, 
  Stack, 
  Tooltip, 
  TextField,
  ButtonGroup, 
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import { FaPlusCircle, FaList } from 'react-icons/fa';
import { Search, ViewKanban } from '@mui/icons-material';
import { TICKET_TOOLBAR_PROPS } from '../_level_1/tSchema';

const Toolbar: React.FC<TICKET_TOOLBAR_PROPS> = ({ 
  view, 
  setView, 
  onOpenCreate, 
  searchQuery, 
  setSearchQuery 
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
        mb: 5,
        pt: { xs: 1, sm: 0 }
      }}
    >
      <section id='tickets'>
        <GenericDashboardPagesHeader
          title='Tickets Hub'
          description='Create and manage tickets in easy mode.'
        />
      </section>

      <Stack
        spacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={"space-between"}
        width={'100%'}
      >
        <section id='search'>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
            size="small"
            fullWidth={isMobile}
            sx={{
              width: { sm: 212, md: 234, lg: 360 },
              flex: isMobile ? '1 1 auto' : '',
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
        
        <section id='view-toggle'>
          <ButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title={view==="board" ? "Showing tickets in kanban. Currently on this view" : "Switch to kanban for board view"} arrow>
              <div>
                <Button
                  onClick={() => setView('board')}
                  tone={view === 'board' ? "primary" : 'action'}
                  variant={view === 'board' ? 'contained' : 'outlined'}
                  startIcon={<ViewKanban />}
                  sx={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  BOARD
                </Button>
              </div>
            </Tooltip>
            <Tooltip title={view==="list" ? "Showing tickets as list. Currently on this view" : "Switch to list, see tickets in table view"} arrow>
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
          <Box sx={{ display: { xs: 'block', sm: 'none', minHeight: 10 }}} />
          <Tooltip title="Create New Ticket as Support, Invoice or Issue">
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