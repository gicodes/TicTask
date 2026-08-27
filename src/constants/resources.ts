export const RESOURCES = [
  {
    title: "Getting Started",
    desc: "From sign-up to your first ticket in under 10 minutes",
    link: "/resources/docs",
    image: "https://images.unsplash.com/photo-1471958680802-1345a694ba6d?q=80&w=1566&auto=format&fit=crop",
  },
  {
    title: "Templates",
    desc: "Ready-made boards and checklists so you never start from zero",
    link: "/resources/templates",
    image: "https://images.unsplash.com/photo-1695634281181-b2357af34c61?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Changelog",
    desc: "What’s new, what’s fixed, and what’s next",
    link: "/resources/changelog",
    image: "https://images.unsplash.com/photo-1653130892179-98a1a5a19f32?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Blog",
    desc: "Product thinking, team workflows, and behind-the-scenes notes",
    link: "/resources/blog",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    title: "FAQ",
    desc: "Straight answers to the questions people actually ask",
    link: "/resources/faq",
    image: "https://images.unsplash.com/photo-1652077859695-de2851a95620?q=80&w=880&auto=format&fit=crop",
  },
  {
    title: "Developers",
    desc: "Open-source files, contribution guide, and API notes",
    link: "/resources/docs/dev",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
];

export const TEMPLATES = [
  {
    title: "Team Task Board",
    desc: "Kanban-ready workspace for small teams. Assign, move, and close tickets without extra setup.",
    file: "/resources/templates/team-task-board.json",
    tags: ["Project", "Team", "Kanban"],
  },
  {
    title: "Onboarding Checklist",
    desc: "Step-by-step checklist for new members. Assign owners and track completion in one place.",
    file: "/resources/templates/onboarding-checklist.json",
    tags: ["HR", "Checklist", "Onboarding"],
  },
];

export const CHANGELOG = [
  {
    version: "v1.3.2",
    date: "2025-10-21",
    highlights: [
      "Workspace roles & granular permission controls",
      "Smoother task-assignment UX across Personal and Team views",
      "Fixed incorrect timezone rendering in dashboard charts",
    ],
  },
  {
    version: "v1.3.1",
    date: "2025-09-10",
    highlights: [
      "Templates system launched under Resources",
      "Email verification links now expire after 24 hours",
    ],
  },
];

export const BLOG_POSTS = [
  {
    title: "TicTask Launch Recap",
    slug: "launch-recap",
    date: "2025-08-01",
    excerpt: "How we went from idea to first users — and what we learned shipping in public.",
    image: "/blog/launch-recap.jpg",
  },
  {
    title: "How to Build Productive Teams",
    slug: "productive-teams",
    date: "2025-09-15",
    excerpt: "Practical ways to keep tickets moving without turning every decision into a meeting.",
    image: "/blog/productive-teams.jpg",
  },
];

export const FAQs = [
  {
    q: "Is there a free plan?",
    a: "Yes. Every personal account is freemium by default. You get full access to Tickets, Task Manager, Settings, and basic notifications. Organisation accounts get a 14-day free trial of Standard — no credit card required.",
  },
  {
    q: "What’s the difference between Personal and Organisation accounts?",
    a: "Personal accounts are for individuals. You can create tickets, manage your own work, and join teams when invited. Organisation accounts unlock the Teams page, let you create workspaces, and (on paid plans) invite free guests. Creating a team is reserved for organisation accounts.",
  },
  {
    q: "Can I collaborate without paying?",
    a: "Yes — if someone with a paid organisation plan invites you as a guest. Your access is tied to their subscription. You can still use all free personal features on your own account.",
  },
  {
    q: "What do the paid plans unlock?",
    a: "Standard, Pro and Enterprise unlock the gated features: push notifications, advanced ticket controls, self-service tools, full Teams collaboration, guest invites, and higher limits. The higher the plan, the more guests and workspaces you can run.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use enterprise-grade encryption in transit and at rest, role-based access control, and regular security reviews. Only people you explicitly grant access can see your workspaces.",
  },
  {
    q: "Which platforms and integrations do you support?",
    a: "Tictask works in the browser today. Native apps and deeper integrations (Slack, calendar providers, etc.) are on the roadmap. You can already export and import data via our templates and JSON formats.",
  },
  {
    q: "Why do I not just pay for other popular tools",
    a: "Simple — Because popular does not guarantee efficiency. In terms of cost, you're guaranteed to spend way less per organization seat in Tictask.",
  },
];