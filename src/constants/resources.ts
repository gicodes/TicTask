export const TEMPLATES = [
  {
    title: "Team Task Board",
    desc: "A pre-built Kanban setup for small teams.",
    file: "/templates/team-task-board.json",
    tags: ["Project", "Team"],
  },
  {
    title: "Onboarding Checklist",
    desc: "Track and assign onboarding steps for new members.",
    file: "/templates/onboarding-checklist.json",
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
    q: "Is there a free plan?",
    a: "Yes, we offer a 14-day free trial. No credit card required.",
  },
  {
    q: "Can I integrate with Slack or Email?",
    a: "Absolutely, notifications can be routed via Email, SMS, and Slack.",
  },
  {
    q: "Is my data secure?",
    a: "We use enterprise-grade encryption and role-based access.",
  },
  {
    q: "What platforms do you support?",
    a: "We support Trello, ClickUp, Asana, Jira, and Notion.",
  },
  {
    q: "How can I get support?",
    a: "You can reach out to us via the contact form or email",
  },
];
