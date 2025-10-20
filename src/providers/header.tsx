'use client';

import Link from "next/link";
import { useAuth } from "./auth";
import { useState } from "react";
import Logo from "@/assets/txtLogo";
import styles from '@/app/page.module.css';
import MenuIcon from "@mui/icons-material/Menu";
import { CancelRounded } from "@mui/icons-material";
import { userLinks, guestLinks, menuItems } from "@/app/dashboard/_level_1/navItems";
import { AppBar, Box, Button, IconButton, Toolbar, Stack, Drawer, List, ListItem } from "@mui/material";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const authLinks = isAuthenticated ? userLinks : guestLinks;

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Box 
        py={1} 
        m={'auto'} 
        width={'100%'} 
        minHeight={50}
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
            <Logo />
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
            { authLinks.map((link) =>
              (link && link?.cta) ? (
                <Link href={link.href} key={link.href}>
                  <Button className={styles.btnPrimary}>{link.label}</Button>
                </Link>
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
            <MenuIcon className="custom-bw" />
          </IconButton>
        </Toolbar>

        <Drawer 
          anchor="right" 
          open={mobileOpen} 
          onClose={toggleDrawer}
          sx={{ bgcolor: 'inherit'}}
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
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </Link>
                </ListItem>
              ))}
              { authLinks.map((link) => (
                <ListItem key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={link.onClick ? () => logout : toggleDrawer}
                    style={{ width: '100%', textAlign: 'center', textTransform: link.cta ? 'uppercase' : 'none'}}
                    className={link.cta ? styles.btnRetreat : ''}
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