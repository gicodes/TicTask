"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BlogCardProps } from "@/types/resources";
import { Card, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material";

export const BlogCard = ({ title, slug, date, excerpt, image }: BlogCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
  >
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
      )}
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {excerpt}
        </Typography>
      </CardContent>
      <Stack direction="row" justifyContent="flex-end" px={2} pb={2}>
        <Button
          component={Link}
          href={`/resources/blog/${slug}`}
          size="small"
          endIcon={<ExternalLink size={16} />}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Read More
        </Button>
      </Stack>
    </Card>
  </motion.div>
);
