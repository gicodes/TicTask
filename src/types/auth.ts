import { Dispatch, SetStateAction } from "react";

export interface LoginTemplateProps {
  email: string;
  password: string;
  error?: string;
  submitting?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
}

export interface RememberMeProps {
  remember: boolean;
  setRemember: (value: boolean) => void;
  email?: string;
  password?: string
}