export interface BlogCardProps {
  id: string | number;
  title: string;
  slug: string;
  createdAt: string;
  excerpt: string;
  coverImage?: string;
  content: string;
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

export type DocTextBlock = string | {
  type: 'link' | 'code' | 'callout' | 'list' | 'badge' | 'point' | 'paragraph' | 'strong' | 'italic' | 'highlight' | 'disabled' | 'outline' | 'inline',
  title?: string,
  content: string | string[],
  href?: string,
}
