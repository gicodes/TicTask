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

export type Testimonial = {
  id: number;
  slug: string;
  rating?: number | null;
  title: string;
  author?: { id: number; name: string; photo?: string | null } | null;
};


export const AVATAR_BGS = [
  "var(--bg-clear)",
  "var(--bg-frost)",
  "var(--bg-hail)",
  "var(--bg-spring)",
  "var(--bg-haze)",
  "var(--bg-summer)",
];