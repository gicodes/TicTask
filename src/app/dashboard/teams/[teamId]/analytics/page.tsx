"use client";

import { useTeam } from "@/hooks/useTeam";
import { useParams } from "next/navigation";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Button } from "@/assets/buttons";

export default function AnalyticsPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { team } = useTeam();

  const isPro = team?.subscription === "PRO";

  if (!isPro) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Upgrade to Pro
          </Typography>
          <Typography mb={2}>
            Analytics is available on Pro and Enterprise plans.
          </Typography>
          <Button variant="contained">Upgrade</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={3}>
        Analytics
      </Typography>

      <Card>
        <CardContent>Charts and metrics here</CardContent>
      </Card>
    </Box>
  );
}
