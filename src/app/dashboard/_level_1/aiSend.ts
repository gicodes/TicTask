import { api } from "@/lib/apiFetch";
import { getSession } from "next-auth/react";
import { AIRefinedResponse, HandleSendProps, Message } from "@/types/ai";

export const handleSendAI = async ({ setMessages, setInput, input }: HandleSendProps) => {
  const session = await getSession();
  const user = session?.user;
  if (!user || !input.trim()) return;

  const newMessage: Message = { role: 'user', content: input };
  setMessages((prev) => [...prev, newMessage]);
  setInput('');

  try {
    const body = { // Newer features will include other body types such as rewrite, summarize, classify and triage
      type: "reply", 
      userId: user?.id,
      userName: user?.name,
      payload: newMessage 
    }

    const res = await api<AIRefinedResponse>("/v1/ai/generate", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res) return;

    setMessages((prev: Message[]) => [
      ...prev,
      { 
        role: 'assistant',
        content: res?.text ?? "No response from ➕ AI" 
      }
    ]);
  } catch (err) {
    console.error(err);

    setMessages((prev: Message[]) => [
      ...prev,
      { role: 'assistant', content: "⚠️ Error connecting to ➕ AI ..", idle: true }
    ]);
  }
}
