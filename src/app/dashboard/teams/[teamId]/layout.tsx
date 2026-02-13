import { ReactNode } from "react";
import { Box } from "@mui/material";
import WorkspaceHeader from "./header";
import TeamWrapper from "./teamWrapper";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <WorkspaceHeader />
      <Box mt={4}>
        <TeamWrapper>
          {children}
        </TeamWrapper>
      </Box>
    </Box>
  );
}
