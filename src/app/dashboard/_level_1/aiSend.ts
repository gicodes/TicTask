import { api } from "@/lib/apiFetch";

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface HandleSendProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}

export const handleSendAI = async ({ setMessages, setInput, input }: HandleSendProps) => {
  if (!input.trim()) return;

  const newMessage: Message = { role: 'user', content: input };
  setMessages((prev) => [...prev, newMessage]);
  setInput('');

  try {
    const body = { type: "reply", payload: newMessage }
    // Newer features will include other body types such as rewrite, summarize, classify and triage
    const res = await api<{ reply: string }>("/v1/ai/generate", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res) return;

    setMessages((prev: Message[]) => [
      ...prev,
      { 
        role: 'assistant',
        content: res?.reply ?? "No response from T AI" 
      }
    ]);
  } catch (err) {
    console.error(err);
    setMessages((prev: Message[]) => [
      ...prev,
      { role: 'assistant', content: "⚠️ Error connecting to T AI .." }
    ]);
  }
}
