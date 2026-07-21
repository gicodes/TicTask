'use client'

import { DIFFERENTIAL, FEATURES } from '@/constants/product';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export const ProductShowcase = () => {
  return (
    <section>
      <Box
        sx={{
          background: 'var(--foreground)',
          color: 'var(--background)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: { 
              xs: 10, 
              md: 14 
            } 
          }}
        >
          <Grid
            container
            spacing={8}
            alignItems="stretch"
            sx={{ 
              display: 'flex',
              flexDirection: { 
                xs: 'column', md: 'row' 
              }
            }}
          >
            <Grid 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              size={{ xs: 12, lg: 6 }}
            >
              <Box textAlign={{ xs: 'center', lg: 'left'}}>
                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: '2.25rem', md: '2.75rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  One system.<br />Every stage of work.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    opacity: 0.9,
                    maxWidth: 'md',
                    mb: 8,
                  }}
                >
                  Start with simple tasks. Grow into structured projects.<br/>
                  Scale into coordinated team execution — without switching tools.
                </Typography>
              </Box>

              <Grid
                container
                spacing={3}
              >
                {FEATURES.map((f, i) => (
                  <Grid
                    key={f.title}
                    size={{ xs: 12 }}
                    sx={{
                      display: "flex",
                      justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                      style={{
                        width: "100%",
                        maxWidth: 340,
                        padding: "1.75rem",
                        borderRadius: 18,
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.08)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 18px 40px rgba(0,0,0,.18)",
                      }}
                    >
                      <Stack spacing={1.5} alignItems="center">
                        <Typography variant="h6" fontWeight={700}>
                          {f.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          textAlign="center"
                          sx={{ opacity: 0.85 }}
                        >
                          {f.desc}
                        </Typography>

                        {"plan" in f && (
                          <Typography
                            variant="caption"
                            sx={{ opacity: 0.6, mt: 0.5 }}
                          >
                            Available on {String(f.plan)}
                          </Typography>
                        )}
                      </Stack>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              size={{ xs: 12, lg: 6 }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  color: '#111',
                  borderRadius: { xs: 4, md: 6 },
                  p: { xs: 2, md: 4 },
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)',
                    backgroundSize: '1px 5px',
                    maskImage:
                      'radial-gradient(circle at center, transparent 15%, black 50%)',
                    WebkitMaskImage:
                      'radial-gradient(circle at center, transparent 10%, black 70%)',
                    opacity: .50,
                    zIndex: 0,
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box textAlign={{ xs: 'center', lg: 'left'}} p={3} mb={3}>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      gutterBottom
                      sx={{ fontSize: { xs: '1.85rem', md: '2.25rem' } }}
                    >
                      Choose how deep you go
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.85 }}
                    >
                      TicTask adapts to how serious your workflow becomes <br/> no forced upgrades, no bloated complexity.
                    </Typography>
                  </Box>

                  <Stack spacing={4}>
                    {DIFFERENTIAL.map((plan, i) => (
                      <motion.div
                        key={plan.title}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Box
                          sx={{
                            p: 4,
                            borderRadius: 3,
                            background: i === 0 ? '#f8f9fa' : 'white',
                            border: i === 1 
                              ? '1px solid red' 
                              : '1px solid rgba(0,0,0,0.1)',
                            boxShadow: i === 1 
                              ? '0 10px 30px rgba(0,0,0,0.1)' 
                              : 'none',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 3,
                              py: 0.75,
                              borderRadius: '999px',
                              background: i === 1 ? '#000' : 'rgba(0,0,0,0.08)',
                              color: i === 1 ? '#fff' : '#111',
                              fontWeight: 700,
                              mb: 3,
                              fontSize: '0.95rem',
                            }}
                          >
                            {plan.title}
                          </Box>

                          {plan.desc && (
                            <Typography
                              variant="body2"
                              sx={{ lineHeight: 1.7, opacity: 0.9 }}
                            >
                              {plan.desc}
                            </Typography>
                          )}
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </section>
  );
};