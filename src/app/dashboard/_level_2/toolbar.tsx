import React, { useState} from 'react';

import { Card, Stack, TextField, Button, ButtonGroup, Box, Badge, Typography, Tooltip, Divider } from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { TicketToolTip } from '../_level_1/tooltips';
import SearchIcon from '@mui/icons-material/Search';
import { InfoOutline } from '@mui/icons-material';
import { FaPlusCircle } from 'react-icons/fa';
import styles from '@/app/page.module.css';

export default function Toolbar({ 
  view, setView, onOpenCreate }: { 
    view: 'board'|'list'; setView: (v:'board'|'list')=>void; onOpenCreate: ()=>void 
}) {
  const [ description, setDescription ] = useState(false);
  const toggleDescription = () => setDescription(!description);

  return (
    <Stack my={1} gap={2} minHeight={'125px'}>
      <Box 
        gap={3} 
        maxWidth={'99vw'}
        alignItems={'end'}
        display={{ xs: 'grid', md: 'flex' }}
        justifyContent={{xs: "center", md: 'space-between'} }
      >
        <Card 
          sx={{
            pt: 1,
            px: 2,
            pb: 0.5,
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <h4>Tickets</h4>
          <Badge onClick={toggleDescription} sx={{ cursor: 'pointer', px: 2}}>
            <InfoOutline sx={{ boxShadow: 2, borderRadius: '50%'}} fontSize='small' color='disabled' />
          </Badge>
        </Card>
        <Stack 
          direction={{ xs: "column", md: 'row' }} 
          display={{ xs: 'grid', md: 'flex' }}
          justifyContent={"space-between" }
          alignItems="center"
          flexWrap={'wrap'}
          width={'100%'}
          gap={3}
        >
          <TextField 
            size="small" 
            placeholder="Search tickets..." 
            // set search props
            InputProps={{ startAdornment: <SearchIcon /> }} 
          />
              
          <ButtonGroup>
            <Tooltip title='View tickets in board mode, Kanban'>
              <Button 
                onClick={() => setView('board')} 
                variant={view==='board' ? 'contained' : 'outlined'} 
                className={view==='board' ? `${styles.btnPrimary}`: styles.btnSecondary} 
                startIcon={<ViewKanbanIcon />}
              >
                Board
              </Button>
            </Tooltip>
            <Divider sx={{ border: '1px solid silver'}} />
            <Tooltip title='View tickets in list mode, Tabular'>
              <Button  
                onClick={() => setView('list')} 
                variant={view==='list' ? 'contained' : 'outlined'} 
                className={view==='list' ? styles.btnPrimary : styles.btnSecondary} 
                startIcon={<ListAltIcon />}
              >
                List
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Tooltip title='Create New Ticket as Task, Invoice or Issue'>
            <Button 
              className={styles.btnSecondary} 
              onClick={onOpenCreate}
            >
              <FaPlusCircle />&nbsp; New Ticket
            </Button>
          </Tooltip>
        </Stack>
      </Box>
      {description && 
      <Card sx={{ p: 1.5, width: 'max-content', maxWidth: '90vw'}}>
        <Typography variant='caption'>{TicketToolTip}</Typography>
      </Card>}
    </Stack>
  );
}