'use client';

import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const features = [
  {
    eyebrow: 'TASKS',
    title: 'Everything starts with a task.',
    description:
      'Capture the work. Add context. Give it an owner. TicTask keeps the details close to the work itself.',
    image: '/in-app/Create-ticket.png',
  },
  {
    eyebrow: 'PROJECTS',
    title: 'Small tasks become bigger things.',
    description:
      'Connect related work into projects without turning simple work into project-management overhead.',
    image: '/product/tictask_imagine.jpg',
  },
  {
    eyebrow: 'TIMELINES',
    title: 'See the bigger picture.',
    description:
      'Understand dependencies, deadlines and progress without having to dig through endless conversations.',
    image: '/in-app/Calendar events.png',
  },
];

export const ProductFeatures = () => {
  return (
    <section>
      <Box
        sx={{
          background: '#f5f5f2',
          color: '#111',
          py: {
            xs: 10,
            md: 18,
          },
        }}
      >
        <Container maxWidth="lg">
          {features.map((feature, index) => (
            <Box
              key={feature.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md:
                    index % 2 === 0
                      ? '0.8fr 1.2fr'
                      : '1.2fr 0.8fr',
                },
                gap: {
                  xs: 5,
                  md: 10,
                },
                alignItems: 'center',
                mb: {
                  xs: 12,
                  md: 20,
                },
              }}
            >
              <Box
                sx={{
                  order: {
                    xs: 1,
                    md: index % 2 === 0 ? 1 : 2,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.75rem',
                    fontWeight: 900,
                    letterSpacing: '.12em',
                    color: 'var(--flair)',
                    mb: 2,
                  }}
                >
                  {feature.eyebrow}
                </Typography>

                <Typography
                  component="h3"
                  sx={{
                    fontSize: {
                      xs: '2.3rem',
                      md: '3.5rem',
                    },
                    lineHeight: 1,
                    letterSpacing: '-.045em',
                    fontWeight: 900,
                    mb: 3,
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    maxWidth: 470,
                    opacity: 0.65,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>

              <motion.div
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 40 : -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                viewport={{
                  once: true,
                }}
                style={{
                  order: index % 2 === 0 ? 2 : 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: {
                      xs: 3,
                      md: 5,
                    },
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow:
                      '0 30px 80px rgba(0,0,0,.12)',
                  }}
                >
                  <Box
                    component="img"
                    src={feature.image}
                    alt={feature.title}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </Box>
              </motion.div>
            </Box>
          ))}
        </Container>
      </Box>
    </section>
  );
};
