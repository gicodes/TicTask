import { TemplateCard } from "@/app/resources/_level_2/templateCard";
import { ResourceHero } from "@/app/resources/_level_3";
import { Box, Grid, Typography } from "@mui/material";
import { TEMPLATES } from "@/constants/resources";

export default function TemplatesPage() {
  return (
    <Box>
      <ResourceHero title="Templates" subtitle="Download and reuse TicTask templates for tasks, projects, and teams." />
      <Box py={10} px={2} maxWidth={1200} mx="auto">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Available Templates
        </Typography>

        <Grid container spacing={3} mt={5}>
          {TEMPLATES.map((tpl, i) => (
            <Grid key={i}>
              <TemplateCard {...tpl} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}