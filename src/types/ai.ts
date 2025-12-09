
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  idle?: boolean;
}

export interface HandleSendProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}

export interface AIChatCompletionResponse {
  choices: {
    message: {
      role: "assistant" | "user" | "system";
      content: string;
    };
  }[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

export interface AIRefinedResponse {
  text: string;
  usage: {
    queue_time: number | unknown;
    prompt_tokens: number;
    prompt_time: number | unknown;
    completion_tokens: number;
    completion_time: number | unknown;
  }
}