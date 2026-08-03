"use client";

import { Card, CardContent, Box, Stack, Typography, Button } from "@mui/material";
import { RESOURCES } from "@/constants/resources";
import Link from "next/link";

export const ResourceHero = ({
  title, subtitle
}: { title?: string, subtitle?: string}) => {
  return (
    <Box 
      py={15} 
      textAlign="center" 
      color={'var(--background)'}
      bgcolor={'var(--foreground)'}
      px={1.5}
    >
      <Stack spacing={3} alignItems="center" px={1.5}>
        <Typography variant="h3" fontWeight={700}>
          {title || "Learn. Build. Grow with TicTask."}
        </Typography>
        <Typography variant="body1" color="var(--secondary)" maxWidth="md">
          {subtitle || "Dive into the educational and technical side of TicTask. Featuring Documentation, Frequently Asked Questions and Blog."}
        </Typography>
        {!title && !subtitle && 
          <Button component={Link} href={'/resources/docs'}>
            Explore Resources
          </Button>
        }
      </Stack>
    </Box>
  );
}

export const ResourceGrid = () => {
  return (
    <section>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        maxWidth="lg"
        mx="auto"
        gap={4}
        px={{ xs: 2, sm: 3 }}
        py={10}
      >
        {RESOURCES.map((r) => (
          <Card
            key={r.title}
            elevation={0}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 380,
              minHeight: 280,
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              backgroundImage: `url(${r.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                "& .overlay": {
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)",
                },
                "& .content": {
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
                transition: "background 0.35s ease",
              }}
            />

            <CardContent
              className="content"
              sx={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 3.5,
                color: "white",
                transform: "translateY(4px)",
                transition: "transform 0.35s ease",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  mb: 1,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {r.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 2.5,
                  opacity: 0.9,
                  lineHeight: 1.5,
                  textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                {r.desc}
              </Typography>

              <Button
                component={Link}
                href={r.link}
                fullWidth
                sx={{
                  mt: "auto",
                  py: 1.2,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.28)",
                    borderColor: "rgba(255,255,255,0.5)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                Explore →
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </section>
  );
};

export default function ResourcePage () {
  return (
    <Box>
      <ResourceHero />
      <ResourceGrid />
    </Box>
  )
}
