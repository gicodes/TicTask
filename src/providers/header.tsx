"use client";

import Link from "next/link";
import { useAuth } from "./auth";
import { useRef, useState } from "react";
import Logo from "@/assets/txtLogo";
import { Button } from "@/assets/buttons";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  AppBar,
  Box,
  Collapse,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  extendedMenuItems,
  guestLinks,
  menuItems,
  userLinks,
} from "@/app/dashboard/_level_0/navItems";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const authLinks = isAuthenticated ? userLinks : guestLinks;

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeDesktopMenu = () => {
    clearCloseTimer();
    setOpenMenu(null);
    setAnchorEl(null);
  };

  const scheduleDesktopMenuClose = () => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      setAnchorEl(null);
      closeTimerRef.current = null;
    }, 120);
  };

  const handleMenuEnter = (
    event: React.MouseEvent<HTMLElement>,
    label: string
  ) => {
    const children = extendedMenuItems[label];

    if (!children) {
      scheduleDesktopMenuClose();
      return;
    }

    clearCloseTimer();

    const target = event.currentTarget;

    if (openMenu === label && anchorEl === target) {
      return;
    }

    setAnchorEl(target);
    setOpenMenu(label);
  };

  const handleMenuFocus = (
    event: React.FocusEvent<HTMLElement>,
    label: string
  ) => {
    if (!extendedMenuItems[label]) {
      return;
    }

    clearCloseTimer();

    setAnchorEl(event.currentTarget);
    setOpenMenu(label);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((previous) => !previous);
  };

  const handleMobileMenuToggle = (label: string) => {
    setMobileExpanded((previous) =>
      previous === label ? null : label
    );
  };

  const handleLogout = () => {
    closeDesktopMenu();
    setMobileOpen(false);
    logout();
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "var(--background)",
          color: "var(--foreground)",
          borderColor: "divider",
          backgroundImage: "none",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1500,
            minHeight: 64,
            mx: "auto",
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: "64px !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Logo />
              </Box>

              <Box
                component="nav"
                aria-label="Main navigation"
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  alignItems: "center",
                  gap: 0.5,
                  ml: {
                    md: 4,
                    lg: 7,
                  },
                }}
              >
                {menuItems.map((item) => {
                  const children = extendedMenuItems[item.label];
                  const hasChildren = Boolean(children);
                  const isOpen = openMenu === item.label;

                  return (
                    <Box
                      component={Link}
                      href={item.href}
                      onMouseEnter={(event) => handleMenuEnter(event, item.label)}
                      onFocus={(event) => handleMenuFocus(event, item.label)}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.25,
                        px: 1.25,
                        py: 0.9,
                        borderRadius: 2,
                        color: "inherit",
                        textDecoration: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        lineHeight: 1,
                        transition: "background-color 140ms ease, color 140ms ease",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        "&:focus-visible": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: 2,
                        },
                      }}
                    >
                      {item.label}

                      {hasChildren && (
                        <KeyboardArrowDownRoundedIcon
                          sx={{
                            fontSize: 20,
                            opacity: 0.6,
                            transition: "transform 160ms ease",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Stack>

            <Box // Desktop Auth Links
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 1,
              }}
            > 
              {authLinks.map((link, index) =>
                link?.cta ? (
                  <Button
                    key={link.href ?? index}
                    component={Link}
                    href={link.href}
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    {link.label}
                  </Button>
                ) : (
                  <Button
                    key={link.href ?? index}
                    tone="retreat"
                    component={Link}
                    href={link.href}
                    onClick={
                      link.label === "Logout"
                        ? handleLogout
                        : undefined
                    }
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    {link.label}
                  </Button>
                )
              )}
            </Box>

            <Fade
              in={Boolean(openMenu && anchorEl)}
              timeout={{ enter: 100, exit: 80 }}
              appear={false}
              unmountOnExit
            >
              <Paper
                onMouseEnter={clearCloseTimer}
                onMouseLeave={scheduleDesktopMenuClose}
                sx={{
                  position: "fixed",
                  top: anchorEl
                    ? anchorEl.getBoundingClientRect().bottom + 10
                    : 0,
                  left: anchorEl
                    ? Math.min(
                        anchorEl.getBoundingClientRect().left,
                        window.innerWidth - 380
                      )
                    : 0,
                  minWidth: { md: 300, lg: 360 },
                  maxWidth: "calc(100vw - 32px)",
                  p: 1.25,
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: "rgba(127, 127, 127, 0.18)",
                  bgcolor: "var(--surface-1)",
                  color: "var(--foreground)",
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%)",
                  boxShadow:
                    "0 24px 70px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)",
                  zIndex: 1400,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 1.2,
                  }}
                >
                  {(extendedMenuItems[openMenu ?? ""] ?? []).map((subItem) => (
                    <Box
                      key={subItem.href}
                      component={Link}
                      href={subItem.href}
                      onClick={closeDesktopMenu}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: 0,
                        px: 1.25,
                        py: 1.25,
                        borderRadius: "11px",
                        color: "inherit",
                        bgcolor: "action.hover",
                        textDecoration: "none",
                        transition: "background-color 140ms ease, transform 140ms ease",
                        "&:hover": {
                          bgcolor: "var(--background)",
                        },
                        "&:active": {
                          transform: "scale(0.985)",
                        },
                        "&:focus-visible": {
                          outline: "2px solid",
                          outlineColor: "primary.main",
                          outlineOffset: -2,
                        },
                      }}
                    >
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Box
                          component="span"
                          sx={{
                            display: "block",
                            fontSize: "1rem",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            pb: 0.5,
                          }}
                        >
                          {subItem.label}
                        </Box>
                      </Box>

                      <ArrowForwardRoundedIcon
                        sx={{
                          flexShrink: 0,
                          fontSize: 15,
                          color: "var(--secondary)",
                          opacity: 0,
                          transform: "translateX(-3px)",
                          transition: "opacity 140ms ease, transform 140ms ease",
                          ".MuiBox-root:hover &": {
                            opacity: 1,
                            transform: "translateX(0)",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Fade>

            <IconButton // Mobile Menu Button
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              onClick={handleDrawerToggle}
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
                width: 42,
                height: 42,
                borderRadius: 2,
                color: "inherit",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            > 
              {mobileOpen ? (
                <CloseRoundedIcon />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>
      
      <Drawer // Mobile Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              sm: 420,
            },
            bgcolor: "var(--background)",
            color: "var(--foreground)",
            backgroundImage: "none",
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box
          component="nav"
          aria-label="Mobile navigation"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
              pt: 2,
              pl: 3,
              pr: 1
            }}
          >
            <Logo />

            <IconButton
              aria-label="Close navigation"
              onClick={handleDrawerToggle}
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                color: "inherit",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 4,
            }}
          >
            <List
              disablePadding
              sx={{
                display: "grid",
                gap: 2,
              }}
            > 
              <Link href={'/'}> 
                <Typography variant="h6" onClick={handleDrawerToggle}>
                  Home
                </Typography>
              </Link>
              { menuItems.map((item) => {
                const children = extendedMenuItems[item.label];
                const hasChildren = Boolean(children);
                const isExpanded = mobileExpanded === item.label;

                if (!hasChildren) {
                  return (
                    <ListItem
                      key={item.href}
                      disablePadding
                    >
                      <Box
                        component={Link}
                        href={item.href}
                        onClick={handleDrawerToggle}
                        sx={{
                          width: "100%",
                          p: 1.5,
                          borderRadius: 2,
                          color: "inherit",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      >
                        {item.label}
                      </Box>
                    </ListItem>
                  );
                }

                return (
                  <Box key={item.href}>
                    <ListItem disablePadding>
                      <Typography
                        variant="h6"
                        display={'flex'}
                        alignItems={'center'}
                        onClick={() => handleMobileMenuToggle(item.label)}
                      >
                        {item.label}

                        <KeyboardArrowDownRoundedIcon
                          sx={{
                            color: "gray",
                            transition: "transform 180ms ease",
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </Typography>
                    </ListItem>

                    <Collapse
                      in={isExpanded}
                      timeout={180}
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          mt: 1,
                          pl: 2,
                          borderLeft: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Stack spacing={0.25}>
                          {children.map((subItem) => (
                            <Box
                              key={subItem.href}
                              component={Link}
                              href={subItem.href}
                              onClick={ handleDrawerToggle }
                              sx={{
                                display: "block",
                                p: 1,
                                fontSize: '1.2rem',
                                borderRadius: 1.5,
                                opacity: 0.75,
                                textDecoration: "none",
                                "&:hover": {
                                  bgcolor: "action.hover",
                                  color: "text.primary",
                                },
                              }}
                            >
                              {subItem.label}
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </List>

            <Box
              sx={{
                mt: 20,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={1}>
                {authLinks.map((link, index) =>
                  link?.cta ? (
                    <Button
                      key={link.href ?? index}
                      fullWidth
                      component={Link}
                      href={link.href}
                      variant="contained"
                      onClick={handleDrawerToggle}
                      sx={{ textTransform: "uppercase" }}
                    >
                      {link.label}
                    </Button>
                  ) : (
                    <Button
                      key={link.href ?? index}
                      fullWidth
                      tone="retreat"
                      component={Link}
                      href={link.href}
                      variant="text"
                      size="large"
                      onClick={
                        link.label === "Logout"
                          ? handleLogout
                          : handleDrawerToggle
                      }
                    >
                      {link.label}
                    </Button>
                  )
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;