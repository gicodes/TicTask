"use client";

import { motion } from "framer-motion";
import { TEAM, VALUES } from "@/constants/company";
import { Box, Stack, Typography, Avatar, Grid } from "@mui/material";
import { ContactUsSection } from "./contactUs";

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
        <Typography variant="h6" className="custom-dull">
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
      <Typography variant="h4" fontWeight={700}>Our Core Values</Typography>
      <Typography my={1}>The principles that guide how we think, build, and collaborate.</Typography>

      <Grid container 
        spacing={4} 
        maxWidth="lg" 
        mx="auto" 
        mt={8}
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
              <Typography color="custom-dull">{v.desc}</Typography>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export const TeamSection = () => {
  return (
    <Box py={10} textAlign="center">
      <Typography variant="h4" fontWeight={700} my={1}>
        Meet the TicTask Team
      </Typography>
      <Typography color="var(--secondary)">
        We&apos;re a small, distributed team passionate about building tools that make collaboration feel effortless
      </Typography>

      <Grid container my={10} spacing={5} justifyContent="center">
        {TEAM.map((member) => (
          <Grid key={member.name}>
            <Stack alignItems="center" spacing={2}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
                <Typography variant="h4">{member.name[0]}</Typography>
              </Avatar>
              <Typography fontWeight={600}>{member.name}</Typography>
              <Typography className="custom-dull">{member.role}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
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
    </Box>
  )
}
