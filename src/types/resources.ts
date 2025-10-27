export interface BlogCardProps {
  id: string | number;
  title: string;
  slug: string;
  createdAt: string;
  excerpt: string;
  image?: string;
}

export interface ChangeLogProps {
  id: string | number;
  version: string;
  date: Date | string;
  createdAt: Date | string;
  highlights: string[];
}

export interface FAQProps {
  id: number;
  question: string;
  answer?: string;
}