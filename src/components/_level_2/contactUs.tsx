'use client'

import { useState } from "react";
import { apiPost } from "@/lib/axios";
import { Button } from "@/assets/buttons";
import { ContactUs } from "@/types/axios";
import { useAlert } from "@/providers/alert";
import { Box, Typography, TextField, Stack, Divider, Card } from "@mui/material";

export const ContactUsSection = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    email: '',
    name: '',
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: ContactUs = {
        message: formData.message,
        email: formData.email,
        name: formData.name,
      };

      await apiPost(
        "/admin/contact-us",
        payload
      );

      showAlert("Thank you for reaching out to TicTask Support Center", "success");
      setFormData({
        message: '',
        email: '',
        name: ''
      });
    } catch {
      showAlert("Failed to deliver message. Try again later...", 'error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-us">
      <Divider sx={{ border: '2px solid var(--dull-gray)'}} />
      <Box py={12} px={1} textAlign="center">
        <Typography variant="h4" fontWeight={700} mb={2}>
          Get in Touch
        </Typography>
        <Typography variant="body1" mb={6} sx={{ opacity: 0.85 }}>
          We&apos;d love to hear from you — whether you&apos;re a customer, partner, or simply curious about TicTask.
        </Typography>

        <Card sx={{ p: 2, maxWidth: 500, mx: 'auto'}}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              name="name"
              variant="outlined"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={{ borderRadius: 2 }}
            />
            <TextField
              name="email"
              variant="outlined"
              placeholder="Your Email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              fullWidth
              sx={{ borderRadius: 2 }}
            />
            <TextField
              name="message"
              variant="outlined"
              placeholder="Your Message"
              onChange={handleChange}
              value={formData.message}
              fullWidth
              multiline
              rows={5}
              sx={{ borderRadius: 2 }}
            />

            <Stack alignItems="center" mt={3}>
              <Button 
                type="submit"
                disabled={loading} 
              >
                {loading ? "Sending Message..." : "Send Message"}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </section>
  );
};
