'use client';
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { MdEditCalendar, MdSecurity, MdSmartToy } from "react-icons/md";
import { Box, Grid, Typography, Paper, Badge, Stack } from "@mui/material";

const features = [
  {
    icon: <MdEditCalendar />,
    imageUrl: "/features/ticketing-system.png",
    title: "Your mind ➞ TicTask ➞ Action",
    description:
      "Use TicTask to capture and organize tasks as they come to your mind. Then, easily convert them into actionable events.",
    bulletPoints: [
      "Quickly jot down tasks and ideas",
      "Organize tasks with tags and priorities",
      "Set deadlines and reminders",
      "Convert tasks into calendar events seamlessly",
    ],
  },
  {
    icon: <MdSmartToy />,
    imageUrl: "/features/ticketing_system.jpg",
    title: "AI Assistance & Analytics",
    description:
      "Leverage AI to speed up or automate routine actions, events and provide insights into your productivity patterns.",
    bulletPoints: [
      "AI-powered task suggestions",
      "Automated scheduling and reminders",
      "Productivity analytics and reports",
      "Personalized productivity tips",
    ],
  },
  {
    icon: <MdSecurity />,
    imageUrl: "/features/security.jpeg",
    title: "Security First",
    description:
      "Your data is safe with us. We prioritize your privacy and security with robust measures.",
    bulletPoints: [
      "End-to-end encryption",
      "Regular security audits",
      "Two-factor authentication",
      "Compliance with data protection regulations",
    ],
  },
];

const Features = () => {
  return (
    <Box py={8} maxWidth={1200} mx={'auto'}>
      <Grid container spacing={8}>
        {features.map((f, i) => {
          const isEven = i % 2 === 1;

          return (
            <Grid
              key={i}
              container
              spacing={4}
              width={'100%'}
              alignItems="center"
              justifyContent={{ xs: 'center', sm: 'space-around' }}
              direction={{ xs: "column", md: isEven ? "row-reverse" : "row" }}
            >
              <Grid>
                <motion.div
                  style={{ overflow: "hidden" }} 
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      borderRadius: 5,
                      minHeight: 300,
                      width: "100%",              
                      maxWidth: { xs: 300, sm: 360, md: 420, lg: 500 }, 
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${f.imageUrl})`,
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: 3,
                      px: 4,
                      borderRadius: "16px",
                      bgcolor: "transparent",
                      color: "inherit",
                      maxWidth: { xs: 'none', sm: 300, md: 360, lg: 420 }
                    }}
                  >
                    <Stack direction="row" gap={2} mb={2} alignItems="center">
                      <Badge
                        sx={{
                          fontSize: 40,
                          bgcolor: "#222",
                          color: "#0ff",
                          p: 2,
                          borderRadius: "50%",
                        }}
                      >
                        {f.icon}
                      </Badge>
                      <Typography variant="h5">{f.title}</Typography>
                    </Stack>

                    <Typography variant="subtitle2" mb={2}>
                      {f.description}
                    </Typography>

                    <Box>
                      {f.bulletPoints.map((point, idx) => (
                        <Stack
                          key={idx}
                          direction="row"
                          gap={1}
                          mb={1}
                          alignItems="center"
                        >
                          <FaCheckCircle color="darkslateblue" size={15} />
                          <Typography variant="subtitle2">{point}</Typography>
                        </Stack>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Features;