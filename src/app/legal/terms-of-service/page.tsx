// File: app/legal/terms/page.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, Divider, Link, Stack } from '@mui/material';

const COMPANY = 'TicTask';
const EFFECTIVE = 'December 31, 2025';
const CONTACT_EMAIL = 'legal@tictask.ng';

export default function TermsOfServicePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" fontWeight={600}>{COMPANY} — Terms of Service</Typography>
        <Typography variant="body2">Effective date: {EFFECTIVE}</Typography>

        <Divider />

        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>1. Acceptance of Terms</Typography>
          <Typography paragraph>
            By accessing or using the {COMPANY} service (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Service.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>2. Who May Use the Service</Typography>
          <Typography paragraph>
            You must be at least 13 years old (or older where required by local law) to use the Service. You represent and warrant that you have the right, authority and capacity to enter into these Terms.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>3. Accounts and Registration</Typography>
          <Typography paragraph>
            Some features require an account. You agree to provide accurate information, keep your credentials secure, and notify us of any unauthorized use. You are responsible for all activity under your account.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>4. Use of the Service & Restrictions</Typography>
          <Typography paragraph>
            You agree to use the Service only for lawful purposes. Prohibited uses include (but are not limited to) abusing, reverse-engineering, interfering with the Service, or using it to store or transmit illegal content.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>5. Fees and Payments</Typography>
          <Typography paragraph>
            Where applicable, paid features are described in the Service and are subject to the pricing and payment terms displayed at purchase. All fees are non-refundable unless otherwise specified.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>6. Termination</Typography>
          <Typography paragraph>
            We may suspend or terminate your access for violation of these Terms or inactivity. You may stop using the Service at any time. Termination does not relieve you of obligations incurred prior to termination.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>7. Intellectual Property</Typography>
          <Typography paragraph>
            The Service and its original content, features, and functionality are owned by {COMPANY} or its licensors and are protected by intellectual property laws. You are granted a limited, non-exclusive license to use the Service in accordance with these Terms.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>8. Disclaimers & Limitation of Liability</Typography>
          <Typography paragraph>
            The Service is provided &quot;as is&quot; and &quot;as available.&quot; To the fullest extent permitted by law, {COMPANY} disclaims all warranties. In no event will {COMPANY} be liable for indirect, incidental, special, consequential or punitive damages arising out of your use of the Service.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>9. Governing Law</Typography>
          <Typography paragraph>
            These Terms are governed by the laws of the jurisdiction in which {COMPANY} is incorporated, unless an applicable law requires otherwise. You and {COMPANY} submit to the exclusive jurisdiction of the courts located in that jurisdiction for disputes.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>10. Changes to Terms</Typography>
          <Typography paragraph>
            We may modify these Terms from time to time. If changes are material, we will provide notice. Continued use of the Service after changes constitutes acceptance.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>11. Contact</Typography>
          <Typography paragraph>
            For questions about these Terms, contact us at <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}