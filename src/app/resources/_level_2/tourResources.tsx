import { Box, Typography, Stack } from "@mui/material";
import AccordionDisplay from "./tourAccordion";

export const navigationGroups = [
  {
    title: 'GETTING STARTED',
    items: [
      { label: 'Dashboard Overview', id: 'dashboard-overview' },
      { label: 'Initial Setup', id: 'initial-setup' },
    ],
  },
  {
    title: 'WORKSPACE',
    items: [
      { label: 'Tickets Overview', id: 'tickets-overview' },
      { label: 'Teams', id: 'teams' },
      { label: 'Task Manager', id: 'task-manager' },
      { label: 'Subscription', id: 'subscription' },
      { label: 'Metrics', id: 'metrics' },
      { label: 'Invite', id: 'invite' },
    ],
  },
  {
    title: 'PERSONAL & CONFIGURATION',
    items: [
      { label: 'Notifications', id: 'notifications' },
      { label: 'Profile', id: 'profile' },
      { label: 'Settings', id: 'settings' },
    ],
  },
];

export const TourSidebar = () => (
  <Box
    component="nav"
    aria-label="Tour guide navigation"
    sx={{
      position: { xs: 'relative', lg: 'sticky' },
      top: { lg: 24 },
      alignSelf: 'start',
      width: '100%',
      maxHeight: { lg: 'calc(100vh - 48px)' },
      overflowY: { lg: 'auto' },
      overflowX: 'hidden',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2.5,
      bgcolor: 'var(--background)',
      p: { xs: 1.5, md: 2 },
    }}
  >
    <Typography fontWeight={700} fontSize={14} mb={2}>
      On this page
    </Typography>

    <Stack
      direction={{ xs: 'row', lg: 'column' }}
      spacing={2}
      sx={{
        overflowX: { xs: 'auto', lg: 'visible' },
        pb: { xs: 0.5, lg: 0 },
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          height: 4,
        },
      }}
    >
      {navigationGroups.map((group) => (
        <Box key={group.title} sx={{ minWidth: { xs: 'max-content', lg: 0 } }}>
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{
              display: { xs: 'none', lg: 'block' },
              letterSpacing: 1,
              mb: 1,
            }}
          >
            {group.title}
          </Typography>

          <Stack
            direction={{ xs: 'row', lg: 'column' }}
            spacing={0.5}
          >
            {group.items.map((item) => (
              <Box
                key={item.id}
                component="a"
                href={`#${item.id}`}
                sx={{
                  display: 'block',
                  px: 1.25,
                  py: 1,
                  borderRadius: 1.5,
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2,
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  </Box>
);

export const FeatureSection = ({
  id,
  title,
  subtitle,
  content,
}: {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}) => (
  <Box
    component="section"
    id={id}
    sx={{
      scrollMarginTop: 24,
      minWidth: 0,
      mt: 2,
    }}
  >
    <AccordionDisplay
      title={title}
      subtitle={subtitle}
      content={content}
    />
  </Box>
);