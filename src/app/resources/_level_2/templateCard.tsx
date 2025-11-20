"use client";

import { Card, CardContent, CardActions, Chip, Stack, Typography } from "@mui/material";
import { Button } from "@/assets/buttons";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TemplateCardProps {
  title: string;
  desc: string;
  file: string;
  tags?: string[];
}

export const TemplateCard = ({ 
  title, 
  desc, 
  file,
  tags = [] 
}: TemplateCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {desc}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
          {tags.map((t, i) => (
            <Chip key={i} label={t} size="small" />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={Link}
          href={file}
          // download
          size="small"
          tone='secondary'
          startIcon={<Download size={16} />}
        >
          Download
        </Button>
      </CardActions>
    </Card>
  </motion.div>
);
