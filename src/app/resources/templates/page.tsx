import { TEMPLATES } from "@/constants/resources";
import { Box, Grid, Typography } from "@mui/material";
import { ResourceHero } from "@/app/resources/_level_3";
import { TemplateCard } from "@/app/resources/_level_2/templateCard";
import { TicketCardTemplate } from '@/app/resources/_level_2/ticketCardTemplate';
import { TicketListRowTemplate } from '@/app/resources/_level_2/ticketListRowTemplate';
import { DownloadableTemplate } from '@/app/resources/_level_2/downloadTemplate';

const LIST_ROW_CODE = `import { TicketListRowTemplate } from '@/components/TicketListRowTemplate';

<TicketListRowTemplate
  title="Fix login redirect on mobile"
  priority="HIGH"
  status="OPEN"
  tags={['auth', 'mobile']}
  accentColor="#ef4444"
/>`;

const CARD_CODE = `import { TicketCardTemplate } from '@/components/TicketCardTemplate';

<TicketCardTemplate
  title="Add dark mode toggle"
  priority="MEDIUM"
  tags={['ui', 'theme']}
  accentColor="#8b5cf6"
  compact
/>`;

export default function TemplatesPage() {
  return (
    <Box>
      <ResourceHero
        title="Templates"
        subtitle="Download and reuse TicTask templates for tasks, projects, and teams."
      />

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
              <DownloadableTemplate
                filename="ticket-list-row-bug"
                data={{
                  title: "Fix login redirect on mobile",
                  priority: "HIGH",
                  status: "OPEN",
                  tags: ["auth", "mobile"],
                  accentColor: "#ef4444",
                }}
                componentCode={LIST_ROW_CODE}
              >
                <TicketListRowTemplate
                  title="Fix login redirect on mobile"
                  priority="HIGH"
                  status="OPEN"
                  tags={['auth', 'mobile']}
                  accentColor="#ef4444"
                />
              </DownloadableTemplate>
            </Grid>

            <Grid>
              <DownloadableTemplate
                filename="ticket-card-feature"
                data={{
                  title: "Add dark mode toggle",
                  priority: "MEDIUM",
                  tags: ["ui", "theme"],
                  accentColor: "#8b5cf6",
                }}
                componentCode={CARD_CODE}
              >
                <TicketCardTemplate
                  title="Add dark mode toggle"
                  priority="MEDIUM"
                  tags={['ui', 'theme']}
                  accentColor="#8b5cf6"
                  compact
                />
              </DownloadableTemplate>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}