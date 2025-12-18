export interface AiMessage {
  role: 'user' | 'assistant';
  content: string;
  idle?: boolean;
  aiName?: string;
}

export interface HandleSendProps {
  messages: AiMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AiMessage[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  aiName: string;
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

export interface AICommsBody {
  type: string;
  aiName: string;
  userId: number;
  payload: AiMessage & {
    ticket?: any;
    history?: AiMessage[];
  };
}