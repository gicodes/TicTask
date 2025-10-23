'use client';

import Link from 'next/link';
import Logo from '@/assets/txtLogo';
import { useAuth } from '@/providers/auth';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon } from '@mui/icons-material';
import { AUTH_ITEMS, NAV_ITEMS } from '../_level_1/navItems';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Stack,
  Typography,
} from '@mui/material';

export default function DashboardIndex({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const filteredNav = NAV_ITEMS.filter(item => {
    if (user?.role === 'ADMIN') return true;
    if (user?.userType === 'PERSONAL' && item.label === 'Team') return false;

    return true;
  });

  const isLoggedIn = !!user;

  const authMenuItems = AUTH_ITEMS.map(item => {
    const isDisabled = !isLoggedIn &&
      (item.label === 'Edit Profile' || item.label === 'Settings');

    if (item.label === 'Logout' && !isLoggedIn) return { 
      ...item, label: 'Login', href: `/auth/login/` };

    return { ...item, disabled: isDisabled };
  });

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        color: 'text.primary',
        bgcolor: 'background.default',
      }}
    >
      <AppBar 
        position="fixed" 
        color="default" 
        sx={{ zIndex: 1201, minHeight: 60 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" onClick={() => setOpen(!open)}>
              <MenuIcon sx={{ display: { md: 'none' }, mr: 3 }} />
            </IconButton>
            <Logo />
          </Box>

          <Box>
            <Tooltip title={isLoggedIn ? user?.name || 'Profile' : 'Not logged in'}>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar
                  src={user?.photo || ''}
                  sx={{
                    // In scale: TEAM_ADMIN='var(--sharp)' ? 'primary.main', ADMIN='var(--surface-1)' 
                    bgcolor: user ? 'var(--surface-1)' : 'var(--surface-2)', 
                    width: 36,
                    height: 36,
                    fontSize: 15,
                  }}
                >
                  <Typography color={'var(--bw)'}>{user ? user.name?.[0]?.toUpperCase() : 'NA'}</Typography>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ marginTop: 1 }}
            >
              <Box minWidth={120}>
                { user && <Box my={1}>
                  <Tooltip title={'Edit Profile'}>
                    <Link href={'/dashboard/profile/edit'}>
                      <Stack sx={{ px: 1, pb: 1, textAlign: 'center'}}>
                        <Typography variant='caption'>{user.name}</Typography>
                        <Typography className='font-xxs custom-dull'>{user?.email}</Typography>
                      </Stack>
                    </Link>
                  </Tooltip>
                  <Divider sx={{ border: '1px solid var(--dull-gray)'}} />
                  </Box>
                }{ authMenuItems.map((item, index) => (
                  <Box key={index}>
                    <Link href={!isLoggedIn && item.disabled ? '' : item.href}>
                      <MenuItem
                        onClick={
                          item.label === 'Logout' && isLoggedIn ? logout : handleClose
                        }
                        disabled={item.disabled}
                        sx={{  
                          px: 3,
                          fontSize: 14, 
                          display: 'flex', 
                          justifyContent: 'center',
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    </Link>
                    { index < authMenuItems.length - 1 && (
                      <Divider sx={{ my: 0.05, mx: 'auto', opacity: 0.6, width: '25%' }} />
                    )}
                    </Box>
                  ))}
                </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Toolbar />
        <List sx={{ pt: 5}}>
          {filteredNav.map(item => (
            <Link href={item.path} key={item.path}>
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List sx={{ pt: 5}}>
          {filteredNav.map(item => (
            <Link href={item.path} key={item.path}>
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" 
        sx={{ flexGrow: 1, minHeight: '100vh', height: '100%', pb: 5}}
      >
        <Toolbar />
        {children}
        <Box textAlign={'center'} mt={10}>
          <Typography fontFamily={'serif'} fontWeight={501} className='custom-dull'><i>"Unleash the Power of your mind — one task at a time”</i></Typography>
        </Box>
      </Box>
    </Box>
  );
};
