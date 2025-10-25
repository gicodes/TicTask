export interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image?: string;
}

export interface ChangeLogProps {
  id: string;
  version: string;
  date: Date | string;
  highlights: string[];
}

export interface FAQProps {
  id: string;
  question: string;
  answer: string;
}