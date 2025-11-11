'use client';

import React from 'react';
import { Container, Typography, Box, Divider, Stack, Link } from '@mui/material';

const COOKIE_COMPANY = 'TicTask';
const COOKIE_EFFECTIVE = 'December 31, 2025';
const COOKIE_CONTACT = 'privacy@tictask.ng';

export default function CookiePolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={600}>{COOKIE_COMPANY} — Cookie Policy</Typography>
        <Typography variant="body2">Effective date: {COOKIE_EFFECTIVE}</Typography>

        <Divider />

        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>1. What are cookies?</Typography>
          <Typography paragraph>
            Cookies are small text files stored on your device to help websites remember information about your visit. They enable features such as session management, preferences, and analytics.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>2. Types of cookies we use</Typography>
          <Typography paragraph>
            - Strictly necessary cookies: required for basic site functionality.
            <br />- Performance and analytics cookies: help us understand how the site is used.
            <br />- Functional cookies: remember preferences and enable enhanced features.
            <br />- Advertising and targeting cookies: support advertising, personalization, and measuring ad effectiveness.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>3. Third-party cookies</Typography>
          <Typography paragraph>
            We may allow third-party services (e.g., analytics and ad networks) to place cookies. These parties have their own cookie policies.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>4. Managing cookies</Typography>
          <Typography paragraph>
            You can manage or delete cookies through your browser settings. Disabling certain cookies may affect site functionality. To opt-out of analytics, see the settings or links provided in the footer.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>5. Consent</Typography>
          <Typography paragraph>
            Where required by law, we request consent before setting non-essential cookies. You may withdraw consent at any time by changing your cookie preferences in the site settings or via your browser controls.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>6. Contact</Typography>
          <Typography paragraph>
            Questions about cookies may be sent to <Link href={`mailto:${COOKIE_CONTACT}`}>{COOKIE_CONTACT}</Link>.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}