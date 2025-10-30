'use client';

import Link from 'next/link';
import Logo from '@/assets/txtLogo';
import { useAuth } from '@/providers/auth';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Login, Menu as MenuIcon, Notifications } from '@mui/icons-material';
import { AUTH_ITEMS, NAV_ITEMS, NavbarAvatar, NewFeatureBadge } from '../_level_1/navItems';
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
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Stack,
  Typography,
  Badge,
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
    if (user?.userType === 'PERSONAL' && item.label === 'Team') 
      return false;
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
        width: '100%',
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
              <MenuIcon sx={{ display: { md: 'none' }, mr: 2 }} />
            </IconButton>
            <Logo />
          </Box>

          <Box gap={2} display={'flex'}>
            <Tooltip title={'Notifications'}>
              <IconButton sx={{ p: 0 }}>
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title={isLoggedIn ? user?.name || 'Profile' : 'Not logged in'}>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <NavbarAvatar user={user} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ marginTop: 1.75, marginLeft: 1.75}}
            >
              <Box minWidth={{ xs: 250, sm: 280, md: 300}}>
                <Stack px={1} gap={1}>
                  <Stack direction={'row'} gap={1.5} my={1}>
                    <NavbarAvatar user={user} size={40} />
                    <Tooltip title={'Go to profile'}>
                      <Link href={'/dashboard/profile'} style={{ display: 'grid'}}>
                        <Typography variant='caption'>{user?.name || 'Not Available'}</Typography>
                        <Typography className='font-xxs custom-dull'>{user?.email || 'please sign in'}</Typography>
                      </Link>
                    </Tooltip>
                  </Stack>
                  <Link href={'/profile/edit/#status'} style={{ padding: 5, fontSize: 12, borderRadius: 5, border: '1px solid silver'}}>🗿 &nbsp; Set Status</Link>
                  <Link href={'#'} style={{ padding: 5, fontSize: 12}}>🔕 &nbsp; Mute Notifications</Link>
                </Stack>
                <Divider sx={{ my: 1}} />
                { authMenuItems.slice(0, 6).map((item, i) => (
                  <Link key={i} href={item.href}>
                    <MenuItem disabled={item.disabled} style={{ fontSize: 12}}>
                      {item.label}
                    </MenuItem>
                  </Link>
                ))}
                <Divider sx={{ my: 1}} />
                { authMenuItems.slice(6).map((item, i) => (
                  <Link key={i} href={!isLoggedIn && item.disabled ? '' : item.href}>
                    <MenuItem disabled={item.disabled} style={{ fontSize: 12}} onClick={item.cta && isLoggedIn ? logout : handleClose}>
                      {item.cta && !isLoggedIn ? <Link href={'/auth/login'} style={{ display: 'flex', gap: 11 }}> <Login fontSize='inherit' /> Login</Link> : item.label}
                    </MenuItem>
                  </Link>
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
                <ListItemText primary={item.label} style={{ marginLeft: -5, marginRight: 5}} />
                {item?.released===false && <NewFeatureBadge />}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: { md: 222, lg: 250},
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: { md: 222, lg: 250}, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List sx={{ pt: 5}}>
          {filteredNav.map((item, i) => (
            <Link href={item.path} key={i}>
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item?.released===false && <NewFeatureBadge />}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', height: '100%', pb: 5}}>
        <Toolbar />
        {children}
        <Box textAlign={'center'} mt={5}>
          <Typography fontFamily={'serif'} fontWeight={501} className='custom-dull'><i>Unleash the power of your mind— one task at a time</i></Typography>
        </Box>
      </Box>
    </Box>
  );
};
