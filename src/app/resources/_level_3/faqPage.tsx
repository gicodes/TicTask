"use client";

import { ResourceHero } from ".";
import { FAQRes } from "@/types/axios";
import { Button } from "@/assets/buttons";
import { useAuth } from "@/providers/auth";
import { apiGet, apiPost } from "@/lib/axios";
import { useAlert } from "@/providers/alert";
import { FAQProps } from "@/types/resources";
import FAQ from "@/components/_landing/faq";
import React, { useEffect, useState } from "react";
import DeleteButton from "../_level_1/deleteResource";
import { Box, Typography, TextField, Card } from "@mui/material";

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

  useEffect(() => { 
    load(); 
  }, []);

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
      if (err && typeof err==="object" && "message" in err) 
        showAlert(`${err.message}` || "Failed to submit answer", "error");
    }
  };

  const ASKED_AND_ANSWERED = faqs.filter(f => f.answer);
  const ASKED_NOT_ANSWERED = faqs.filter(f => !f.answer);

  return (
    <Box>
      <ResourceHero title="Frequently Asked Questions" subtitle="Find answers to common questions. Ask your own questions if you don't find what you're looking for. Be a part of the contributing community with helpful answers" />
      
      <Box py={8} maxWidth={1200} mx="auto">
        <Typography variant="h5" textAlign="center">
          Common Questions and Helpful Answers
        </Typography>
        <FAQ faqPage={true} />
      </Box>

      <Box py={8} bgcolor={'white'} mx="auto">
        <Card sx={{ p: 2, maxWidth: 800, mx: "auto", boxShadow: 0 }}>
          <Typography variant="h6">Ask a question</Typography>
          
          <form onSubmit={submitQuestion}>
            <TextField
              label="Your Question"
              value={question}
              sx={{ my: 2 }}
              required
              fullWidth
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit" tone="action"> Submit Question</Button>
          </form>
        </Card>
      </Box>

      <Box maxWidth={1200} mx="auto" px={2} py={8}>
        {ASKED_AND_ANSWERED.length > 0 && (
          <Box mb={5}>
            <Typography variant="h6"> Answered Questions</Typography>
            
            {ASKED_AND_ANSWERED.map(f => (
              <Box 
                key={f.id} 
                my={4} 
                p={2} 
                borderRadius={2} 
                border="1px solid var(--disabled)"
              >
                <Typography fontWeight={700}>{f.question}</Typography>
                <Typography color="text.secondary" mb={1}>{f.answer}</Typography>
                
                {isAdmin && (
                  <Box display="flex" justifyContent="flex-end">
                    <DeleteButton 
                      endpoint={`/resources/faq/${f.id}`} 
                      id={f.id} 
                      onDeleted={load} 
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        {ASKED_NOT_ANSWERED.length > 0 && isAuthenticated && (
          <Box>
            <Typography variant="h6">Unanswered Questions</Typography>
            
            { ASKED_NOT_ANSWERED.map(f => (
              <Box 
                key={f.id} 
                my={4} 
                p={2} 
                borderRadius={2} 
                border="1px solid var(--disabled)"
              >
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
                    tone="action" 
                    variant="contained"
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
