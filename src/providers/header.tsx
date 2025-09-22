'use client';
import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Stack, Drawer, List, ListItem } from "@mui/material";

const useAuth = () => {
  const [isLoggedIn] = useState(false);
  return { isLoggedIn };
};

const Header = () => {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  type LinkItem = {
    label: string;
    href: string;
    cta?: boolean;
  };

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
      position="fixed"
      elevation={0}
      sx={{ bgcolor: "rgb(18, 19, 23)", color: "inherit", borderBottom: 1, borderColor: "divider",}}
    >
      <Box mx={'auto'} width={'100%'} maxWidth={1500} minHeight={69} alignItems={'center'}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
          <Stack direction="row" spacing={10} alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              <Link href="/">TicTask</Link>
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </Box>
          </Stack>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
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
                <Button key={link.href} component={Link} href={link.href} color="inherit">
                  {link.label}
                </Button>
              )
            )}
          </Box>

          <IconButton sx={{ display: { xs: "flex", md: "none" } }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 240, p: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </ListItem>
              ))}
              {authLinks.map((link) => (
                <ListItem key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
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
