"use client";

import { apiPost } from "@/lib/api";
import styles from "@/app/page.module.css";
import React, { useState } from "react";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Typography, Card } from "@mui/material";
import { ResourceHero } from "@/app/resources/_level_3";

export default function CreateBlogPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user || !isAuthenticated) {
        alert("You must be signed in to create a blog post.");
        setLoading(false);
        return;
      }

      const payload = { title, excerpt, content }
      await apiPost("/resources/blog", payload);
      
      router.push("/resources/blog");
    } catch (err) {
      if (err && typeof err==="object" && "message" in err ) 
        alert("Client error: " + err?.message);
    } finally { setLoading(false); }
  };

  return (
    <Box>
      <ResourceHero title="Write a blog post" subtitle="Write insights and stories that educates and entertain the TicTask Community" />
      <Card 
        sx={{
          mt: 10,
          px: 2,
          py: 3,
          mx: 'auto',
          maxWidth: 800,
        }}
      >
        <form onSubmit={onSubmit}>
          <Typography 
            variant="h6" 
            fontWeight={501} 
            mb={2}
          >
            Create a post
          </Typography>

          <TextField 
            label="Title" 
            fullWidth
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            sx={{ mb:2, }} 
            required
          />
          <TextField 
            label="Excerpt" 
            fullWidth value={excerpt} 
            onChange={(e)=>setExcerpt(e.target.value)} 
            sx={{ mb:2 }} 
          />
          <TextField 
            label="Content (markdown allowed)" 
            fullWidth 
            multiline 
            minRows={8} 
            value={content} 
            onChange={(e)=>setContent(e.target.value)} 
            sx={{ mb:2 }} 
            required 
          />
          <Box display="flex" mt={2} gap={2}>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={loading}
              className={styles.btnAction}
            > 
              Publish
            </Button>
            <Button 
              variant="outlined" 
              onClick={()=>{ setTitle(''); setExcerpt(''); setContent(''); }}
              className={styles.btnWarm}
            >
              Clear
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
