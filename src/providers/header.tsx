'use client';

import Link from "next/link";
import { useState } from "react";
import styles from '@/app/page.module.css';
import MenuIcon from "@mui/icons-material/Menu";
import { CancelRounded } from "@mui/icons-material";
import { 
  AppBar, 
  Box, 
  Button, 
  IconButton, 
  Toolbar, 
  Typography, 
  Stack, 
  Drawer, 
  List, 
  ListItem 
} from "@mui/material";

const useAuth = () => {
  const [isLoggedIn] = useState(false);
  return { isLoggedIn };
};

type LinkItem = {
  label: string;
  href: string;
  cta?: boolean;
};

const Header = () => {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Contact Us", href: "/contact" },
  ];

  const guestLinks: LinkItem[] = [
    { label: "Login", href: "/login" },
    { label: "Try for free", href: "/signup", cta: true },
  ];

  const userLinks: LinkItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/settings" },
    { label: "Partner", href: "/partner" },
    { label: "Logout", href: "/logout" },
  ];

  const authLinks = isLoggedIn ? userLinks : guestLinks;

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{ 
        borderBottom: 1,
        color: "inherit",  
        borderColor: "divider",
        bgcolor: "rgb(18, 19, 23)", 
      }}
    >
      <Box 
        py={1} 
        m={'auto'} 
        width={'100%'} 
        minHeight={60}
        maxWidth={1500} 
      >
        <Toolbar 
          sx={{ 
            display: "flex",  
            alignItems: 'center',
            justifyContent: "space-between",
          }}
        >
          <Stack 
            direction="row" 
            spacing={10} 
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              <Link href="/">TicTask</Link>
            </Typography>
            <Box 
              sx={{ 
                display: { xs: "none", md: "flex" }, 
                gap: 5 
              }}
            >
              { menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </Box>
          </Stack>

          <Box 
            sx={{ 
              display: { xs: "none", md: "flex" }, 
              gap: 2 
            }}
          >
            {authLinks.map((link) =>
              (link && link?.cta) ? (
                <Button
                  key={link.href}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  href={link.href}
                  sx={{ borderRadius: "24px" }}
                >
                  {link.label}
                </Button>
              ) : (
                <Button 
                  color="inherit"
                  key={link.href} 
                  component={Link} 
                  href={link.href} 
                >
                  {link.label}
                </Button>
              )
            )}
          </Box>

          <IconButton 
            sx={{ display: { xs: "flex", md: "none" } }} 
            onClick={toggleDrawer}
          >
            <MenuIcon sx={{ color: 'white'}} />
          </IconButton>
        </Toolbar>

        <Drawer 
          anchor="right" 
          open={mobileOpen} 
          onClose={toggleDrawer}
        >
          <Box sx={{ p: 2, width: '100vw' }}>
            <Box 
              display={'flex'} 
              justifyContent={'right'}
            >
              <CancelRounded fontSize={'large'} onClick={toggleDrawer} />
            </Box>

            <List 
              sx={{ 
                mt: 5,  
                gap: 2,
                display: 'grid', 
                justifyContent: 'center'
              }}
            >
              { menuItems.map((item) => (
                <ListItem key={item.href}>
                  <Link 
                    style={{ width: '100%', textAlign: 'center'}}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </ListItem>
              ))}

              { authLinks.map((link) => (
                <ListItem key={link.href}>
                  <Link 
                    href={link.href}
                    style={{ width: '100%', textAlign: 'center'}}
                    className={link.href==='/signup' ? styles.btnPrimary : ''}
                  >
                    {link.label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </AppBar>
  );
};

export default Header;
