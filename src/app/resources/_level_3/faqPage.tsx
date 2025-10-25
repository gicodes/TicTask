"use client";

import { FAQRes } from "@/types/axios";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { apiGet, apiPost } from "@/lib/api";
import { useAlert } from "@/providers/alert";
import { FAQProps } from "@/types/resources";
import { ResourceHero } from "./resourcesPage";
import React, { useEffect, useState } from "react";
import DeleteButton from "../_level_1/deleteResource";
import { Box, Typography, TextField, Button, Card } from "@mui/material";

export default function FaqPage() {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const [faqs, setFaqs] = useState<FAQProps[]>([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const load = async () => {
    const res: FAQRes = await apiGet("/resources/faq");
    setFaqs(res.faq || []);
  };

  useEffect(() => { load(); }, []);

  const submitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiPost("/resources/faq", { question, user });
      showAlert("Question submitted successfully", "success");
      setQuestion("");
      load();
    } catch (err) {
      if (err && typeof err==="object" && "message" in err) showAlert(`${err.message}` || "Failed to submit question", "error");
    }
  };

  const submitAnswer = async (e: React.FormEvent, faqId: number) => {
    e.preventDefault();
    try {
      await apiPost("/resources/faq", { faqId, answer: answers[faqId], user });
      showAlert("Answer submitted", "success");
      setAnswers(prev => ({ ...prev, [faqId]: "" }));
      load();
    } catch (err) {
      if (err && typeof err==="object" && "message" in err) showAlert(`${err.message}` || "Failed to submit answer", "error");
    }
  };

  const ASKED_AND_ANSWERED = faqs.filter(f => f.answer);
  const ASKED_NOT_ANSWERED = faqs.filter(f => !f.answer);

  return (
    <Box>
      <ResourceHero title="FAQ" subtitle="Common questions and community answers" />
      <Box maxWidth={1000} mx="auto" px={2} py={8}>

        {ASKED_AND_ANSWERED.length > 0 && (
          <Box mb={5}>
            <Typography variant="h6" mb={2}>Answered Questions</Typography>
            {ASKED_AND_ANSWERED.map(f => (
              <Box key={f.id} mb={2} p={2} borderRadius={2} border="1px solid rgba(0,0,0,0.04)">
                <Typography fontWeight={700}>{f.question}</Typography>
                <Typography color="text.secondary" mb={1}>{f.answer}</Typography>
                {isAdmin && (
                  <Box display="flex" justifyContent="flex-end">
                    <DeleteButton endpoint={`/resources/faq/${f.id}`} id={f.id} onDeleted={load} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        <Card sx={{ py: 3, px: 2, maxWidth: 669, mx: "auto", mb: 6 }}>
          <Typography variant="h6">Ask a question</Typography>
          <form onSubmit={submitQuestion}>
            <TextField
              label="Your Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              sx={{ my: 2 }}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className={styles.btnPrimary}
            >
              Submit
            </Button>
          </form>
        </Card>

        {ASKED_NOT_ANSWERED.length > 0 && isAuthenticated && (
          <Box>
            <Typography variant="h6" mb={2}>Unanswered Questions</Typography>
            {ASKED_NOT_ANSWERED.map(f => (
              <Box key={f.id} mb={2} p={2} borderRadius={2} border="1px solid rgba(0,0,0,0.04)">
                <Typography fontWeight={700}>{f.question}</Typography>
                {isAdmin && (
                  <Box display="flex" justifyContent="flex-end">
                    <DeleteButton endpoint={`/resources/faq/${f.id}`} id={f.id} onDeleted={load} />
                  </Box>
                )}
                <form onSubmit={(e) => submitAnswer(e, f.id)}>
                  <TextField
                    label="Your Answer"
                    value={answers[f.id] || ""}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [f.id]: e.target.value }))}
                    sx={{ my: 2 }}
                    required
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className={styles.btnPrimary}
                  >
                    Submit Answer
                  </Button>
                </form>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}