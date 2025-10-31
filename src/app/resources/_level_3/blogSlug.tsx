"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogCardProps } from "@/types/resources";
import { getRandomFallbackImage } from "@/assets/randImg";
import { Box, Container, Divider, Typography, useTheme } from "@mui/material";

export const BlogSlugPage = ({blog }: { params: string, blog: BlogCardProps}) => {
  const theme = useTheme();
  const coverRef = useRef<string>(blog.coverImage || getRandomFallbackImage());
  const coverImage = coverRef.current;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 240, md: 400 },
            overflow: "hidden",
            my: 3,
          }}
        >
          <Image
            src={coverImage}
            alt={blog.title}
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(92%)",
            }}
          />
        </Box>
      </motion.div>

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ paddingTop: 10}}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{
              textAlign: "center",
              lineHeight: 1.3,
              my: 2,
            }}
          >
            {blog.title}
          </Typography>
          
          <Typography
            variant="subtitle1"
            color="var(--secondary)"
            textAlign="center"
            sx={{
              fontStyle: "italic",
              mb: 1,
              mx: "auto",
            }}
          >
            {blog.excerpt}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            sx={{ my: 2 }}
          >
            {new Date(blog.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}, {" "}
            {new Date(blog.createdAt).toLocaleTimeString()}
          </Typography>
        </motion.div>

        <Divider sx={{ my: 4, border: '0.1px solid var(--disabled)', width: 180, mx: 'auto' }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Box
            sx={{
              typography: "body1",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              textAlign: 'center',
              whiteSpace: "pre-line",
              "& p": { mb: 3 },
              "& strong": { fontWeight: 6},
              "& h2": {
                mt: 4,
                mb: 2,
                fontWeight: 700,
                fontSize: "1.6rem",
              },
              "& a": {
                color: theme.palette.primary.main,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              },
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.div>

        <Divider sx={{ my: 4, border: '1px solid var(--secondary)' }} />

        <Typography
          variant="body2"
          color="var(--secondary)"
          textAlign="center"
          sx={{
            fontStyle: "italic",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          Thanks for reading ✨ — explore more stories on our{" "}
          <Box
            component="a"
            href="/resources/blog"
            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
          >
            Blog Hub
          </Box>.
        </Typography>
      </Container>
    </>
  );
}
