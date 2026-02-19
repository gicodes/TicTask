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
    <Box py={10} px={2} textAlign="center">
      <Typography variant="h4" fontWeight={700} my={1}>
        Meet the TicTask Team
      </Typography>
      <Typography fontSize={17} maxWidth={669} mx={'auto'}>
       {TEAM_BIO}
      </Typography>

      <Grid container my={10} spacing={5} justifyContent="center">
        {TEAM.map((member) => (
          <Grid key={member.name}>
            <Stack alignItems="center" spacing={1}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
                <Typography variant="h4">{
                  (() => {
                    const words = member.name?.split(' ').filter(Boolean) || [];
                    return words.slice(0, 2).map(n => n[0]?.toUpperCase()).join('');
                  })()
                }</Typography>
              </Avatar>
              <Typography fontWeight={600} pt={2}>{member.name}</Typography>
              <Typography sx={{ opacity: 0.6}}>{member.role}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export const SocialsSection = () => {
  return (
    <Box py={8} textAlign="center" color="var(--background)" bgcolor={'var(--foreground)'}>
      <Typography variant="h4" fontWeight={700} mb={1}>Connect with Us</Typography>
      <Typography sx={{ opacity: 0.85 }}>Follow us on social media to stay updated on our journey and latest news.</Typography>
      <Stack direction="row" spacing={3} justifyContent="center" mt={4}>
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