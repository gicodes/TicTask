/*
  tictask-docs-constants-and-docs-updates.ts
  - Exports scalable constants for public docs and dev docs (easy to maintain)
  - Includes improved user-facing copy, more sections, and developer-facing content
  - Includes small React components / render helpers (MUI + Next) for a better docs UI

  NOTE: This file is a developer convenience and can be split into smaller files in your repo.
*/

// -------------------------
// TABLE OF CONTENTS (Public)
// -------------------------
export const TABLE_OF_CONTENTS = [
  "What is TicTask",
  "Key features & target audience",
  "Quick start — create account & onboarding",
  "Login & account management",
  "Quick tour — dashboard",
  "Roles & permissions",
  "Common flows — tasks, comments, attachments",
  "Notifications & activity feed",
  "Pricing & billing",
  "Security & privacy",
  "Troubleshooting & FAQ",
  "Contact & support"
]

// -------------------------
// TABLE OF CONTENTS (Developer)
// -------------------------
export const TABLE_OF_CONTENTS_DEV = [
  "Project overview & goals",
  "High-level architecture",
  "Repo layout / folder structure",
  "Tech stack & versions",
  "Environment & secrets",
  "Database design — ER summary + migrations",
  "Services & endpoints — API conventions",
  "Auth & security (detailed)",
  "Backend implementation: patterns & conventions",
  "Frontend structure: patterns, components & page status",
  "Testing strategy: unit / integration / e2e",
  "CI/CD & deployments",
  "Local dev & debugging (compose, sample data)",
  "Release notes & versioning policy",
  "Runbook: common ops & recovery steps",
  "Tasks & milestone checklist (issue-level)",
  "Onboarding checklist for new devs",
  "Appendix: OpenAPI / Postman / Useful commands"
]

// -------------------------
// PUBLIC DOCS CONTENT (scalable map)
// - Each key maps to an array of blocks. Each block is either a string (paragraph) or an object
//   describing special renderable elements (link, code, callout, list).
// - This design keeps the data-driven rendering flexible for a docs renderer component.
// -------------------------

export type DocTextBlock = string | {
  type: 'link' | 'code' | 'callout' | 'list' | 'strong' | 'badge',
  title?: string,
  content: string | string[],
  href?: string,
}

export const CONTENTS: Record<string, DocTextBlock[]> = {
  "What is TicTask": [
    "TicTask is a lightweight, collaborative task and ticketing platform built for fast, transparent teamwork. It helps individuals and teams capture work, assign ownership, track progress, and ship faster.",
    { type: 'callout', title: 'Core idea', content: 'Keep tasks simple, make ownership clear, and make progress visible.' }
  ],

  "Key features & target audience": [
    "TicTask focuses on a short list of high-value features: tasks & subtasks, assignments, file attachments, activity feed, simple workflows, role-based permissions, and email notifications.",
    { type: 'list', content: [
      'Small teams shipping product features',
      'Customer support teams triaging issues',
      'Freelancers coordinating with clients',
      'MVPs and early-stage product teams'
    ]}
  ],

  "Quick start — create account & onboarding": [
    "1) Sign up: Go to the Join page and enter your email. You’ll receive a verification link valid for 15 minutes. Click it to confirm your address and finish onboarding.\n\nSafety tip: TicTask will never request your password in email. Keep your password private.",
    "2) Create a workspace: Name your workspace and optionally invite teammates by email.",
    "3) Create a task: Click New Task, add title, due date, assignee, attachments and a short description.",
    { type: 'callout', title: 'Pro tip', content: 'Use concise task titles and add one accepted outcome — it reduces ambiguity.' }
  ],

  "Login & account management": [
    "Password-based login is the default. Password reset uses time-limited links. If you use SSO (Google/Github), we will link the external provider to your account during first login.",
    { type: 'strong', content: 'Two-factor authentication (optional) — enables extra security for sensitive workspaces.' }
  ],

  "Quick tour — dashboard": [
    "The dashboard organizes your work into a few high-value cards: Assigned to me, Backlog, Overdue, and Activity Feed. Each card links to filtered lists for quick triage.",
    { type: 'link', href: '/docs/tour', content: 'Read the full dashboard walkthrough' }
  ],

  "Roles & permissions": [
    "TicTask uses simple RBAC: Admins, Members, and Viewers. Admins manage workspace settings and billing; Members create and act on tasks; Viewers can only read content.",
    { type: 'callout', title: 'Note', content: 'You can create custom roles if your plan supports it.' }
  ],

  "Common flows — tasks, comments, attachments": [
    "Create → Assign → Work → Comment → Close. Attach files from local device or cloud storage. Mention teammates using @ to trigger notifications.",
    { type: 'list', content: ['Create task', 'Assign task', 'Accept/Decline task', 'Add comment', 'Attach files'] }
  ],

  "Notifications & activity feed": [
    "Notifications arrive by email and in-app. Use the bell menu to view recent activity. You can quiet notifications per-task or per-workspace.",
  ],

  "Pricing & billing": [
    "We offer a free tier for small teams and paid plans for teams needing advanced features like SSO, audit logs, and longer retention. Billing is per workspace.",
    { type: 'link', href: '/pricing', content: 'See detailed pricing' }
  ],

  "Security & privacy": [
    "Security is a top priority: HTTPS, encrypted at-rest DB credentials, secure cookies for refresh tokens, and role-based access control. We perform regular backups and recommend enabling 2FA for your account.",
    { type: 'list', content: ['HTTPS everywhere', 'Password hashing (bcrypt/argon2)', 'HttpOnly secure cookies for refresh tokens', 'Audit logs for admin actions'] }
  ],

  "Troubleshooting & FAQ": [
    "If you can’t find a verification email, check your spam folder and ensure your mail provider isn’t blocking messages from our domain. For lost access to your account, contact support with proof of workspace ownership.",
    { type: 'callout', title: 'FAQ — common', content: 'How do I restore a deleted task? — Deleted tasks can be restored by admins within 30 days.' }
  ],

  "Contact & support": [
    "Email: support@tictask.app — Available 9:00–18:00 (your timezone). For urgent incidents, use the in-app emergency contact or your workspace admin line.",
    { type: 'badge', content: 'Slack' },
    { type: 'badge', content: 'Email' }
  ]
}

