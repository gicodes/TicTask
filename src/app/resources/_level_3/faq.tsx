"use client";

import { FAQRes } from "@/types/axios";
import { apiGet, apiPost } from "@/lib/api";
import { FAQProps } from "@/types/resources";
import { useAlert } from "@/providers/alert";
import React, { useEffect, useState } from "react";
import DeleteButton from "../_level_1/deleteResource";
import { ResourceHero } from "../_level_3/resourcesPage";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function FaqPage() {
  const { showAlert } = useAlert();
  const [faqs, setFaqs] = useState<FAQProps[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const load = async () => {
    const res: FAQRes = await apiGet("/resources/faq");
    setFaqs(res.faq);
  };
  
  useEffect(()=>{ load(); }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { question, answer }

    try {
      await apiPost("/resources/faq", payload);
      setQuestion(""); setAnswer("");
      load();
    } catch (err) {
      if (err && typeof err==="object" && "message" in err) showAlert(`${err?.message}`, "error");
    }
  };

  return (
    <Box>
      <ResourceHero title="FAQ" subtitle="Common questions and community answers" />
      <Box maxWidth={900} mx="auto" px={2} py={8}>
        <Box mb={4}>
          <Typography variant="h6">Ask / Add a question</Typography>
          <form onSubmit={onSubmit}>
            <TextField label="Question" fullWidth value={question} onChange={(e)=>setQuestion(e.target.value)} sx={{ mb:2 }} required />
            <TextField label="Answer" fullWidth multiline minRows={4} value={answer} onChange={(e)=>setAnswer(e.target.value)} sx={{ mb:2 }} required />
            <Button type="submit" variant="contained">Submit</Button>
          </form>
        </Box>

        <Box>
          <Typography variant="h6" mb={2}>All FAQs</Typography>
          {faqs.map(f => (
            <Box key={f.id} mb={2} p={2} borderRadius={2} border="1px solid rgba(0,0,0,0.04)">
              <Typography fontWeight={700}>{f.question}</Typography>
              <Typography color="text.secondary" mb={1}>{f.answer}</Typography>
              <Box display="flex" justifyContent="flex-end">
                <DeleteButton endpoint="/api/resources/faq" id={f.id} onDeleted={load} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
