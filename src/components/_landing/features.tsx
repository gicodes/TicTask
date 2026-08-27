'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, IconButton, Stack, Chip } from "@mui/material";
import { 
  MdEditCalendar, 
  MdGroups, 
  MdSecurity,
  MdAdminPanelSettings, 
  MdInsights,
  MdCheckCircle,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const FeaturesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prev = () => goTo((currentIndex - 1 + features.length) % features.length);
  const next = () => goTo((currentIndex + 1) % features.length);

  const current = features[currentIndex];

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#0a0a0a',
        color: 'white',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 1200,
        borderRadius: 5,
        margin: '0 auto'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${current.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.45) contrast(1.1)',
          }}
        />
      </AnimatePresence>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.85) 100%)',
          zIndex: 1,
        }}
      />

      <Box 
        sx={{ 
          paddingTop: { xs: 4, md: 8 },
          marginBottom: 8,
          position: 'relative', 
          zIndex: 2, 
          width: '100%', 
          px: { xs: 3, md: 6, lg: 10 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
          maxWidth={1400}
          mx="auto"
        >
          <Box sx={{ flex: 1, width: '100%' }}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              gap={2}
              mb={{ xs: 3.5, sm: 4 }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    bgcolor: 'common.white',
                    color: 'common.black',
                    boxShadow: '0 6px 20px rgba(255,255,255,0.08)',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      fontSize: 22,
                      lineHeight: 0,
                      '& > svg': { fontSize: 'inherit' },
                    }}
                  >
                    {current.icon}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      display: 'block',
                      lineHeight: 1.2,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    Features
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em',
                      color: 'common.white',
                    }}
                  >
                    {current.shortLabel}
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label={`${String(currentIndex + 1).padStart(2, '0')} / ${String(features.length).padStart(2, '0')}`}
                size="small"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  height: 26,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              />
            </Stack>

            <Box sx={{ position: 'relative', flex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                  <Typography 
                    variant="h2" 
                    fontWeight={800} 
                    lineHeight={1.08}
                    letterSpacing="-0.035em"
                    fontSize={{ xs: 28, sm: 34, md: 42, lg: 52 }}
                    sx={{ 
                      mb: 2.5, 
                      maxWidth: 720,
                      minHeight: { xs: 60 },
                    }}
                  >
                    {current.title}
                  </Typography>

                  <Typography 
                    variant="h6" 
                    sx={{ 
                      opacity: 0.88, 
                      mb: 4.5, 
                      minHeight: { xs: 99 },
                      maxWidth: 600,
                      fontWeight: 400,
                      lineHeight: 1.55,
                      fontSize: { xs: '1rem', sm: '1.15rem' },
                    }}
                  >
                    {current.description}
                  </Typography>

                  <Stack spacing={2.25} minHeight={{ xs: 260, sm: 200 }}>
                    {current.bulletPoints.map((point, idx) => (
                      <Stack key={idx} direction="row" alignItems="flex-start" gap={1.75}>
                        <Box
                          sx={{
                            mt: 0.35,
                            flexShrink: 0,
                            color: 'rgba(255,255,255,0.9)',
                            opacity: 0.85,
                          }}
                        >
                          <MdCheckCircle size={20} />
                        </Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            opacity: 0.92,
                            lineHeight: 1.55,
                            fontSize: { xs: '0.95rem', sm: '1rem' },
                          }}
                        >
                          {point}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </motion.div>
              </AnimatePresence>
            </Box>

            <Box
              sx={{
                height: { xs: 100, md: 90 },
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-end',
              }}
            >
              <Stack direction="row" gap={1.5}>
                <IconButton
                  onClick={prev}
                  aria-label="Previous feature"
                  sx={{
                    width: 44,
                    height: 44,
                    border: '1px solid rgba(255,255,255,0.28)',
                    color: 'white',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                  }}
                >
                  <MdKeyboardArrowLeft size={26} />
                </IconButton>
                <IconButton
                  onClick={next}
                  aria-label="Next feature"
                  sx={{
                    width: 44,
                    height: 44,
                    border: '1px solid rgba(255,255,255,0.28)',
                    color: 'white',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                  }}
                >
                  <MdKeyboardArrowRight size={26} />
                </IconButton>
              </Stack>

              <Stack direction="row" justifyContent="center" spacing={1.25} mt={3.5}>
                {features.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => goTo(idx)}
                    role="button"
                    aria-label={`Go to feature ${idx + 1}`}
                    sx={{
                      width: idx === currentIndex ? 22 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.28)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        bgcolor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.55)',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          bgcolor: 'rgba(255,255,255,0.75)',
          width: `${((currentIndex + 1) / features.length) * 100}%`,
          transition: 'width 0.4s linear',
          zIndex: 4,
        }}
      />
    </Box>
  );
};

export default FeaturesShowcase;

const features = [
  {
    icon: <MdEditCalendar />,
    shortLabel: "Capture",
    imageUrl: "/features/99W9e.jpg",
    title: "Your mind ➞ TicTask ➞ Action",
    description: "Use TicTask to capture and organize tasks as they come to your mind. Then, easily convert them into actionable events.",
    bulletPoints: [
      "Quickly jot down ideas as tasks or tickets",
      "Organize your task by priority and severity",
      "Convert tasks into calendar events seamlessly",
      "Capture deadline with reminders prior to due date",
    ],
  },
  {
    icon: <MdGroups />,
    shortLabel: "Teams",
    imageUrl: "/features/DHeWP.jpg",
    title: "Built for Teams",
    description: "Collaborate with your entire team in real time. Share tasks, assign responsibilities, and keep everyone aligned in one workspace.",
    bulletPoints: [
      "Assign tickets and tasks to teammates",
      "Track progress across team workspace",
      "Leave comments and feedback on tasks",
      "Stay in sync with team-wide notifications",
    ],
  },
  {
    icon: <MdSecurity />,
    shortLabel: "Security",
    imageUrl: "/features/security.jpeg",
    title: "Security First",
    description: "Consistently update our systems and software to ensure your experience is safe and secure.",
    bulletPoints: [
      "End-to-end encryption",
      "Regular security audits",
      "Two-factor authentication",
      "Compliance with regulations",
    ],
  },
  {
    icon: <MdAdminPanelSettings />,
    shortLabel: "Access",
    imageUrl: "/features/fVwnw.jpg",
    title: "Role-Based Access Control",
    description: "Control who can do what. TicTask ensures secure and organized workflows with flexible roles and permissions.",
    bulletPoints: [
      "Defined roles such as owner/admin, moderator, member",
      "Granular permissions for sensitive actions",
      "Prevent accidental changes or data loss",
      "Scale your team with confidence",
    ],
  },
  {
    icon: <MdInsights />,
    shortLabel: "Insights",
    imageUrl: "/features/ticketing_system.jpg",
    title: "Insights That Drive Action",
    description: "Go beyond task lists. TicTask gives you visibility into how your team is working, helping you improve efficiency.",
    bulletPoints: [
      "Track ticket resolution times",
      "See team workload distribution",
      "Spot productivity trends",
      "Export reports for stakeholders",
    ],
  },
];