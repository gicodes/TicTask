export const RESOURCES = [
  {
    title: "Getting Started",
    desc: "Your first 10 minutes with TicTask",
    link: "/resources/docs",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // onboarding / desk
  },
  {
    title: "Templates",
    desc: "Jumpstart workflows with ready-made templates",
    link: "/resources/templates",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80", // documents / planning
  },
  {
    title: "Updates",
    desc: "See what’s new and improved",
    link: "/resources/changelog",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", // dashboard / analytics
  },
  {
    title: "Blog",
    desc: "Insights and stories from the TicTask team",
    link: "/resources/blog",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80", // writing / laptop
  },
  {
    title: "FAQ",
    desc: "Find out more from frequently asked questions",
    link: "/resources/faq",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", // questions / notes
  },
  {
    title: "Developer",
    desc: "Read and contribute to our open-source files",
    link: "/resources/docs/dev",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", // code / terminal
  },
];

export const TEMPLATES = [
  {
    title: "Team Task Board",
    desc: "A pre-built Kanban setup for small teams.",
    file: "/resources/templates/team-task-board.json",
    tags: ["Project", "Team"],
  },
  {
    title: "Onboarding Checklist",
    desc: "Track and assign onboarding steps for new members.",
    file: "/resources/templates/onboarding-checklist.json",
    tags: ["HR", "Checklist"],
  },
];

export const CHANGELOG = [
  {
    version: "v1.3.2",
    date: "2025-10-21",
    highlights: [
      "Added workspace roles & permission controls.",
      "Improved task assignment UX.",
      "Bug fix: incorrect timezone in dashboard charts.",
    ],
  },
  {
    version: "v1.3.1",
    date: "2025-09-10",
    highlights: [
      "Introduced templates system under Resources.",
      "Email verification now expires in 24h.",
    ],
  },
];

export const BLOG_POSTS = [{
    title: "TicTask Launch Recap",
    slug: "launch-recap",
    date: "2025-08-01",
    excerpt: "A behind-the-scenes look at how TicTask started...",
    image: "/blog/launch-recap.jpg",
  },
  {
    title: "How To Build Productive Teams",
    slug: "productive-teams",
    date: "2025-09-15",
    excerpt: "Practical tips to align teams and tasks efficiently...",
    image: "/blog/productive-teams.jpg",
  },
];

export const FAQs = [
  {
    q: "Is there a free plan for all users?",
    a: "We offer freemium for all individual accounts, and a 14-day free trial on Standard plan. No credit card required.",
  },
  {
    q: "How can I join TicTask as a moderator",
    a: "To become a moderator, agent or partner. Go to partner registration page, submit your info and wait for our KYC verification",
  },
  {
    q: "Is my data secure?",
    a: "Yes, absolutely. We use enterprise-grade encryption and role-based access.",
  },
  {
    q: "What platforms do you support?",
    a: "Future releases would include integrations with Slack, Trello and Notion.",
  },
  {
    q: "How can I get customer support?",
    a: "You can reach out to us via the contact us page (see bottom of home page)",
  },
];