"use client";

import { motion } from "framer-motion";
import { ContactUsSection } from "./contactUs";
import { SOCIALS, TEAM, TEAM_BIO, VALUES } from "@/constants/company";
import { Box, Stack, Typography, Avatar, Grid, Divider } from "@mui/material";

export const CompanyHero = () => {
  return (
    <section>
      <Box textAlign={'center'} py={15} px={1}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          We&apos;re building the future of flow.
        </motion.h1>
        <Typography variant="h6">
          TicTask exists to help people and teams work better together — with clarity and calm.
        </Typography>
      </Box>
    </section>
  );
}

export const ValuesSection = () => {
  return (
    <Box 
      py={8} 
      textAlign="center"  
      color="var(--background)"
      bgcolor={'var(--foreground)'}
    >
      <Typography variant="h4" fontWeight={700} mb={1}>Our Core Values</Typography>
      <Typography sx={{ opacity: 0.85 }}>The principles that guide how we think, build, and collaborate.</Typography>
      <Divider sx={{ background: 'var(--dull-gray)', maxWidth: 200, mx: 'auto', my: 2}} />
      <Grid container 
        spacing={4} 
        maxWidth="lg" 
        mx="auto" 
        mt={4}
        display={'flex'} 
        flexWrap={'wrap'}
        justifyContent={'space-around'}
      >
        {VALUES.map((v) => (
          <Box key={v.title}>
            <Stack spacing={1} px={1} maxWidth={360}>
              <Typography variant="h6" fontWeight={600}>
                {v.title}
              </Typography>
              <Typography sx={{ opacity: 0.8}}>
                {v.desc}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export const TeamSection = () => {
  return (
    <Box
      component="section"
      py={{ xs: 10, md: 14 }}
      px={{ xs: 2, md: 4 }}
      sx={{
        overflow: "hidden",
        background:
          "linear-gradient(180deg, var(--background) 0%, rgba(127, 127, 127, 0.03) 100%)",
      }}
    >
      <Stack
        maxWidth="lg"
        mx="auto"
        spacing={7}
        alignItems="center"
        textAlign="center"
      >
        <Stack spacing={2} maxWidth={850}>
          <Typography
            variant="overline"
            fontWeight={700}
            letterSpacing={2}
            sx={{ opacity: 0.8 }}
          >
            THE PEOPLE BEHIND TICTASK
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.1,
            }}
          >
            Small team. Big ideas.
          </Typography>

          <Typography
            fontSize={{ xs: 17, md: 20 }}
            lineHeight={1.7}
            sx={{ opacity: 0.72 }}
          >
            {TEAM_BIO}
          </Typography>
        </Stack>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {[
            {
              title: "Built with purpose",
              description:
                "We care deeply about solving real problems, not just adding more features.",
            },
            {
              title: "Better together",
              description:
                "Great products come from different perspectives, honest conversations, and shared ownership.",
            },
            {
              title: "Always learning",
              description:
                "We stay curious, challenge assumptions, and continuously look for better ways to work.",
            },
          ].map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  p: 3,                   
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider", 
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
                    borderColor: "warning.main",
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="h6" fontWeight={700}>
                    {item.title}
                  </Typography>

                  <Typography
                    fontSize={14}
                    lineHeight={1.7}
                    sx={{ opacity: 0.65 }}
                  >
                    {item.description}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* <Divider sx={{ width: "100%", maxWidth: 900 }} /> 
        
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            Meet the team
          </Typography>

          <Typography sx={{ opacity: 0.65 }}>
            The people turning ideas into something useful every day.
          </Typography>
        </Stack> */}

        {/* <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {TEAM.map((member, index) => {
            const initials =
              member.name
                ?.split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((name) => name[0]?.toUpperCase())
                .join("") || "?";

            return (
              <Grid
                key={member.name}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      backgroundColor: "background.paper",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 45px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Stack alignItems="center" spacing={1.5}>
                      <Avatar
                        sx={{
                          width: 110,
                          height: 110,
                          mb: 1,
                          fontSize: 32,
                          fontWeight: 700,
                          background:
                            "linear-gradient(135deg, var(--primary), #6366f1)",
                          boxShadow:
                            "0 10px 30px rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        {initials}
                      </Avatar>

                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mt: 1 }}
                      >
                        {member.name}
                      </Typography>

                      <Typography
                        color="primary"
                        fontWeight={600}
                        fontSize={14}
                      >
                        {member.role}
                      </Typography>

                      <Typography
                        fontSize={13}
                        sx={{ opacity: 0.55 }}
                      >
                        {member.location}
                      </Typography>

                      <Divider sx={{ width: 45, my: 1 }} />

                      <Typography
                        fontSize={14}
                        lineHeight={1.7}
                        sx={{ opacity: 0.65 }}
                      >
                        Bringing curiosity, creativity, and a
                        problem-solving mindset to the team.
                      </Typography>
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid> */}
        

        <Box
          sx={{
            width: "100%",
            maxWidth: 850,
            mt: 3,
            p: { xs: 2, md: 4 },
            borderRadius: 0,
            color: "var(--background)",
            background: "var(--foreground)",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ maxWidth: 650 }}
            >
              Great products are built by people who care.
            </Typography>

            <Typography
              sx={{
                opacity: 0.75,
                maxWidth: 650,
                lineHeight: 1.8,
              }}
            >
              We&apos;re creating TicTask with the belief that work should
              feel less overwhelming and more intentional. Every feature,
              conversation, and decision is part of that journey.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};


export const SocialsSection = () => {
  return (
    <Box py={8} textAlign="center" color="var(--background)" bgcolor={'var(--foreground)'}>
      <Typography variant="h4" fontWeight={700} mb={1}>Connect with Us</Typography>
      <Typography sx={{ opacity: 0.85 }}>Follow us on social media to stay updated on our journey and latest news.</Typography>
      <Stack direction="row" spacing={4} justifyContent="center" mt={4}>
        {SOCIALS.map((social) => (
          <Box key={social.name} component="a" href={social.url} target="_blank" rel="noopener noreferrer" color="inherit">
            {social.icon}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function CompanyPage() {
  return (
    <Box>
      <CompanyHero />
      <ValuesSection />
      <TeamSection />
      <ContactUsSection />
      <SocialsSection />
    </Box>
  )
}