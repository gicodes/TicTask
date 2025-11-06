export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface HandleSendProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}

export const handleSendAI = ({ setMessages, setInput, input }: HandleSendProps) => {
  if (!input.trim()) return;

  const newMessage: Message = { role: 'user', content: input };
  setMessages((prev) => [...prev, newMessage]);
  setInput('');

  setTimeout(() => {
    const aiMessage: Message = {
      role: 'assistant',
      content: '🤖 This is a mock AI response — live integration coming soon!',
    };
    setMessages((prev) => [...prev, aiMessage]);
  }, 800);
};