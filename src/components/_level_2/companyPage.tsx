"use client";

import { motion } from "framer-motion";
import { ContactUsSection } from "./contactUs";
import { ValuesSection } from "./companyValues";
import { Box, Stack, Typography, Grid} from "@mui/material";
import { APPROACH, FOUNDERS_QUOTE, SOCIALS } from "@/constants/company";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export const CompanyHero = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 16, md: 22 },
        px: { xs: 2, md: 4 },
        textAlign: "center",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.08), transparent 70%)",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.div variants={fadeUp}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 3,
              fontWeight: 600,
              opacity: 0.6,
              fontSize: { xs: 11, md: 12 },
              color: 'var(--frost)'
            }}
          >
            ABOUT TICTASK
          </Typography>
        </motion.div>

        <motion.h1
          style={{
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "16px 0 20px",
            maxWidth: 920,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Work that moves forward without the noise.
        </motion.h1>

        <motion.div  variants={fadeUp}>
          <Typography
            sx={{
              fontSize: { xs: 18, md: 22 },
              lineHeight: 1.6,
              maxWidth: 720,
              mx: "auto",
              opacity: 0.72,
              fontWeight: 400,
            }}
          >
            TicTask is a workspace built so clarity, ownership, and progress
            don&apos;t require another tool, another meeting, or another layer of
            complexity.
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export const WhySection = () => {
  return (
    <Box
      component="section"
      py={{ xs: 10, md: 14 }}
      px={{ xs: 2, md: 4 }}
      sx={{
        borderTop: '2px dashed var(--disabled)',
        background: "var(--background)",
      }}
    >
      <Stack
        maxWidth="md"
        mx="auto"
        spacing={{ xs: 4, md: 5 }}
        textAlign="center"
      >
        <Typography
          variant="h3"
          fontWeight={501}
          sx={{
            fontSize: { xs: "1.9rem", md: "2.6rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: 'var(--spring)'
          }}
        >
          <i>Built because the tools</i> <span className="custom-dull">stopped helping.</span>
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 16.5, md: 18 },
            lineHeight: 1.75,
            opacity: 0.78,
            maxWidth: 660,
            mx: "auto",
          }}
        >
          Most of the time spent on work is no longer the work itself. It is
          hunting for context, re-explaining decisions, switching between
          systems that don&apos;t talk to each other, and managing the process of
          managing the process. I started TicTask after watching capable
          people lose momentum inside tools that were supposed to give it back.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 16.5, md: 18 },
            lineHeight: 1.75,
            opacity: 0.78,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          The goal was never another project management product. It was a
          single, quiet place where a task, a decision, a conversation, and
          the next action could live together—so the work itself could stay
          the focus.
        </Typography>
      </Stack>
    </Box>
  );
};


export const ApproachSection = () => {
  return (
    <Box
      component="section"
      py={{ xs: 10, md: 14 }}
      px={{ xs: 2, md: 4 }}
      sx={{
        background: "var(--foreground)",
        color: "var(--background)",
      }}
    >
      <Stack maxWidth="lg" mx="auto" spacing={7}>
        <Stack 
          width={'100%'} 
          spacing={2}
          display={'grid'} 
          textAlign={'right'}
          justifyContent={'end'}
        >
          <Typography
            variant="h3"
            fontWeight={650}
            sx={{
              fontSize: { xs: "1.9rem", md: "2.5rem" },
              letterSpacing: "-0.02em",
            }}
          >
            How it is made
          </Typography>
          <Typography sx={{ fontSize: 16 , maxWidth: 720}} color="var(--flair)">
            Every choice is measured against one question: does this make the
            work clearer and lighter, or does it just make the product larger?
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {APPROACH.map((point, i) => (
            <Grid key={point.title} size={{ xs: 12, md: 4 }}>
              <motion.div  variants={fadeUp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    height: "100%",
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    background: "background.paper",
                  }}
                >
                  <Typography variant="h6" fontWeight={650} mb={1.5}>
                    {point.title}
                  </Typography>
                  <Typography sx={{ opacity: 0.72, lineHeight: 1.7, fontSize: 15 }}>
                    {point.body}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export const FounderNote = () => {
  return (
    <Box
      component="section"
      py={{ xs: 10, md: 12 }}
      px={{ xs: 2, md: 4 }}
    >
      <Stack maxWidth={760} mx="auto" spacing={3}>
        <Typography
          sx={{
            fontSize: { xs: "1.35rem", md: "1.65rem" },
            fontWeight: 550,
            lineHeight: 1.45,
            textAlign: 'center',
            letterSpacing: "-0.01em",
          }}
        >
          {'“'}{FOUNDERS_QUOTE}.{'”'}
        </Typography>
        <Typography sx={{ opacity: 0.65, fontSize: 15, textAlign: 'right' }}>
          Gideon Iduma <br/> <span className="custom-dull">— Founder</span> 
        </Typography>
      </Stack>
    </Box>
  );
};

export const SocialsSection = () => {
  return (
    <Box
      py={{ xs: 8, md: 10 }}
      textAlign="center"
      bgcolor="var(--surface-1)"
    >
      <Typography variant="h5" fontWeight={600} mb={1}>
        Stay close to the work
      </Typography>
      <Typography sx={{ opacity: 0.7, mb: 4, fontSize: 15 }}>
        Occasional notes on what is shipping and why.
      </Typography>
      <Stack direction="row" spacing={4} justifyContent="center">
        {SOCIALS.map((social) => (
          <Box
            key={social.name}
            component="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{
              opacity: 0.75,
              transition: "opacity 0.2s",
              "&:hover": { opacity: 1 },
            }}
          >
            {social.icon}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default function CompanyPage() {
  return (
    <Box>
      <CompanyHero />
      <WhySection />
      <ValuesSection />
      <ApproachSection />
      <FounderNote />
      <ContactUsSection />
      <SocialsSection />
    </Box>
  );
}