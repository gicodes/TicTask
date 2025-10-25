"use client";

import { Box, Typography, Stack, List, ListItem, ListItemText, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface ChangelogItemProps {
  version: string;
  date: string;
  highlights: string[];
}

export const ChangelogItem = ({ version, date, highlights }: ChangelogItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Box py={4}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Typography variant="h6" fontWeight={700}>{version}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
          <Calendar size={16} />
          <Typography variant="body2">{date}</Typography>
        </Stack>
      </Stack>
      <List dense>
        {highlights.map((h, i) => (
          <ListItem key={i} disablePadding>
            <ListItemText
              primaryTypographyProps={{ variant: "body2" }}
              primary={`• ${h}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 3 }} />
    </Box>
  </motion.div>
);
