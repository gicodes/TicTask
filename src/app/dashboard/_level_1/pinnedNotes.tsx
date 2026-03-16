import { Ticket } from '@/types/ticket';
import { PinnedProps } from '@/types/team';
import { PushPin } from '@mui/icons-material';
import {
  Menu, 
  MenuItem, 
  ListItemText, 
  ListItemIcon 
} from '@mui/material';

const PinnedNotes = ({
    anchor,
    close,
    tickets,
    openDetail
  }: PinnedProps
) => {
  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={close}
      PaperProps={{
        sx: {
          width: 320,
          borderRadius: 2,
          p: 0.5,
        }
      }}
    >
      { tickets.length === 0 && (
        <MenuItem disabled>
          <ListItemText primary="No pinned notes" />
        </MenuItem>
      )}

      {tickets.map(
        (note: Ticket) => (
        <MenuItem
          key={note.id}
          onClick={() => {
            close();
            openDetail(note.id);
          }}
        >
          <ListItemIcon>
            <PushPin fontSize="small" />
          </ListItemIcon>

          <ListItemText
            primary={note.title}
            secondary={note.description?.slice(0, 60)}
          />
        </MenuItem>
      ))}
    </Menu>
  )
}

export default PinnedNotes