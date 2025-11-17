import { Box, IconButton, Menu, Stack, Tooltip, Typography } from '@mui/material';
import { useNotifications } from '@/providers/notifications';
import { MarkChatRead } from '@mui/icons-material';

const NotificationDrop = ({ anchorEl, handleClose }: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{ marginTop: 1.75, marginLeft: -5.75 }}
    >
      <Box minWidth={{ xs: 260, sm: 280, md: 300 }}>
        <Stack direction="row" justifyContent="space-between" px={2} my={1}>
          <Typography variant='body2' fontWeight={600} pb={1} borderBottom={'1px solid var(--secondary)'}>Notifications</Typography>
          { notifications.length >= 1 && <Typography
            variant="caption"
            sx={{ cursor: "pointer", color: "info.main",
              "&:hover": { borderBottom: '1px solid var(--info)' } }}
            onClick={markAllAsRead}
          >
            Mark all read
          </Typography>}
        </Stack>
        { notifications.length > 0 ? <Stack>
          { notifications.slice(0, 5).map((n) => (
            <Box
              key={n.id}
              px={2}
              py={1.5}
              sx={{
                borderBottom: n.id !== notifications[notifications.length -1].id ? "1px solid var(--divider)" : "none",
                background: n.read ? "transparent" : "rgba(25,118,210,0.08)",
                cursor: "pointer",
                display: 'grid',
                gap: 0.5
              }}
              onClick={() => handleClose()}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={{ xs: 14, md: 14.5}} fontWeight={501}>{n.title}</Typography>
                { n.read === false && 
                  <Tooltip title='Mark as read'>
                    <IconButton
                      sx={{"&:hover": { borderBottom: '1px solid var(--info)' } }}
                      onClick={() => {
                        markAsRead(n.id);
                        handleClose();
                      }}
                    >
                      <MarkChatRead color='info' fontSize='small' />
                    </IconButton>
                  </Tooltip>} 
              </Stack>

              <Stack pl={1}>
                <Typography fontSize={{ xs: 12.5, sm: 13, lg: 13.5}}>{n.message}</Typography>
                <Typography fontSize={{ xs: 10.5, sm: 11, lg: 11.5}} color="text.secondary">
                  {new Date(n.createdAt).toLocaleString()}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack> 
        : 
        <Typography px={2} py={4}>No New Notifications</Typography>}
      </Box>
    </Menu>
  );
};

export default NotificationDrop;
