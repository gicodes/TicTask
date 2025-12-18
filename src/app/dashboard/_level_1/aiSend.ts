import { api } from "@/lib/apiFetch";
import { getSession } from "next-auth/react";
import { AIRefinedResponse, HandleSendProps, AiMessage } from "@/types/ai";

export const handleSendAI = async ({ 
  messages,
  setMessages, 
  setInput, 
  input, 
  aiName = "TicTask",
  type = "reply"
}: HandleSendProps & { aiName?: string; type?: string }) => {
  
  const session = await getSession();
  const user = session?.user;

  if (!user || !input.trim()) return;

  const newMessage: AiMessage = { 
    role: "user",
    content: input,
  };

  setMessages((prev) => [...prev, newMessage]);
  setInput("");

  try {
    const history = messages
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    const body = {
      history: [...history, newMessage],
      type,             
      aiName,                                
      userId: user.id,  
      payload: newMessage,
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