// -------------------------
// DEVELOPER DOCS CONTENT
// -------------------------
export const CONTENTS_DEV: Record<string, DocTextBlock[]> = {
  'Auth & security (detailed)': [
    "Auth model: JWT access tokens (short lived) + refresh tokens (httpOnly, server-rotated). Refresh tokens are stored as hashed values in the DB for safe revocation.",
    {
      type: 'code',
      title: 'Auth endpoints (summary)',
      content: `POST /auth/join — start join flow (email verification)\nPOST /auth/login — exchange creds for access token and set refresh cookie\nPOST /auth/refresh — use refresh cookie to mint new access token\nPOST /auth/logout — clear cookie + revoke refresh token\nPOST /auth/request-password-reset — send reset email\nPOST /auth/reset-password — finalize reset by token`
    },
    {
      type: 'callout',
      title: 'Implementation notes',
      content: 'Use strong password hashing (bcrypt cost=12 or argon2). Keep access tokens short (10–15m). Send refresh tokens in Secure HttpOnly cookies and rotate them on use.'
    }
  ],

  'Backend implementation: patterns & conventions': [
    "Foldering convention: controllers/ -> thin HTTP layer, services/ -> business logic, repositories/ -> DB access, middlewares/ -> auth and validation. Keep controllers small and unit-test services." ,
    { type: 'list', content: ['Prefer small functions (< 50 lines)', 'Return consistent API payloads: { success: boolean, data: any, errors?: any }', 'Use OpenAPI for all public endpoints'] }
  ],

  'Onboarding checklist for new devs': [
    'Clone repo & run `docker-compose up -d`',
    'Copy `.env.example` to `.env` and provide credentials',
    'Run migrations: `npm run migrate`',
    'Seed test data: `npm run seed`',
    'Create a test user or use seeded users'
  ]
}

// -------------------------
// DEV & ONBOARDING CHECKLISTS
// -------------------------
export const DEV_CHECK_LIST = [
  'HTTPS everywhere (dev & prod via reverse proxy)',
  'Secure cookie flags set (httpOnly, secure, SameSite)',
  'Rate limiting on auth endpoints',
  'Password policy enforced (min len, complexity)',
  'Email tokens time-limited and single-use',
  'CSRF protections if any state is set via cookies (e.g., refresh endpoint)',
  'Audit logging for auth events (login, logout, token reuse)'
]

export const ONBOARDING_DEV_CHECK_LIST = [
  'Clone repo & run docker-compose up -d',
  'Create .env from .env.example and fill DB credentials',
  'Run migrations & seed data',
  'Create test user via seed script or register page',
  'Run unit tests'
]

// -------------------------
// SMALL REACT / MUI HELPERS (docs UI)
// - These are lightweight components to make your docs page nicer.
// - Exported here just as a convenience; move to components/ in your repo.
// -------------------------

export const DocsRenderHelpers = `
/* Example components (to drop into your components/docs folder):

- DocsToc: renders the table of contents with anchor links and a small search
- DocBlockRenderer: given a DocTextBlock[], renders paragraphs, callouts, code blocks, lists
- CollapsibleSection: useful for dev docs to hide long code snippets by default
- CopyCodeButton: small button to copy code blocks to clipboard
*/

// Implementation notes:
// • Use MUI <Card> for callouts, <Chip> or <Badge> for badges.
// • Use framer-motion subtle reveals for long sections to keep pages feeling fast.
// • Add an optional 'print' CSS media query for PDF export of docs pages.

`;