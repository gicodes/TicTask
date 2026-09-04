'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Capture',
    description:
      'Turn ideas, requests and responsibilities into clear tasks before they get lost.',
    image: '/features/plan.avif',
  },
  {
    number: '02',
    title: 'Organize',
    description:
      'Group related work into projects and give every task a meaningful place.',
    image: '/features/organize.avif',
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'Move work forward together without losing context between people and projects.',
    image: '/features/action.avif',
  },
];

export const ProductWorkflow = () => {
  return (
    <section>
      <Box
        sx={{
          py: {
            xs: 10,
            md: 15,
          },
          background: 'var(--foreground)',
          color: 'var(--background)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              maxWidth: 800,
              mb: {
                xs: 8,
                md: 12,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: 'var(--disabled)',
                mb: 4,
              }}
            >
              HOW IT WORKS
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: '-.04em',
                fontSize: {
                  xs: '1.8rem',
                  sm: '2.4rem',
                  md: '3rem',
                  lg: '3.6rem',
                  xl: '4rem',
                },
                lineHeight: 1,
                mb: 3,
              }}
            >
              From “what needs doing?”
              <br />
              to “done.”
            </Typography>

            <Typography
              sx={{
                fontSize: '1.1rem',
                opacity: 0.65,
                lineHeight: 1.7,
              }}
            >
              TicTask gives your work a natural progression.
              Start simple, add structure when you need it,
              and keep everything connected.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid
                key={step.title}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 3,
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                    margin: '-80px',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      background:
                        'rgba(255,255,255,.055)',
                      border:
                        '1px solid rgba(255,255,255,.09)',
                    }}
                  >
                    <Box
                      component="img"
                      src={step.image}
                      alt={step.title}
                      sx={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        objectFit: 'cover',
                        display: 'block',
                        background: '#202020',
                      }}
                    />

                    <Box sx={{ p: 3 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'var(--flair)',
                          fontWeight: 800,
                        }}
                      >
                        {step.number}
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          mt: 1,
                          mb: 1,
                          fontWeight: 800,
                        }}
                      >
                        {step.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.7,
                          opacity: 0.65,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </section>
  );
};
