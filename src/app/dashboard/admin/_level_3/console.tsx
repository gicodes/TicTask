'use client';

import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/assets/buttons";
import { AdminOverviewData } from "../_level_1/types";
import { useAdminOverview } from "../_level_1/graphQL";
import AdminComponents from "../_level_2/overview-cards";
import {
  Box,
  Container,
  Typography,
  Chip,
  Tooltip,
  Grid,
  Divider,
  Stack,
  Card,
} from "@mui/material";
import { GiTicket } from "react-icons/gi";
import { Redo, Settings } from "lucide-react";

export default function AdminOverviewPage() {
  const { data, loading, error, refetch } = useAdminOverview() as {
    data: AdminOverviewData | null;
    loading: boolean;
    error: { message: string};
    refetch: () => void;
  };

  const FeedbackCard = ({ children }: {children: ReactNode}) => {
    return (
      <Box p={1}>    
        <Card  
          sx={{ 
            maxWidth: "lg",
            mx: 'auto', 
            px: { xs: 2, sm: 4, md: 6},
            py: 6,
            gap: 6,
            display: 'grid',
            borderRadius: 3,
          }}
        >
          {children}
        </Card> 
      </Box>
    )
  }

  if (loading) return (
    <FeedbackCard>
      <Typography>Loading admin overview…</Typography>
    </FeedbackCard>
  )

  if (error) return (
    <FeedbackCard>
      <Typography color="error" px={1} textAlign={{ xs: 'center', sm: 'left'}}>
        Failed to load overview. Try again later!
      </Typography>
      <Box mx={{ xs: 'auto', sm: 0}}>
        <Button 
          endIcon={<Redo size={15} />} 
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </Box>
    </FeedbackCard>
  );

  if (!data) return null;

  const { ticketsSummary, usersSummary, teamsSummary, subsSummary } =
    data.adminOverview ?? {};

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        borderBottom={'1px solid var(--disabled)'}
        display={{ xs: 'grid', sm: "flex"}}
        justifyContent="space-between"
        alignItems="center"
        px={1}
        gap={2}
        pb={3}
        mb={4}
      >
        <Stack gap={1}>
          <Typography variant="h4" fontWeight={600} component="h1">
            Admin Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cummulated Overview Of Tickets, Users, Teams and Subscriptions
          </Typography>
        </Stack>

        <Box display="flex" alignItems="end" gap={2}>
          <Chip label="Admin" color="secondary" sx={{ px: 2, fontWeight: 600}} />
          <Tooltip title="Open admin settings">
            <div>
              <Button size="small" startIcon={<Settings size={14} />}>Settings</Button>
            </div>
          </Tooltip>
        </Box>
      </Box>

      <Grid 
        container 
        spacing={2} 
        width={'100%'}
        justifyContent={{ xs: 'center', sm: 'left'}}
        mb={3} 
      >
        <Grid>
          <AdminComponents.StatCard
            title="Total Tickets"
            value={ticketsSummary?.total ?? ''}
            meta={`${ticketsSummary?.escalatedCount} escalated`}
            icon={<AdminComponents.Icons.Tickets />}
          />
        </Grid>

        <Grid>
          <AdminComponents.StatCard
            title="Total Users"
            value={usersSummary?.totalUsers ?? ''}
            meta={`${usersSummary?.newThisWeek} new this week • ${usersSummary?.inTrial} in trial`}
            icon={<AdminComponents.Icons.Users />}
          />
        </Grid>

        <Grid>
          <AdminComponents.StatCard
            title="Total Teams"
            value={teamsSummary?.totalTeams ?? 0}
            meta={`${Math.round(teamsSummary?.averageMembers ?? 0)} avg members`}
            icon={<AdminComponents.Icons.Teams />}
          />
        </Grid>

        <Grid>
          <AdminComponents.StatCard
            title="MRR"
            value={`$${subsSummary?.mrr.toLocaleString()}`}
            meta={`${subsSummary?.activePaying} paying`}
            icon={<AdminComponents.Icons.Money />}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 5, border: '2px solid var(--disabled)'}} />

      <Box mb={4}>
        <Stack
          display={{ xs: 'grid', sm: "flex"}}
          direction={{ xs: 'column', sm: 'row'}}
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          mb={2}
          px={1}
        >
          <Box>
            <Stack direction={'row'}  alignContent={'center'} spacing={0.5}>
              <Typography variant="h5" fontWeight={600}>Tickets</Typography>
              <Tooltip title="Go to tickets page">
                <div>
                  <Button component={Link} variant="text" tone="retreat" href={'/dashboard/admin/tickets'}>
                    <GiTicket size={20} />
                  </Button>
                </div>
              </Tooltip>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.75}}>
              Summary of the most recent tickets 
            </Typography>
          </Box>
          
          <Box display="flex" gap={1} py={1}>
            <Button component={Link} href={'/dashboard/'}>New ticket</Button>
            <Button tone="secondary" variant="outlined">Bulk actions</Button>
          </Box>
        </Stack>

        <AdminComponents.Filters>
          <AdminComponents.SearchField placeholder="Search tickets…" />
          <AdminComponents.SelectField
            value=""
            onChange={() => {}}
            options={["All statuses", "Open", "Pending", "Escalated", "Closed"]}
          />
        </AdminComponents.Filters>

        <AdminComponents.DataTable
          columns={["id", "title", "priority", "status"]}
          rows={ticketsSummary?.recent ?? []}
        />
      </Box>
    </Container>
  );
}
