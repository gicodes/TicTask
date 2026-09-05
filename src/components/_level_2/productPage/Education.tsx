'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const resources = [
  {
    type: 'GUIDE',
    title: 'Build a better task',
    description:
      'A practical guide to turning vague responsibilities into actionable work.',
    image: '/',
  },
  {
    type: 'VIDEO',
    title: 'Your first TicTask project',
    description:
      'Watch how a collection of simple tasks becomes an organized project.',
    image: '/',
  },
  {
    type: 'GUIDE',
    title: 'From tasks to timelines',
    description:
      'Learn when to introduce structure and how to keep your workflow lightweight.',
    image: '/',
  },
];

export const ProductEducation = () => {
  return (
    <section>
      <Box
        sx={{
          py: {
            xs: 10,
            md: 16,
          },
          background: 'var(--background)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              mb: 7,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: 'var(--flair)',
                mb: 2,
              }}
            >
              LEARN THE WORKFLOW
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: '-.04em',
                fontSize: {
                  xs: '2.5rem',
                  md: '4rem',
                },
                lineHeight: 1,
                mb: 2,
              }}
            >
              Don't just use TicTask.
              <br />
              Get better at work.
            </Typography>

            <Typography
              sx={{
                maxWidth: 600,
                mx: 'auto',
                opacity: 0.6,
                lineHeight: 1.7,
              }}
            >
              Short guides and product walkthroughs designed
              to help you build better systems for getting things
              done.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {resources.map((resource, index) => (
              <Grid
                key={resource.title}
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      border:
                        '1px solid rgba(0,0,0,.08)',
                      background: '#fff',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      component="img"
                      src={resource.image}
                      alt={resource.title}
                      sx={{
                        width: '100%',
                        aspectRatio: '16 / 10',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />

                    <Box sx={{ p: 3.5 }}>
                      <Typography
                        sx={{
                          fontSize: '.7rem',
                          fontWeight: 900,
                          letterSpacing: '.1em',
                          color: 'var(--flair)',
                          mb: 1.5,
                        }}
                      >
                        {resource.type}
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          mb: 1.5,
                        }}
                      >
                        {resource.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.7,
                          opacity: 0.6,
                        }}
                      >
                        {resource.description}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 3,
                          fontWeight: 800,
                          fontSize: '.9rem',
                        }}
                      >
                        Explore →
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
