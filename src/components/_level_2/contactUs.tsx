'use client'

import { useState } from "react";
import { apiPost } from "@/lib/axios";
import { Button } from "@/assets/buttons";
import { ContactUs } from "@/types/axios";
import { useAlert } from "@/providers/alert";
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Stack, 
} from "@mui/material";

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
      <Grid py={12}>
        <Box>
          <Stack 
            p={2}
            gap={5} 
            mx={'auto'}
            maxWidth={750}  
          >
            <Stack gap={1} textAlign={'center'}>
              <Typography variant="h1" fontSize={{ xs: 66, sm: 96 }}>
                Get in Touch
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                Are you a user? Team owner? or simply curious about TicTask? <br/> You can reach out to us
              </Typography>
            </Stack>

            <Box
              component="form"
              flexDirection="column"
              bgcolor={'background.paper'}
              borderRadius={3}
              display="flex"
              gap={2}
              p={2}
              onSubmit={handleSubmit}
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
          </Stack>
        </Box>
      </Grid>
    </section>
  );
};
