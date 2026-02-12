import { User } from "./users";

export interface Partner {
  id: number;
  name: string;
  email: string;
  roles: string[];
  message: string;
  company: string;
  
  user: User;

  collab: boolean;
  approved: boolean;
  createdAt: Date | string;
}