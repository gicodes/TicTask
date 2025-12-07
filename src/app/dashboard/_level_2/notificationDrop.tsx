import { Box, Button, IconButton, Menu, Stack, Tooltip, Typography } from '@mui/material';
import { useNotifications } from '@/providers/notifications';
import { Delete, MarkChatRead } from '@mui/icons-material';
import Link from 'next/link';

interface NotificationDropDownProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const NotificationDropDown = ({ 
  anchorEl, 
  handleClose
}: NotificationDropDownProps ) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearNotifications 
  } = useNotifications();
  
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
          { notifications.length >= 1 &&
            <>{notifications.some(n => n.read === false) ? 
              <Typography
                variant="caption"
                sx={{ 
                  cursor: "pointer", 
                  color: "info.main",
                  "&:hover": { borderBottom: '1px solid var(--info)' } 
                }}
                onClick={markAllAsRead}
              >
                Mark all read
              </Typography> 
                :
              <Typography
                variant="caption"
                sx={{ cursor: "pointer", color: "error.main",
                  "&:hover": { borderBottom: '1px solid var(--error)' } }}
                onClick={clearNotifications}
              >
                Clear all
              </Typography> 
            }</>
          }
        </Stack>
        { notifications.length > 0 ? 
          <Stack>
            { notifications.slice(0, 5).map((n) => (
              <Box
                key={n.id}
                px={2}
                py={1}
                sx={{
                  borderBottom: n.id !== notifications[notifications.length -1].id ? "1px solid var(--disabled)" : "none",
                  background: n.read ? "transparent" : "rgba(25,118,210,0.08)",
                  cursor: "pointer",
                  display: 'grid',
                }}
                onClick={() => handleClose()}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={{ xs: 14, md: 14.5}} fontWeight={501} sx={{ opacity: 0.75}}>{n.title}</Typography>
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
                    </Tooltip>
                  } 
                </Stack>

                <Stack pl={1} spacing={-1} display={'grid'}>
                  <Typography 
                    fontSize={{ 
                      xs: 12.5, 
                      sm: 13, 
                      lg: 13.5
                    }}
                  >
                    {n.message}
                  </Typography>
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="space-between"
                  >
                    <Typography 
                      fontSize={{ 
                        xs: 10.5, 
                        sm: 11, 
                        lg: 11.5
                      }} 
                      color="text.secondary"
                    >
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                    <Tooltip title='Remove notification'>
                      <IconButton onClick={() => removeNotification}>
                        <Delete fontSize='small' color='disabled' />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack> 
        : 
        <Typography px={2} py={4}>No New Notifications</Typography>}

        <Box px={2} mt={1}>
          <Link href={'/dashboard/notifications'} onClick={handleClose}>
            <Button 
              fullWidth 
              size='small'
              variant='outlined' 
              sx={{ textTransform: 'none', height: 36, fontSize: 13}}
            >
              Manage Feed
            </Button>
          </Link>
        </Box>
      </Box>
    </Menu>
  );
};

export default NotificationDropDown;
