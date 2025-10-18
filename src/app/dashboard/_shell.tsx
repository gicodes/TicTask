'use client';

import Link from 'next/link';
import Logo from '@/assets/txtLogo';
import { GiLogging } from 'react-icons/gi';
import { useAuth } from '@/providers/auth';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FcOrganization } from 'react-icons/fc';
import { FaPeopleCarry, FaUsers } from 'react-icons/fa';
import { CreditCard, Group, Notifications, People, Person, Settings, Menu, Event, Home } from '@mui/icons-material';
import { AppBar, Toolbar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, IconButton, Typography } from '@mui/material';

const NAV_ITEMS = [
  { label: 'Tickets', path: '/dashboard/tickets', icon: <Event /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <Person /> },
  { label: 'Notifications', path: '/dashboard/notifications', icon: <Notifications /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <Settings /> },
  { label: 'Team', path: '/dashboard/team', icon: <Group /> },
  { label: 'Clients', path: '/dashboard/clients', icon: <People /> },
  { label: 'Subscription', path: '/dashboard/subscription', icon: <CreditCard /> },
  { label: 'Home', path: '/', icon: <Home /> },
  { label: 'All Users', path: '/dashboard/users', icon: <FaUsers /> },
  { label: 'Partners', path: '/dashboard/partners', icon: <FaPeopleCarry /> },
  { label: 'Organizations', path: '/dashboard/organizations', icon: <FcOrganization /> },
  { label: 'System Logs', path: '/dashboard/logs', icon: <GiLogging /> },
];

export default function DashboardIndex ({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredNav = NAV_ITEMS.filter(item => {
    if (user?.role === 'ADMIN') return true;
    if (user?.userType === 'PERSONAL' && item.label === 'Team') return false;
    return true;
  });

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        color:'text.primary',
        bgcolor:'background.default',
      }} 
    >
      <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>        
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpen(!open)}>
            <Menu sx={{ display: { md: 'none'}, mr: 5}} />
          </IconButton>
          <Logo />
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        sx={{ display: { xs: 'block', md: 'none',}}}
      >
        <Toolbar />
        <List>
          <Toolbar/>
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
};