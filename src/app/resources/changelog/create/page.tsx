"use client";

import { useAlert } from "@/providers/alert";
import styles from "@/app/page.module.css";
import React, { useState } from "react";
import { apiPost } from "@/lib/api";

import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { ResourceHero } from "../../_level_3";
import { Box, TextField, Button, Typography, Card } from "@mui/material";

export default function CreateChangelog() {
  const { showAlert } = useAlert();
  const { user, isAuthenticated } = useAuth();
  const [version, setVersion] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [highlights, setHighlights] = useState<string>(""); 
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiPost("/resources/changelog", );
      router.push("/resources/changelog");
    } catch (err) {
      if (err && typeof err==="object" && "message" in err) showAlert(`${err?.message}`, "error");
    }
  };

  if (!user || !isAuthenticated) return <Box py={10} textAlign={'center'}>You must be signed in!</Box>
  if (user.role!=="ADMIN") return <Box py={10} color='var(--danger)' textAlign={'center'}>Permission Denied! Please Contact Administrator</Box>

  return (
    <Box>
      <ResourceHero title="Publish changelog" />
      <Card 
        sx={{
          maxWidth: 800,
          mx: 'auto',
          px: 2,
          py: 4,
          mt: 10
        }}
      >
        <form onSubmit={onSubmit}>
          <Typography variant="h6" mb={2}>New release note</Typography>
          <TextField label="Version (e.g. v1.4.0)" fullWidth value={version} onChange={(e)=>setVersion(e.target.value)} sx={{ mb:2 }} required />
          <TextField label="Date" type="date" fullWidth value={date} onChange={(e)=>setDate(e.target.value)} sx={{ mb:2 }} required />
          <TextField label="Highlights (one per line)" fullWidth multiline minRows={6} value={highlights} onChange={(e)=>setHighlights(e.target.value)} sx={{ mb:2 }} />
          <Box display="flex" gap={2}>
            <Button 
              variant="contained" 
              type="submit"
              className={styles.btnAction}
            >
              Publish
            </Button>
            <Button 
              variant="outlined" 
              className={styles.btnWarm}
              onClick={()=>{ setVersion(''); setHighlights(''); }}
            >
              Clear
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
