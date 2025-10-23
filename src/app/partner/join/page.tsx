"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import styles from "@/app/page.module.css";
import { Box, Stack, TextField, Typography } from "@mui/material";

export default function PartnerJoinPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success?: boolean; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse({});

    try {
      await apiPost("/partner/join", form);
      setResponse({ success: true, message: "Application submitted successfully!" });
      setForm({ name: "", company: "", email: "", message: "" });
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      py={12}
      px={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 5,
          borderRadius: "16px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
          color: 'var(--background)',
          background: "var(--foreground)",
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight={700}>
            Join the TicTask Partner Program
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            Let’s collaborate to bring better workflows to teams everywhere.
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Company Name"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Work Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Message or Proposal"
            name="message"
            multiline
            rows={4}
            value={form.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          {response.message && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                fontWeight: 500,
                opacity: response.success ? 0.9 : 0.7,
              }}
            >
              {response.message}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
