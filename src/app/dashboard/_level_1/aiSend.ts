import { api } from "@/lib/apiFetch";
import { AIRefinedResponse, HandleSendProps, Message } from "@/types/ai";
import { getSession } from "next-auth/react";

export const handleSendAI = async ({ 
  setMessages, 
  setInput, 
  input, 
  aiName = "TicTask",
  type = "reply"
}: HandleSendProps & { aiName?: string; type?: string }) => {

  const session = await getSession();
  const user = session?.user;
  if (!user || !input.trim()) return;

  const newMessage: Message = { 
    role: "user",
    content: input,
  };

  setMessages((prev) => [...prev, newMessage]);
  setInput("");

  try {
    const body = {
      type, // New Features will include other prompt types such as rewrite, summarize, classify and triage                          
      aiName,                                
      userId: user.id,
      humanName: user.name?.split(" ")[0],   
      payload: newMessage
    };

    const res = await api<AIRefinedResponse>("/v1/ai/generate", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        aiName,
        content: res.text ?? "No response from AI.",
      },
    ]);
  } catch (err) {
    console.error(err);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        aiName,
        content: `⚠️ Error connecting to ${aiName}.`,
        idle: true,
      },
    ]);
  }
};