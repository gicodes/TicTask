import { TemplateCard } from "@/app/resources/_level_2/templateCard";
import { ResourceHero } from "@/app/resources/_level_3";
import { Box, Grid, Typography } from "@mui/material";
import { TEMPLATES } from "@/constants/resources";
import { TicketListRowTemplate } from '@/app/resources/_level_2/ricketListRowTemplate';
import { TicketCardTemplate } from '@/app/resources/_level_2/ticketCardTemplate';


export default function TemplatesPage() {
  return (
    <Box>
      <ResourceHero title="Templates" subtitle="Download and reuse TicTask templates for tasks, projects, and teams." />
      <Box py={10} px={2} maxWidth={1200} mx="auto">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Global Templates
        </Typography>

        <Grid container spacing={3} mt={5}>
          {TEMPLATES.map((tpl, i) => (
            <Grid key={i}>
              <TemplateCard {...tpl} />
            </Grid>
          ))}
        </Grid>

        <Box mt={10}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Ticket Templates
          </Typography>

          <Grid container spacing={3} mt={5}>
            <Grid>
              <TicketListRowTemplate
                title="Fix login redirect on mobile"
                priority="HIGH"
                type="BUG"
                status="OPEN"
                tags={['auth', 'mobile']}
                accentColor="#ef4444"
              />
            </Grid>
            <Grid>
              <TicketCardTemplate
                title="Add dark mode toggle"
                priority="MEDIUM"
                type="FEATURE"
                status="UPCOMING"
                tags={['ui', 'theme']}
                accentColor="#8b5cf6"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}