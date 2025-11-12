'use client';

import React from 'react';
import { Container, Typography, Stack, Link, Box } from '@mui/material';
import { motion } from 'framer-motion';

export default function LegalIndexPage() {
  const links = [
    { label: 'Terms of Service', href: '/legal/terms-of-service' },
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Cookie Policy', href: '/legal/cookie-policy' },
    { label: 'Data Policy', href: '/legal/data-policy' },
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight={600} px={2} component="h1" gutterBottom>
          Legal Information
        </Typography>
        <Typography variant="body1" color="var(--secondary)" gutterBottom>
          Explore TicTask’s legal and compliance documentation.
        </Typography>

        <Stack spacing={2} sx={{ mt: 4 }}>
          {links.map(({ label, href }) => (
            <Box key={href}>
              <Link
                href={href}
                underline="hover"
                variant="h6"
                fontSize={'1.25rem'}
                sx={{ display: 'inline-block', color: 'var(--info)' }}
              >
                {label}
              </Link>
            </Box>
          ))}
        </Stack>
      </motion.div>
    </Container>
  );
}
