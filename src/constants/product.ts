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
    desc: "For individuals testing workflow or personal use",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "1 workspace",
      "Up to 10 tickets",
      "Kanban & Calendar playgrounds",
      "limited AI assistance",
      "No metrics",
      "No Invoice linking",
      "No team roles or ticket assignment",
    ],
    buttonLabel: "Get Started",
    highlight: false,
  },
  {

    name: "Standard",
    plan: "STANDARD",
    desc: "For business personel & small teams (2-5 members)",
    priceMonthly: 6,
    priceYearly: 60,
    features: [
      "Team workspace",
      "Up to 100 tickets",
      "Up to 2 teams, 5 members, 360 team tickets",
      "Standard AI assistance",
      "Analytics & metrics",
      "Invoice linking",
      "Push notifications",
      "Community support",
    ],
    buttonLabel: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Pro",
    plan: "PRO",
    desc: "For scaling teams & SMEs with a workflow",
    priceMonthly: 12,
    priceYearly: 120,
    features: [
      "Everything on Standard",
      "Unlimited tickets",
      "Up to 5 teams, 10 members, Unlimited team tickets",
      "Advanced AI assistance",
      "Analytics export enabled",
      "Integrations (Slack, GitHub, Drive)",
      "Custom Notifications",
      "Priority support",
    ],
    buttonLabel: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    plan: "ENTERPRISE",
    desc: "For large organizations with custom workflows",
    priceMonthly: 25,
    priceYearly: 250,
    features: [
      "Everything on Standard & Pro",
      "Custom pricing starting from $25",
      "Up to 12 team workspaces, 12 members maximum",
      "Timeline & Gantt view",
      "Roles & permissions",
      "Advanced workflow automation",
      "Single Sign-On (SSO)",
      "Audit logs & compliance",
    ],
    buttonLabel: "Contact Sales",
    highlight: false,
  },
];