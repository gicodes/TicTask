import { Box, Typography, TextField, Stack, Divider } from "@mui/material";
import styles from "@/app/page.module.css";

export const ContactUsSection = () => {
  return (
    <section id="contact-us">
      <Divider sx={{ border: '1px solid var(--foreground)'}} />
      <Box py={12} textAlign="center">
        <Typography variant="h4" fontWeight={700} mb={2}>
          Get in Touch
        </Typography>
        <Typography variant="body1" mb={6} sx={{ opacity: 0.85 }}>
          We’d love to hear from you — whether you’re a customer, partner, or curious about TicTask.
        </Typography>

        <Box
          bgcolor={'var(--foreground)'}
          color={'var(--background)'}
          component="form"
          maxWidth={500}
          mx="auto"
          display="flex"
          flexDirection="column"
          borderRadius={{ xs: 2, md: 3, xl: 4}}
          gap={2}
          px={2}
          py={2}
        >
          <TextField
            variant="outlined"
            placeholder="Your Name"
            fullWidth
            sx={{ borderRadius: 2 }}
          />
          <TextField
            variant="outlined"
            placeholder="Your Email"
            type="email"
            fullWidth
            sx={{ borderRadius: 2 }}
          />
          <TextField
            variant="outlined"
            placeholder="Your Message"
            fullWidth
            multiline
            rows={5}
            sx={{ borderRadius: 2 }}
          />

          <Stack alignItems="center" mt={3}>
            <button className={styles.btnPrimary}>Send Message</button>
          </Stack>
        </Box>
      </Box>
    </section>
  );
};