'use client';

import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

export const ProductDemoHero = () => {
  return (
    <section>
      <Box
        sx={{
          minHeight: '92vh',
          background: 'var(--background)',
          color: 'var(--foreground)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',

          '&::before': {
            content: '""',
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,70,70,.16), transparent 65%)',
            top: -300,
            right: -200,
            pointerEvents: 'none',
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 10, md: 14 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Stack spacing={7} alignItems="center">
            <Box
              textAlign="center"
              maxWidth={850}
            >
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  sx={{
                    display: 'inline-flex',
                    px: 2,
                    py: 0.8,
                    mb: 3,
                    borderRadius: '999px',
                    border: '1px solid var(--disabled)',
                    fontSize: '.8rem',
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  See TicTask in action
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: '1.05rem',
                      md: '1.25rem',
                    },
                    lineHeight: 1.7,
                    maxWidth: 650,
                    mx: 'auto',
                    opacity: 0.7,
                  }}
                >
                  Explore how TicTask connects tasks, projects,
                  timelines and teamwork into one calm, predictable
                  workflow.
                </Typography>
              </motion.div>
            </Box>
                
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              style={{ width: '100%' }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 1180,
                  mx: 'auto',
                  borderRadius: {
                    xs: 3,
                    md: 5,
                  },
                  overflow: 'hidden',
                  background: '#111',
                  boxShadow:
                    '0 40px 100px rgba(0,0,0,.18)',
                }}
              >
                <Box
                  sx={{
                    height: 42,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    background: '#181818',
                  }}
                >
                  {[1, 2, 3].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background:
                          item === 1
                            ? '#ff5f57'
                            : item === 2
                              ? '#febc2e'
                              : '#28c840',
                      }}
                    />
                  ))}
                </Box>

                <Box
                  component="iframe"
                  src="https://www.youtube.com/embed/7t4e0wtqsvY?si=mTiyxjxR1LHAckHt"
                  title="TicTask product demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sx={{
                    width: '100%',
                    display: 'block',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    background: '#090909',
                    border: 'none',
                  }}
                />
              </Box>
            </motion.div>

            <Typography
              variant="caption"
              sx={{
                opacity: 0.45,
                textAlign: 'center',
              }}
            >
              A closer look at the TicTask workspace
            </Typography>
          </Stack>
        </Container>
      </Box>
    </section>
  );
};
