"use client";

import { useState } from "react";
import { apiPost } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { Box, Stack, Card, Typography } from "@mui/material";
import { useAlert } from "@/providers/alert";

export default function CareerRegistrationPage() {
  const params = useSearchParams();
  const context = params.get("context");
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    message: "",
    cv: null,
    roles: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success?: boolean; message?: string }>({});
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse({});

    try {
      const payload = { ...form, collab: context === "collab", partner: true };
      await apiPost("/company/careers/register", payload);
      setResponse({ success: true, message: "Application submitted successfully!" });
      showAlert("Application Submitted. Kindly Check your email inbox to verify and continue your application")
      setForm({ name: "", address: "", email: "", message: "", roles: [], cv: null });
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    if (response) return // placeholder against ts compiler on unused variables
  }

  return (
    <Box
      component="section"
      py={12}
      px={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 5,
          borderRadius: "16px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography>Careers are unavailable right now. Try again later! </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
