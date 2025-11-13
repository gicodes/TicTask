'use client';

import Link from 'next/link';
import Logo from '@/assets/txtLogo';
import { useAuth } from '@/providers/auth';
import { usePathname } from 'next/navigation';
import AiAssistantDrawer from '../_level_2/aiDrawer';
import { ReactNode, useEffect, useState } from 'react';
import { FaUserTie, FaUserShield } from 'react-icons/fa6';
import { Login, Menu as MenuIcon, Notifications } from '@mui/icons-material';
import { FaExternalLinkAlt, FaUserAstronaut, FaUserSecret, FaUsers } from 'react-icons/fa';
import { AUTH_ITEMS, getFilteredNav, MORE_NAV_ITEMS, NavbarAvatar, NewFeatureBadge } from '../_level_1/navItems';
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
  LinearProgress
} from '@mui/material';

export default function DashboardIndex({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [moreMenuList, setMoreMenuList] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isRouteChanging) {
      const timer = setTimeout(() => setIsRouteChanging(false), 600);
      return () => clearTimeout(timer);
    }
  }, [pathname, isRouteChanging]);

  if (!isMounted) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h6" py={6} color="var(--secondary)"> Loading...</Typography>
    </Box>
  );

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMoreMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMoreMenuList(!moreMenuList)
  }

  const filteredNav = getFilteredNav(user);
  const isLoggedIn = !!user;

  function userRole() {
    let variant = "USER";

    if (isLoggedIn && user) {
      if (user?.role==="USER" && user.userType==="BUSINESS") variant = "ORGANIZATION";
      if (user?.role==="USER" && user.collab) variant = "MODERATOR";
      if (user?.role==="USER" && user.partner) variant = "PARTNER";
      if (user?.role==="ADMIN") variant = "ADMIN";
      
      return variant;
    } else return null
  }

  const UserRole = () => (
    <Tooltip title={userRole()?.toLocaleLowerCase()}>
      <Box 
        display={'grid'} 
        alignContent={'center'} 
        fontSize={20} 
        justifyContent={'end'} 
        width={30}
      >
        {userRole()==="USER" && <FaUserShield />}
        {userRole()==="ORGANIZATION" && <FaUsers />} 
        {userRole()==="MODERATOR" && <FaUserAstronaut />}
        {userRole()==="PARTNER" && <FaUserTie />}
        {userRole()==="ADMIN" && <FaUserSecret />}
      </Box>
    </Tooltip>)

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
                  <Stack direction={'row'} gap={0.5} px={0.5}>
                    <NavbarAvatar user={user} size={40} />
                    <Tooltip title={'Go to profile'}>
                      <Link 
                        href={'/dashboard/profile'} 
                        style={{ 
                          display: 'grid', 
                          padding: '5px 10px',
                          minWidth: 180
                        }} 
                        className='hoverBg'
                        onClick={handleClose}
                      >
                        <Typography variant='caption'>{user?.name || 'Not Available'}</Typography>
                        <Typography className='font-xxs custom-dull'>{user?.email || 'please sign in'}</Typography>
                      </Link>
                    </Tooltip>
                    <UserRole />
                  </Stack>
                  <Link 
                    href={'/profile/edit/#status'} 
                    style={{ 
                      gap: 10, 
                      padding: 7.5, 
                      fontSize: 13, 
                      margin: '1px 0', 
                      display: 'flex', 
                      borderRadius: 5, 
                      border: '1px solid silver'
                    }}
                  >
                    <span>🗿</span> <>Set Status</>
                  </Link>
                  <Link 
                    href={'#'} 
                    style={{ 
                      gap: 10,
                      padding: 8, 
                      fontSize: 13, 
                      margin: '1px 0', 
                      display: 'flex', 
                    }}
                  >
                    <span>🔕</span> <>Mute Notifications</>
                  </Link>
                </Stack>
                <Divider sx={{ my: 1}} />
                { authMenuItems.slice(0, 6).map((item, i) => (
                  <Link key={i} href={item.href}>
                    <MenuItem 
                      disabled={item.disabled} 
                      style={{ 
                        fontSize: 13, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        minHeight: 36,
                        maxHeight: 40, 
                        margin: '5px 0'
                      }}
                    >
                      {item.label} {item.cta && <FaExternalLinkAlt />}
                    </MenuItem>
                  </Link>
                ))}
                <Divider sx={{ my: 1}} />
                { authMenuItems.slice(6).map((item, i) => (
                  <Link key={i} href={item.cta && !isLoggedIn ? '/auth/login' : item.href}>
                    <MenuItem 
                      disabled={item.disabled} 
                      style={{ 
                        fontSize: 13, 
                        minHeight: 36, 
                        maxHeight: 40, 
                        margin: '5px 0'
                      }} 
                      onClick={item.cta && isLoggedIn ? logout : handleClose}
                    >
                      {item.cta && !isLoggedIn ? <span className='flex items-center gap-2'> 
                        <Login fontSize='inherit' /> Login</span> : item.label}
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
        onClose={() => setOpen(!open)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Toolbar />
        <List sx={{ pt: 5, minWidth: 234}}>
          {filteredNav.map(item => (
            <Link href={item.path} key={item.path} onClick={item?.more ? handleMoreMenu : () => setOpen(!open)}>
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  style={{ marginLeft: -10}} 
                />
                {item?.released===false && <NewFeatureBadge />}
                {item?.external && <FaExternalLinkAlt size={15} color='var(--secondary)' />}
              </ListItemButton>
            </Link>
          ))}
        </List>
        <List>
        {moreMenuList && MORE_NAV_ITEMS.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => {
                setOpen(false);
                setIsRouteChanging(true);
              }}
            >
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} style={{ marginLeft: -10}} />
                {item?.external && <FaExternalLinkAlt size={15} color='var(--secondary)' />}
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
            <Link
              key={i}
              href={item.path}
              onClick={item?.more ? handleMoreMenu : () => {
                setOpen(false);
                setIsRouteChanging(true);
              }}
            >
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} style={{ marginLeft: -10}} />
                {item?.released===false && <NewFeatureBadge />}
                {item?.external && <FaExternalLinkAlt size={15} color='var(--secondary)' />}
              </ListItemButton>
            </Link>
          ))}
          {moreMenuList && MORE_NAV_ITEMS.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => {
                setOpen(false);
                setIsRouteChanging(true);
              }}
            >
              <ListItemButton selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} style={{ marginLeft: -10}} />
                {item?.external && <FaExternalLinkAlt size={15} color='var(--secondary)' />}
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
        <AiAssistantDrawer />
      </Box>

      {isRouteChanging && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000 }}
        />
      )}
    </Box>
  );
};
