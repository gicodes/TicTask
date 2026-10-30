"use client";

import { RESOURCES } from "@/constants/resources";
import { Button } from "@/assets/buttons";
import { useRef } from "react";
import Link from "next/link";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Card, CardContent, Box, Stack, Typography, IconButton} from "@mui/material";

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
          {subtitle || "Explore some of the articles we have written for TicTask users. For beginners and experts to learn, apply and even modify."}
        </Typography>
        {!title && !subtitle && 
          <Button component={Link} href={'/resources/docs'}>
            Getting Started
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
            <ArrowBackIosNew fontSize="small" />
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
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            px: { xs: 2, sm: 3, md: 6, lg: 8 },
            pb: 2, 
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            maskImage: {
              xs: "none",
              md: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            },
          }}
        >
          {RESOURCES.map((r) => (
            <Box 
              key={r.title}
              href={r.link}
              component={Link}
              height={'auto'}
            >
              <Card
                elevation={1}
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
                  display: 'grid',
                  backgroundPosition: "center",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& .content": {
                    transform: "translateY(0)",
                  },
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.28)",
                    "& .overlay": {
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)",
                    },
                  },
                }}
              >
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
                    p: 3.5,
                    color: "white",
                    alignContent: 'flex-end',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    transform: "translateY(6px)",
                    transition: "transform 0.4s ease",
                  }}
                >
                  <Typography
                    variant="h4"
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
                    variant="body1"
                    sx={{
                      mb: 2.5,
                      opacity: 0.92,
                      lineHeight: 1.55,
                      textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                    }}
                  >
                    {r.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default function ResourcesPage () {
  return (
    <Box>
      <ResourceHero />
      <ResourceGrid />
    </Box>
  )
}
