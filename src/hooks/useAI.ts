import { useState, useEffect } from "react";
import { AiMessage } from "@/types/ai";

const MAX_HISTORY = 8;

export function useAiChat(aiName: string, greeting: AiMessage) {
  const [messages, setMessages] = useState<AiMessage[]>([]);

  useEffect(() => {
    const key = `ai_chat_${aiName}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        const parsed: AiMessage[] = JSON.parse(stored);
        setMessages(parsed.length ? parsed : [greeting]);
        return;
      } catch {}
    }

    setMessages([greeting]);
  }, [aiName]);

  useEffect(() => {
    if (!messages.length) return;

    const key = `ai_chat_${aiName}`;
    const trimmed = messages.slice(-MAX_HISTORY);

    localStorage.setItem(key, JSON.stringify(trimmed));
  }, [messages, aiName]);

  return {
    messages,
    setMessages,
  };
}

export function useAiMemory(conversationId: number) {
  const key = `ai_memory_${conversationId}`;

  const [memory, setMemory] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setMemory(JSON.parse(stored));
  }, [conversationId]);

  const addMessage = (msg: any) => {
    const updated = [...memory, msg];

    setMemory(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const clearMemory = () => {
    setMemory([]);
    localStorage.removeItem(key);
  };

  return {
    memory,
    addMessage,
    clearMemory,
  };
}