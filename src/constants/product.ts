export const FEATURES = [
    {
      title: "Smart Tasks",
      desc: "Assign, prioritize, and track tasks that stay in sync with your team’s goals.",
    },
    {
      title: "Visual Workflows",
      desc: "Plan projects with Kanban boards, lists, or timelines—whatever suits your flow.",
    },
    {
      title: "Real-time Collaboration",
      desc: "Chat, comment, and co-edit tasks—all within context.",
    },
    {
      title: "Integrations",
      desc: "Connect Slack, Google Drive, Notion, and more—work in one place, not ten.",
    },
  ];

export const FEATURES_2 = [
  {
    title: "AI Task Briefs",
    desc: "Turn any idea or note into a structured task list instantly. TicTask’s AI understands your context and creates actionable next steps.",
  },
  {
    title: "Flow Timeline",
    desc: "Visualize your entire project in motion. From kickoff to delivery, track dependencies, milestones, and critical paths — all in one timeline.",
  },
  {
    title: "Command Bar",
    desc: "Fly through your work with keyboard-first navigation. Create, assign, and complete tasks in seconds without breaking focus.",
  },
  {
    title: "Slack & GitHub Sync",
    desc: "Stay in sync where you already work. Turn Slack messages into tasks or link commits directly to project progress.",
  },
  {
    title: "Smart Automations",
    desc: "Set rules once, and let TicTask handle the rest — from auto-assigning tasks to recurring sprints and follow-ups.",
  },
  {
    title: "Workload Dashboard",
    desc: "See how your team’s effort is distributed at a glance. Balance workloads, prevent burnout, and make data-driven decisions.",
  },
  {
    title: "Focus Mode",
    desc: "Block distractions and work in flow. A dedicated focus space helps you stay present with what truly matters — the task at hand.",
  },
  {
    title: "Pulse Check",
    desc: "Keep your team aligned and motivated with lightweight mood surveys. Track morale trends and act early when engagement dips.",
  },
];


export const PLANS = [
  {
    name: "Personal",
    plan: "FREE",
    desc: "For individuals and small projects getting started.",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Free workspace forever",
      "Up to 30 projects (tickets)",
      "Kanban & Calendar playgrounds",
      "AI assistance",
      "Basic analytics",
      "In-app real-time Notifications",
      "Community support",
    ],
    buttonLabel: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    plan: "PRO",
    desc: "For professionals and growing teams collaborating.",
    priceMonthly: 5,
    priceYearly: 50,
    features: [
      "Team workspace",
      "Unlimited projects (tickets)",
      "Single Sign-On (SSO)",
      "Advanced AI assistance",
      "Targeted analytics & metrics",
      "Push Notifications",
      "Priority support",
    ],
    buttonLabel: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    plan: "ENTERPRISE",
    desc: "For large organizations with custom workflows.",
    priceMonthly: 12,
    priceYearly: 120,
    features: [
      "Everything on Standard, Pro",
      "Unlimited everything",
      "Timeline & Gantt view",
      "Advanced task automation",
      "Custom roles & permissions",
      "AI workflow with node automation",
      "Integrations (Slack, GitHub, Drive)",
      "Audit logs & compliance",
    ],
    buttonLabel: "Contact Sales",
    highlight: false,
  },
];