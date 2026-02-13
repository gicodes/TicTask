'use client';

import { Tabs, Tab, Box, Chip, useTheme, alpha } from '@mui/material';

type View = 'board' | 'list' | 'timeline' | 'gantt';

export default function WorkspaceTabs({
  view,
  setView,
  isEnterprise,
}: {
  view: View;
  setView: (v: View) => void;
  isEnterprise: boolean;
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: { sm: 0, md: 220, lg: 250},
        width: '100%',
        boxShadow: 2,
        borderTop: '0.1px solid var(--border-color)',
        backdropFilter: 'blur(12px)',
        backgroundColor: alpha(
          theme.palette.background.paper,
          isLight ? 0.99 : 0.75
        ),
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Tabs
        value={view}
        onChange={(_, v) => setView(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="inherit"
        indicatorColor="secondary"
        sx={{
          minHeight: 56,
        }}
      >
        <Tab value="board" label="Board" />
        <Tab value="list" label="List" />

        <Tab
          value="timeline"
          disabled={!isEnterprise}
          label={
            isEnterprise ? (
              'Timeline'
            ) : (
              <Box display="flex" gap={1} alignItems="center">
                Timeline
                <Chip size="small" label="E" />
              </Box>
            )
          }
        />

        <Tab
          value="gantt"
          disabled={!isEnterprise}
          label={
            isEnterprise ? (
              'Gantt'
            ) : (
              <Box display="flex" gap={1} alignItems="center">
                Gantt
                <Chip size="small" label="E" />
              </Box>
            )
          }
        />
      </Tabs>
    </Box>
  );
}