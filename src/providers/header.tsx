'use client';

import Link from "next/link";
import { useAuth } from "./auth";
import { useState } from "react";
import Logo from "@/assets/txtLogo";
import styles from '@/app/page.module.css';
import MenuIcon from "@mui/icons-material/Menu";
import { CancelRounded } from "@mui/icons-material";
import { userLinks, guestLinks, menuItems, extendedMenuItems } from "@/app/dashboard/_level_1/navItems";
import { AppBar, Box, IconButton, Toolbar, Stack, Drawer, List, ListItem, Popover, Typography,} from "@mui/material";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  let closeTimer: NodeJS.Timeout | null = null;

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    label: string
  ) => {
    if (extendedMenuItems[label]) {
      if (closeTimer) clearTimeout(closeTimer);
      setAnchorEl(event.currentTarget);
      setOpenMenu(label);
    }
  };

  const handlePopoverClose = () => {
    closeTimer = setTimeout(() => {
      setAnchorEl(null);
      setOpenMenu(null);
    }, 150);
  };

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
      <Box py={1} m="auto" width="100%" minHeight={50} maxWidth={1500}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={10} alignItems="center">
            <Logo />

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
              {menuItems.map((item) => (
                <Box
                  key={item.href}
                  onMouseEnter={(e) => handlePopoverOpen(e, item.label)}
                  onMouseLeave={handlePopoverClose}
                  sx={{ position: "relative" }}
                >
                  <Link href={item.href}>{item.label}</Link>

                  {extendedMenuItems[item.label] && (
                    <Popover
                      id={`${item.label}-popover`}
                      open={openMenu === item.label}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: 2,
                          ml: -3,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          p: 2,
                          minWidth: 150,
                          maxWidth: 180,
                          bgcolor: "var(--background)",
                          color: "var(--foreground)"
                        },
                        onMouseEnter: () => {
                          if (closeTimer) clearTimeout(closeTimer);
                        },
                        onMouseLeave: handlePopoverClose,
                      }}
                    >
                      <Stack spacing={1}>
                        {extendedMenuItems[item.label].map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              fontSize: "0.95rem",
                              padding: "6px 8px",
                              borderRadius: 4,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "rgba(0,0,0,0.05)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </Stack>
                    </Popover>
                  )}
                </Box>
              ))}
            </Box>
          </Stack>
          
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {authLinks.map((link) =>
              link?.cta ? (
                <Link href={link.href} key={link.href}>
                  <Typography 
                    component={'button'} 
                    textTransform={'uppercase'} 
                    className={styles.btnPrimary}
                  >
                      {link.label}
                  </Typography>
                </Link>
              ) : (
                <Typography
                  color="inherit"
                  key={link.href}
                  component={Link}
                  href={link.href}
                  className={styles.btnRetreat}
                  textTransform={'uppercase'}
                >
                  {link.label}
                </Typography>
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
          sx={{ bgcolor: "inherit" }}
        >
          <Box sx={{ p: 2, width: "100vw" }}>
            <Box display="flex" justifyContent="right">
              <CancelRounded fontSize="large" onClick={toggleDrawer} />
            </Box>

            <List
              sx={{
                mt: 5,
                gap: 2,
                display: "grid",
                justifyContent: "center",
              }}
            >
              {menuItems.map((item) => (
                <ListItem key={item.href}>
                  <Link
                    style={{ width: "100%", textAlign: "center" }}
                    href={item.href}
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </Link>
                </ListItem>
              ))}

              {authLinks.map((link) => (
                <ListItem key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.onClick ? () => logout : toggleDrawer}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      textTransform: link.cta ? "uppercase" : "none",
                    }}
                    className={link.cta ? styles.btnRetreat : ""}
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