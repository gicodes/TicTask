'use client';

import React from 'react';
import { Container, Typography, Divider, Box, Link, Stack } from '@mui/material';

const PRIVACY_COMPANY = 'TicTask';
const PRIVACY_EFFECTIVE = 'December 31, 2025';
const PRIVACY_CONTACT = 'privacy@tictask.ng';

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={600}>{PRIVACY_COMPANY} — Privacy Policy</Typography>
        <Typography variant="body2">Effective date: {PRIVACY_EFFECTIVE}</Typography>

        <Divider />

        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>1. What this policy covers</Typography>
          <Typography paragraph>
            This Privacy Policy explains how {PRIVACY_COMPANY} collects, uses, discloses, and protects personal data when you use our Service.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>2. Data we collect</Typography>
          <Typography paragraph>
            We collect information you provide (e.g., account details, profile information), usage data (e.g., pages visited, actions taken), device and technical data (e.g., IP address, browser type), and payment transaction data if you make purchases.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>3. How we use your data</Typography>
          <Typography paragraph>
            We use personal data to provide and improve the Service, process payments, communicate with you, protect security, and comply with the law. We may also use aggregated or anonymized data for analytics and product improvement.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>4. Legal bases for processing (where applicable)</Typography>
          <Typography paragraph>
            Depending on your jurisdiction, we rely on consent, contractual necessity, legitimate interests, and legal obligations to process your data.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>5. Sharing and disclosure</Typography>
          <Typography paragraph>
            We may share data with service providers (hosting, payment processors), affiliates, or when required by law. We require vendors to maintain appropriate security and only process data on our instructions.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>6. International transfers</Typography>
          <Typography paragraph>
            Data may be transferred and processed in countries outside your jurisdiction. We take steps to ensure transfers follow applicable legal protections.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>7. Data retention</Typography>
          <Typography paragraph>
            We retain personal data as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce agreements. Specific retention periods depend on the type of data and legal requirements.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>8. Your rights</Typography>
          <Typography paragraph>
            Where applicable, you may have rights to access, correct, delete, or port your personal data and to restrict or object to certain processing. To exercise rights, contact us at <Link href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</Link>.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>9. Security</Typography>
          <Typography paragraph>
            We implement reasonable technical and organizational measures to protect your data, but no system is completely secure. If a data breach occurs, we will follow applicable breach notification laws.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>10. Children</Typography>
          <Typography paragraph>
            The Service is not intended for children under the age of 13. We do not knowingly collect personal data from children without parental consent.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>11. Changes to this policy</Typography>
          <Typography paragraph>
            We may update this Privacy Policy. We will post a revised version with a new effective date. Continued use after changes constitutes acceptance.
          </Typography>

          <Typography variant="h6" fontWeight={600} gutterBottom>12. Contact</Typography>
          <Typography paragraph>
            Questions or requests about privacy can be sent to <Link href={`mailto:${PRIVACY_CONTACT}`}>{PRIVACY_CONTACT}</Link>.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}