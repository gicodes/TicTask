'use client';

import { TeamWidgets } from '@/types/team';
import { useMemo, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import { Button } from '@/assets/buttons';

function StatCard({
  label, value,
}: {
  label: string;
  value: number;
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
        minWidth: 80,
        borderRadius: 4,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isLight ? 0.9 : 0.4
        ),
        border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
        textAlign: 'center',
        height: 'auto', 
        maxHeight: { xs: 70, sm: 80},
        display: 'grid'
      }}
    >
      <Typography variant="caption" color="text.secondary" maxWidth={80}>
        {label}
      </Typography>

      <Typography variant="h6" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
}

type WidgetKey =
  | "total"
  | "inProgress"
  | "completed"
  | "overdue"
  | "dueToday"
  | "createdThisWeek"
  | "assignedToMe"
  | "abandoned"
  | "highPriority";

type WidgetPreference = {
  key: WidgetKey;
  visible: boolean;
  order: number;
};

type Props = TeamWidgets & {
  preferences?: WidgetPreference[]; // optional user config
};

export default function WorkspaceWidgets(props: Props) {
  const {
    total,
    overdue,
    dueToday,
    inProgress,
    createdThisWeek,
    completed,
    assignedToMe,
    highPriority,
    abandoned,
    preferences,
  } = props;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const [expanded, setExpanded] = useState(false);

  const allWidgets = useMemo(
    () => [
      { key: "total", label: "Total", value: total },
      { key: "assignedToMe", label: "For Me", value: assignedToMe },
      { key: "inProgress", label: "Ongoing", value: inProgress },
      { key: "completed", label: "Completed", value: completed },
      { key: "overdue", label: "Overdue", value: overdue },
      { key: "dueToday", label: "Due Today", value: dueToday },
      { key: "createdThisWeek", label: "Week New", value: createdThisWeek },
      { key: "abandoned", label: "Cancelled", value: abandoned },
      { key: "highPriority", label: "Priority", value: highPriority },
    ],
    [
      total,
      inProgress,
      completed,
      overdue,
      dueToday,
      createdThisWeek,
      assignedToMe,
      abandoned,
      highPriority,
    ]
  );

  const configuredWidgets = useMemo(() => {
    if (!preferences?.length) return allWidgets;

    return allWidgets
      .map((widget) => {
        const pref = preferences.find((p) => p.key === widget.key);
        return {
          ...widget,
          visible: pref?.visible ?? true,
          order: pref?.order ?? 999,
        };
      })
      .filter((w) => w.visible)
      .sort((a, b) => a.order - b.order);
  }, [allWidgets, preferences]);

  const visibleCount = useMemo(() => {
    if (isXs) return 3;
    if (isSm) return 6;
    if (isLgUp) return configuredWidgets.length;
    return 6;
  }, [isXs, isSm, isLgUp, configuredWidgets.length]);

  const displayedWidgets = expanded
    ? configuredWidgets
    : configuredWidgets.slice(0, visibleCount);

  const shouldShowToggle =
    !isLgUp && configuredWidgets.length > visibleCount;

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, sm: 1.5}}
        sx={{ width: "100%", maxWidth: 1000, mb: 2 }}
        mx={{ xs: "auto", sm: 0 }}
        justifyContent={{ xs: "center", sm: "left" }}
      >
        {displayedWidgets.map((widget) => (
          <Grid key={widget.key}>
            <StatCard label={widget.label} value={widget.value} />
          </Grid>
        ))}
      </Grid>

      {shouldShowToggle && (
        <Button onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? "View Less" : "View More"}
        </Button>
      )}
    </>
  );
}

