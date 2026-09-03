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
    a: "Yes. Every personal account is freemium by default. This means you get limited access to core system features i.e. tickets, notifications and free trial. Organisation accounts with expired or no subscription plan can also enjoy basic free access.",
  },
  {
    q: "What is the use of Calendar",
    a: "The Tictask Calendar Tool helps you view tickets with a time line. This can be tickets with a set due date, task start time or meeting date. It is usually tied to tickets in a particular workspace."
  },
  {
    q: "What’s the difference between personal and organisation accounts?",
    a: "Personal accounts are for individuals, and lets you create tickets, manage calendar events, and join teams when invited. Organisation accounts have a Teams page — to create, manage and invite members (on free or paid accounts) to the team. Creating a team is reserved for organisation accounts with a paid plan, but managing workflow can be personal or business.",
  },
  {
    q: "Can I collaborate without paying?",
    a: "Yes, when (paid) organisation accounts invite you as a guest. Your access is tied to their subscription, without losing or complicating your personal workspace.",
  },
  {
    q: "What do the paid plans unlock?",
    a: "Standard, pro and enterprise unlock gated features such as push notifications, advanced ticket controls, self-service tools, full Teams collaboration, guest invites, and higher limits. The higher the plan, the more guests and workspaces you can run.",
  },
  {
    q: "Is my data secure?",
    a: "Yes — We use standard encryption in transit and at rest, role-based access control, and regular security reviews. Only people you explicitly grant access can see your workspaces, and we never ask you for passwords or security tokens.",
  },
  {
    q: "Can we download your app?",
    a: "Tictask.org is not available on app store yet. However, from your browser, you can add to home screen to feature as an app.",
  },
  {
    q: "How do I know what's happening in a team I join",
    a: "Personal notification preference, team setup and role. By default, (shared) ticket updates are sent via email and in-app notifications — except you mute notifications 🔕 or opt out. Paid accounts get an extra channel with Push notifications.",
  },
  {
    q: "Which platforms and integrations do you support?",
    a: "Tictask works in the browser today. Native apps and deeper integrations (Slack, calendar providers, etc.) are on the roadmap. You can already export and import data via our templates and JSON formats.",
  },
  {
    q: "Do I pay for the users I bring to the team?",
    a: "Team Owner? Yes. Only one account pays for all the users in a team. This must be an organisation account and by default, the Team Owner. Both owner and other members in that team can invite users until the team is full."
  },
  {
    q: "How many teams can an organisation have",
    a: "An organisation can have as many teams. If an organisation has one close/ thin team, we suggest going for Standard Plan — it lets you create 1 team, 6 members max. When it needs more teams, Pro lets it create up to 3 teams, 6 members each. More? Organisation Plan takes 6+ teams with custom setup for members in the team."
  },
  {
    q: "Where can we find contents to guide us better?",
    a: "Go to Resources. You can find specifics in docs, however, every content on Tictask is educative when you pay attention.",
  },
];