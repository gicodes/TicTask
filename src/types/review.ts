export type Review = {
  id: number;
  title: string;
  slug: string;
  content: string;
  rating?: number | null;
  status: string;
  createdAt: string;
  author?: { id: number; name: string; photo?: string | null } | null;
};