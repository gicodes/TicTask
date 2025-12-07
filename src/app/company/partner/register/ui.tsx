"use client";

import { useState } from "react";
import { apiPost } from "@/lib/axios";
import { Button } from "@/assets/buttons";
import { ROLES } from "@/constants/partner";
import { useSearchParams } from "next/navigation";
import { Box, Stack, Card, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Chip, OutlinedInput, SelectChangeEvent } from "@mui/material";

export default function PartnerJoinPage() {
  const params = useSearchParams();
  const context = params.get("context");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    roles: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success?: boolean; message?: string }>({});

  const filteredRoles = context === "collab" ? ROLES.filter(r => r.collab): ROLES;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value }} = event;
    const selected = typeof value === "string" ? value.split(",") : value;

    if (selected.length <= 2) setForm({ ...form, roles: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse({});

    try {
      const payload = { ...form, collab: context === "collab", partner: true };
      await apiPost("/company/partner/register", payload);
      setResponse({ success: true, message: "Application submitted successfully!" });
      setForm({ name: "", company: "", email: "", message: "", roles: [] });
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
          <Typography variant="h4" fontWeight={700}>
            {context === "collab"
              ? "Join Open-Source Collaborators"
              : "Join the TicTask Partner Program"}
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            {context === "collab"
              ? "Contribute to TicTask’s open-source mission and make teamwork better for everyone."
              : "Let’s collaborate to bring better workflows to teams everywhere."}
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
            label="Company Name (Optional)"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Registered Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Select Role(s)</InputLabel>
            <Select
              labelId="role-select-label"
              multiple
              value={form.roles}
              onChange={handleRoleChange}
              input={<OutlinedInput label="Select Role(s)" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: 300,
                  },
                },
              }}
            >
              {filteredRoles.map((r) => (
                <MenuItem key={r.role} value={r.role}>
                  {r.role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Message or Proposal"
            name="message"
            multiline
            rows={4}
            value={form.message}
            onChange={handleChange}
          />

          <Button
            type="submit"
            tone="primary"
            loading={loading}
          >
            Submit Application
          </Button>

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
      </Card>
    </Box>
  );
}
