"use client";

import {
  Box,
  Drawer,
  Toolbar,
  Stack,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useNotifications } from "@/providers/notifications";
import {
  CheckCircle,
  Info,
  WarningAmber,
  Error as ErrorIcon,
  DoneAll,
  ClearAll,
  Search,
  NotificationsNone,
} from "@mui/icons-material";
import type { AppNotification, NotificationType } from "@/providers/notifications";

const ICONS = {
  info: <Info color="info" fontSize="small" />,
  success: <CheckCircle color="success" fontSize="small" />,
  warning: <WarningAmber color="warning" fontSize="small" />,
  error: <ErrorIcon color="error" fontSize="small" />,
};

type FilterType = "all" | NotificationType;
type GroupedNotifications = Record<string, AppNotification[]>;

const groupByDay = (items: AppNotification[]): GroupedNotifications => {
  return items.reduce((groups, n) => {
    const key = new Date(n.createdAt).toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
    return groups;
  }, {} as GroupedNotifications);
};

const NotificationsDrawer: React.FC = () => {
  const { notifications, markAsRead, clearNotifications, markAllAsRead } = useNotifications();
  const [ closeDrawer, setCloseDrawer ] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return notifications.filter((n) => {
      const matchesSearch =
        s.length === 0 ||
        n.title.toLowerCase().includes(s) ||
        n.message.toLowerCase().includes(s) ||
        JSON.stringify(n.meta ?? "").toLowerCase().includes(s);

      const matchesType = filterType === "all" || n.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [notifications, search, filterType]);

  const groups = useMemo(() => groupByDay(filtered), [filtered]);

  const closeDetail = () => setCloseDrawer(true);

  return (
    <Drawer
      anchor="right"
      open={!closeDrawer}
      onClose={closeDetail}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", md: 440 },
          borderTopLeftRadius: 16,
          boxShadow: "-6px 0px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "background.paper",
          zIndex: 20,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700}>
            Activity Feed
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={markAllAsRead}>
              <DoneAll />
            </IconButton>
            <IconButton size="small" onClick={clearNotifications}>
              <ClearAll />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} mt={2}>
          <TextField
            size="small"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
            }}
          />

          <TextField
            select
            size="small"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            sx={{ width: 120 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </TextField>
        </Stack>
      </Box>

      <Box sx={{ px: 3, py: 2 }} minHeight={'69vh'}>
        {filtered.length === 0 && (
          <Typography mt={4} textAlign="center" color="text.secondary">
            No notifications found
          </Typography>
        )}

        {Object.entries(groups).map(([day, items]) => (
          <Box key={day} mb={3}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="text.secondary"
              mb={1}
            >
              {day}
            </Typography>

            <Stack spacing={1.5}>
              {items.map((n) => {
                const icon = ICONS[n.type ?? "info"] ?? (
                  <NotificationsNone fontSize="small" />
                );

                return (
                  <Box
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      gap: 1.5,
                      cursor: "pointer",
                      alignItems: "flex-start",
                      backgroundColor: n.read
                        ? "transparent"
                        : "rgba(25,118,210,0.08)",
                      transition: "0.2s",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    {icon}

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={600}>{n.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {n.message}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {new Date(n.createdAt).toLocaleString()}
                      </Typography>
                    </Box>

                    {!n.read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: "primary.main",
                          borderRadius: "50%",
                          mt: 0.5,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Box>

      <Link href="/dashboard" onClick={closeDetail} style={{ padding: 20}}>
        <Button fullWidth color="inherit" variant="contained"> ← &nbsp; Back </Button>
      </Link>
    </Drawer>
  );
};

export default NotificationsDrawer;
