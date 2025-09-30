'use client';

import { motion } from "framer-motion";
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  Badge, 
  Stack 
} from "@mui/material";
import { 
  MdAdminPanelSettings, 
  MdEditCalendar, 
  MdGroups, 
  MdInsights, 
  MdSecurity,
  MdCheckCircle,
} from "react-icons/md";

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
  {
    icon: <MdGroups />,
    imageUrl: "/features/teams.avif",
    title: "Built for Teams",
    description:
      "Collaborate with your entire team in real time. Share tasks, assign responsibilities, and keep everyone aligned in one workspace.",
    bulletPoints: [
      "Assign tickets and tasks to teammates",
      "Track progress across shared boards",
      "Leave comments and feedback on tasks",
      "Stay in sync with team-wide notifications",
    ],
  },
  {
    icon: <MdAdminPanelSettings />,
    imageUrl: "/features/ticketing_system.jpg",
    title: "Role-Based Access Control",
    description:
      "Control who can do what. TicTask ensures secure and organized workflows with flexible roles and permissions.",
    bulletPoints: [
      "Define roles like Admin, Manager, and Member",
      "Granular permissions for sensitive actions",
      "Prevent accidental changes or data loss",
      "Scale your team with confidence",
    ],
  },
  {
    icon: <MdInsights />,
    imageUrl: "/features/analytics.avif",
    title: "Insights That Drive Action",
    description:
      "Go beyond task lists. TicTask gives you visibility into how your team is working, helping you improve efficiency.",
    bulletPoints: [
      "Track ticket resolution times",
      "See team workload distribution",
      "Spot productivity trends",
      "Export reports for stakeholders",
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
              spacing={{xs: 4, sm: 4, md: 4}}
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
                      minWidth: { xs: 300, sm: 360, md: 420, lg: 500 },              
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
                  <Card
                    elevation={0}
                    sx={{
                      py: 3,
                      px: 1,
                      borderRadius: "16px",
                      bgcolor: "transparent",
                      color: "inherit",
                      width: '100%',
                      maxWidth: { xs: 'none', sm: 500, md: 360, lg: 420 }
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
                          <MdCheckCircle color="darkslateblue" size={15} />
                          <Typography variant="subtitle2">{point}</Typography>
                        </Stack>
                      ))}
                    </Box>
                  </Card>
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