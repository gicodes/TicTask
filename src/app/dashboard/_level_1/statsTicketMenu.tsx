import { Menu, MenuItem, ListItemText } from "@mui/material";
import { PinnedProps } from "@/types/team";

export default function StatsTicketsMenu({
  anchor,
  close,
  tickets,
  openDetail,
}: PinnedProps) {
  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={close}
      PaperProps={{
        sx: { width: 320, borderRadius: 2 },
      }}
    >
      {tickets.length === 0 && (
        <MenuItem disabled>
          <ListItemText primary="Nothing here" />
        </MenuItem>
      )}

      {tickets.map((t) => (
        <MenuItem
          key={t.id}
          onClick={() => {
            close();
            openDetail(t.id);
          }}
        >
          <ListItemText
            sx={{ 
              display: 'grid',
              gap: 1
            }}
            primary={t.title}
            secondary={t.status}
          />
        </MenuItem>
      ))}
    </Menu>
  );
}