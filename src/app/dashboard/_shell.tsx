'use client';

import Link from 'next/link';
import Logo from '@/assets/txtLogo';
import styles from '@/app/page.module.css';
import { useAuth } from '@/providers/auth';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AUTH_ITEMS, NAV_ITEMS } from './navItems';
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
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export default function DashboardIndex({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const { user } = useAuth();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const filteredNav = NAV_ITEMS.filter(item => {
    if (user?.role === 'ADMIN') return true;
    if (user?.userType === 'PERSONAL' && item.label === 'Team') return false;
    return true;
  });

  const isLoggedIn = !!user;

  const authMenuItems = AUTH_ITEMS.map(item => {
    const isDisabled =
      !isLoggedIn &&
      (item.label === 'Edit Profile' || item.label === 'Settings');

    if (item.label === 'Logout' && !isLoggedIn) {
      return { ...item, label: 'Login', href: `/auth/login/` };
    }

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
      <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" onClick={() => setOpen(!open)}>
              <MenuIcon sx={{ display: { md: 'none' }, mr: 1 }} />
            </IconButton>
            <Logo />
          </Box>

          <Box>
            <Tooltip title={isLoggedIn ? user?.name || 'Profile' : 'Not logged in'}>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar
                  src={user?.photo || ''}
                  sx={{
                    bgcolor: user ? 'primary.main' : 'grey.500',
                    width: 36,
                    height: 36,
                    fontSize: 15,
                  }}
                >
                  {user ? user.name?.[0]?.toUpperCase() : 'NA'}
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
              {authMenuItems.map((item, index) => (
                <Box key={item.label}>
                  <Link href={item.href}>
                    <MenuItem
                      onClick={handleClose}
                      disabled={item.disabled}
                      sx={{  
                        px: 3,
                        fontSize: 15, 
                        display: 'flex', 
                        justifyContent: 'center',
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  </Link>
                  {index < authMenuItems.length - 1 && (
                    <Divider sx={{ my: 0.25, mx: 1.5, opacity: 0.6 }} />
                  )}
                  </Box>
                ))}
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
        <List>
          <Toolbar />
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
        <List>
          <Toolbar />
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

      <Box component="main" sx={{ p: 3, height: '100%', flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
