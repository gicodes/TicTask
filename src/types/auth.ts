export interface LoginTemplateProps {
  email: string;
  password: string;
  error?: string;
  submitting?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}