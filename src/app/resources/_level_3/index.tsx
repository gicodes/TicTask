"use client";

import { Card, CardContent, Box, Stack, Typography, IconButton} from "@mui/material";
import { RESOURCES } from "@/constants/resources";
import { Button } from "@/assets/buttons";
import { useRef } from "react";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 340; // approximate card + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <Box
        sx={{
          position: "relative",
          maxWidth: "100%",
          py: { xs: 6, md: 10 },
          overflow: "hidden",
        }}
      >
        {/* Navigation Arrows */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            justifyContent: "space-between",
            px: { md: 2, lg: 4 },
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              pointerEvents: "auto",
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              width: 48,
              height: 48,
              "&:hover": {
                bgcolor: "white",
                transform: "scale(1.08)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => scroll("right")}
            sx={{
              pointerEvents: "auto",
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              width: 48,
              height: 48,
              "&:hover": {
                bgcolor: "white",
                transform: "scale(1.08)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Horizontal Scroll Track */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            px: { xs: 2, sm: 3, md: 6, lg: 8 },
            pb: 2, // room for scrollbar / shadow
            // Hide scrollbar but keep functionality
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            // Soft edge fade (optional polish)
            maskImage: {
              xs: "none",
              md: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            },
          }}
        >
          {RESOURCES.map((r) => (
            <Card
              key={r.title}
              elevation={0}
              sx={{
                position: "relative",
                flex: "0 0 auto",
                width: { xs: "85vw", sm: 320, md: 340 },
                minHeight: 300,
                borderRadius: 3.5,
                overflow: "hidden",
                cursor: "pointer",
                scrollSnapAlign: "center",
                backgroundImage: `url(${r.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",

                "&:hover": {
                  transform: "translateY(-10px) scale(1.02)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.28)",
                  "& .overlay": {
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)",
                  },
                  "& .content": {
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              {/* Gradient Overlay */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.18) 100%)",
                  transition: "background 0.4s ease",
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
                  transform: "translateY(6px)",
                  transition: "transform 0.4s ease",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    mb: 1,
                    letterSpacing: "-0.025em",
                    textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                  }}
                >
                  {r.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mb: 2.5,
                    opacity: 0.92,
                    lineHeight: 1.55,
                    textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                  }}
                >
                  {r.desc}
                </Typography>

                <Box
                  component={Link}
                  href={r.link}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    py: 1.25,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.28)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.26)",
                      borderColor: "rgba(255,255,255,0.55)",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  Explore →
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
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
