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
        minHeight: { xs: 360, md: 669 },
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#0a0a0a',
        color: 'white',
        overflow: 'hidden',
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
          px: { xs: 3, md: 6, lg: 10 } }}
        >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
          maxWidth="1400px"
          mx="auto"
        >
          <Box sx={{ flex: 1, maxWidth: { md: '500px', lg: '600px' } }}>
            <Box minHeight={100}>
              <Chip
                label="FEATURES"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                }}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                flex: 1,
              }}
            >              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <Stack direction="row" alignItems="center" gap={2} mb={3}>
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: { xs: 32, sm: 50, md: 64},
                        height: { xs: 32, sm: 50, md: 64},
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 36,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {current.icon}
                    </Box>
                    <Typography 
                      variant="h2" 
                      fontWeight={800} 
                      lineHeight={1.1}
                      fontSize={{ xs: 30, sm: 36, md: 44, lg: 60}}
                    >
                      {current.title}
                    </Typography>
                  </Stack>

                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 5, maxWidth: 600 }}>
                    {current.description}
                  </Typography>

                  <Stack spacing={2.5}>
                    {current.bulletPoints.map((point, idx) => (
                      <Stack key={idx} direction="row" alignItems="flex-start" gap={2}>
                        <MdCheckCircle size={22} color="#22ff88" style={{ marginTop: 3 }} />
                        <Typography variant="body1" sx={{ opacity: 0.95 }}>
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
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-end" },
                justifyContent: "flex-end",
              }}
            >
              <Stack direction="row" gap={1.5}>
                <IconButton
                  onClick={prev}
                  sx={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  <MdKeyboardArrowLeft size={28} />
                </IconButton>
                <IconButton
                  onClick={next}
                  sx={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  <MdKeyboardArrowRight size={28} />
                </IconButton>
              </Stack>

              <Stack direction="row" justifyContent="center" spacing={1.5} mt={4}>
                {features.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => goTo(idx)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' },
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
          height: 3,
          bgcolor: 'rgba(255,255,255,0.7)',
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