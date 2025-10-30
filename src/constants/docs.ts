/*
  tictask-docs-constants-and-docs-updates.ts
  - Exports scalable constants for public docs and dev docs (easy to maintain)
  - Includes improved user-facing copy, more sections, and developer-facing content
  - Includes small React components / render helpers (MUI + Next) for a better docs UI

  NOTE: This file is a developer convenience and can be split into smaller files in your repo.
*/

import { DocTextBlock } from "@/types/resources"

// -------------------------
// TABLE OF CONTENTS (Public)
// -------------------------
export const TABLE_OF_CONTENTS = [
  "What Is TicTask",
  "Key Features & Target Audience",
  "Quick start — Create Account & Onboard",
  "Login & Account Management",
  "Quick Tour — Dashboard",
  "Roles & Permissions",
  "Common Flows — Tasks, Comments, Attachments",
  "Notifications & Activity Feed",
  "Pricing & Billing",
  "Security & Privacy",
  "Troubleshooting & FAQ",
  "Contact & Support"
]

// -------------------------
// TABLE OF CONTENTS (Developer)
// -------------------------
export const TABLE_OF_CONTENTS_DEV = [
  "Project overview",
  "High-level Architecture",
  "Repo Layout & Folder Structure",
  "Tech stack & Versions",
  "Environment & Secrets",
  "Database Design — ER summary + Migrations",
  "Services & Endpoints — API Conventions",
  "Auth & Security",
  "Backend Implementation: Patterns & Conventions",
  "Frontend Structure: Patterns, Components & Pages",
  "Testing Strategy: Unit / Integration / e2e",
  "CI/CD & Deployments",
  "Local dev & Debugging",
  "Release Notes & Versioning Policy",
  "Runbook: Common ops & Recovery Steps",
  "Tasks & Milestone Checklist (issue-level)",
  "Onboarding Checklist For New Devs",
  "Appendix: OpenAPI / Postman / Useful commands"
]

// -------------------------
// PUBLIC DOCS CONTENT (scalable map)
// - Each key maps to an array of blocks. Each block is either a string (paragraph) or an object
//   describing special renderable elements (link, code, callout, list).
// - This design keeps the data-driven rendering flexible for a docs renderer component.
// -------------------------



export const CONTENTS: Record<string, DocTextBlock[]> = {
  "What Is TicTask": [
    "TicTask is a lightweight, collaborative ticketing and task management platform built for fast, transparent teamwork.", 
    "By leveraging the fundamental concepts and principles of SWE, TicTask runs a system that helps to streamline your workflow and boost productivity.  It helps individuals and teams capture work, assign ownership, track progress, and ship faster.",
    { type: 'callout', title: 'Core idea', content: 'Keep tasks simple, make ownership clear, and make progress visible.' }
  ],

  "Key Features & Target Audience": [
    "TicTask focuses on a handful of high-value features: Tasks & subtasks, assignments, activity feed, simple workflows, role-based permissions, and email notifications.",
    { type: 'list', content: [
      'Task and project-orientated individuals',
      'Small teams shipping product features',
      'Customer support teams triaging issues',
      'Freelancers coordinating with clients',
      'MVPs and early-stage product teams'
    ]}
  ],

  "Quick Start — Create Account & Onboard": [
    { type: 'inline', content: "1) Sign up: Enter your personal or business email. You’ll receive a verification link valid for 15 minutes. Click on the link to confirm your email and continue setup from the onboarding page."}, '',
    { type: 'inline', content: "2) Onboard: Follow"}, { type: 'outline', content: "Set your password"}, { type: 'inline', content: " link sent to your email."}, 
    "Setup password → Choose account type: Personal or Business → Save to complete onboarding and continue to Dashboard.", 
    { type: 'inline', content: "3) Dashboard: You will be re-directed to your dashboard. You can also visit dashboard from the welcome email sent to your email."}, '',
    { type: 'callout', title: 'Safety tip', content: 'TicTask will never request your password in email. Keep your password private and mind the time constraints' }
  ],

  "Login & Account Management": [
    "Password-based login is the default. We are constantly working to add and improve our sign-in methods.", 
    { type: 'point', content: "Email and password"},
    { type: 'point', content: "SSO/ Auth providers"},
    { type: 'badge', content: "Google sign-in"},
    { type: 'badge', content: "Slack sign-in"},
    { type: 'badge', content: "X (formerly Twitter) sign-in"},
    '',
    { type: 'point', content: 'Two-factor authentication (optional) '}, { type: 'inline', content: 'Enables extra security for sensitive workspaces.' }, 
    { type: 'inline', content: 'To manage, personalize or delete your account, visit '}, { type: 'link', content: ' account management.', href: '/dashboard/settings#account-management' },
    "Password reset uses time-limited links. If you use SSO (Google/Github), we will link the external provider to your account during first login.",
  ],

  "Quick Tour — Dashboard": [
    "The dashboard structures your workspace into simple and user-friendly layout, comprising of dashboard header, menu pages and an overview page i.e. Tickets, Settings, etc.", 
    "Tickets offer two (2) standard workspace views: Board and List.", 
    { type: "outline", content: "BOARD"}, { type: 'inline', content: ' organizes your tickets in rows of ticket status. Each status column showing tickets in detailed card'}, '',
    { type: "badge", content: "Upcoming"}, { type: "badge", content: "Open"}, { type: "badge", content: "In progress"}, { type: "badge", content: "Resolved"}, { type: "badge", content: "Closed"}, { type: "badge", content: "Cancelled"}, '',
    { type: "outline", content: "LIST"}, { type: 'inline', content: ' tabulates your tickets in a readable format, with column tabs showing detailed ticket information'}, '',
    { type: 'link', href: '/docs/tour', content: 'Read the full dashboard walkthrough' }
  ],

  "Roles & Permissions": [
    "TicTask uses simple RBAC to control a user and viewer's accessibilty. These roles include; User as personal, User as organization/ team, Admin and Viewers.",
    { type: 'outline', content: "Personal"}, { type: 'inline', content: " create and manage tickets and tasks on free tier. Subscription unlocks extended features."},  "",
    { type: 'outline', content: "Organization"}, { type: 'inline', content: " create and manage teams with admin features. Subscription is required, while team members can use free tier."}, '',
    { type: 'outline', content: "Admin"}, { type: 'inline', content: " manage in-app performances, metrics & system logs, Subscriptions, docs and resource requests are co-managed by "}, { type: 'badge', content: 'moderators'}, '',
    { type: 'callout', title: 'Note', content: 'Custom roles i.e. Moderator are not supported by default. Setting up a custom role requires registering as partner.' }
  ],

  "Common flows — Tasks, Assignments, Comments": [
    "Create → Assign → Work → Comment → Close",
    "Attach files from local device or cloud storage and mention teammates using @ to trigger notifications.",
    { type: 'list', content: ['Create task', 'Assign task', 'Accept/ Decline task', 'Add comment', 'Attach files', 'Search ticket', 'Create team', 'Invite member', 'Accept/ Decline invite'] }
  ],

  "Notifications & Activity Feed": [
    "Notifications arrive by email and in-app alerts. Use the bell menu to view recent activity. You can quiet notifications per-task or per-workspace and configure the notification provider i.e. Email, SMS or Slack.",
    "Your Activity feed shows actions and notifications on activities noticed on your account. The feeds are temporarily stored for your timely viewing, and is not persisted to a database nor accessible after viewing and timeout.",
    { type: 'callout', title: 'Pro tip', content: 'Using notification providers you monitor frequently for tickets and tasks notifications can be an effective approach' }
  ],

  "Pricing & Billing": [
    "We offer a free tier for personal accounts, basic tier for small teams and pro plans for teams needing advanced features like SSO, audit logs, and longer retention.",
    "Billing is per workspace and billing information is required on business accounts. Standard monthly billing cycle is 30 days, and payments due triggers a 5-day grace period with persistent billing re-trials. Failed payment disables all business features and dissolves teams temporarily.",
    { type: 'link', href: '/product/pricing', content: 'See detailed pricing' }
  ],

  "Security & Privacy": [
    "Security is a top priority, and of utmost importance to our system performance.",
    "Some important protocols used throughout the applications include HTTPS, encrypted at-rest DB credentials, secure cookies for refresh tokens, and role-based access control. We perform regular backups and recommend enabling 2FA for your account.",
    { type: 'list', content: ['HTTPS everywhere', 'Password hashing (bcrypt/ crypto)', 'Http-Only secure cookies for refresh tokens', 'Audit logs for admin actions', 'Ecrypted data protocols'] },
    "Privacy settings lets you customize everything to your preference. You can find this option on your dashboard."
  ],

  "Troubleshooting & FAQ": [
    "Often times, we are stuck with problems mostly because we are, and feel alone when looking for a solution. Troubleshooting on TicTask should be a collective effort, especially because we are here to solve your day-to-day issues.",
    "To ensure you get the best experience, we have several channels for team support.", 
    { type: 'link', href: '/company#contact-us', content: "Contact us"}, '', 
    { type: 'link', href: '#', content: "AI assistance"}, '', 
    { type: 'link', href: '#', content: "Community posts"}, '',
    { type: 'link', href: '/resoources/faq', content: 'Frequently Asked Questions' }, '',
    { type: 'callout', title: 'FAQ — common', content: 'Is my data secure? — Yes, absolutely. We use enterprise-grade encryption and role-based access.' },
  ],

  "Contact & Support": [
    "We have several lines and channels open to receive your message.", 
    "We typically give priority response to emails from support@tictask.app — Available 9:00–18:00 (GMT). For urgent incidents, use the in-app emergency contact or your workspace admin line.",
    { type: 'badge', content: 'Email' },
    { type: 'badge', content: 'Slack' },    
    { type: 'badge', content: 'Phone' },
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

// -------------------------
// DEVELOPER DOCS CONTENT (Optimized)
// -------------------------
export const CONTENTS_DEV: Record<string, DocTextBlock[]> = {
  "Project overview": [
    "TicTask is built to unify ticketing and task management through a modern, modular codebase. It aims to deliver a fast, scalable, and intuitive platform that reflects true software engineering principles.",
    { type: 'list', content: [
      'Lightweight and modular architecture — easy to extend and maintain',
      'Developer-friendly setup with Docker-first philosophy',
      'Strict adherence to REST and OpenAPI standards',
      'Secure-by-default authentication and role-based access',
      'Seamless CI/CD with automated testing and staged rollouts'
    ]},
    { type: 'callout', title: 'Goal', content: 'Deliver a robust, intuitive system that scales with teams — not against them.' }
  ],

  "High-level Architecture": [
    "TicTask follows a service-oriented architecture (SOA) built on Node.js + TypeScript, with React on the frontend and PostgreSQL as the main datastore.",
    { type: 'list', content: [
      'Frontend — Next.js + React + MUI + Zustand/ Redux (state management)',
      'Backend — Express.js/ Fastify services organized by domain',
      'Database — PostgreSQL with Prisma ORM and schema migrations',
      'Caching — Redis (for sessions, queues, and notifications)',
      'Deployment — Dockerized microservices orchestrated via Docker Compose (dev) or Kubernetes (prod)',
      'CI/CD — GitHub Actions for lint/test/build/deploy pipelines'
    ]},
    { type: 'callout', title: 'Tip', content: 'Keep each service independently deployable and testable.' }
  ],

  "Repo layout & Folder structure": [
    "The repository uses a flat modular layout for clarity and maintainability.",
    {
      type: 'code',
      title: 'Folder structure',
      content: `
        ├── /                     # root
        ├── backend/              # Backend service (Express/ Nodejs)
        |   ├── prisma/           # Database schema & migrations
        |   ├── src/
        |   |    ├── controllers/  # API controllers
        |   |    ├── lib/          # Shared helpers, templates and server utils
        |   |    ├── middlewares/  # Middlewares
        |   |    ├── routes/       # API routes
        |   |    ├── validators/   # Validation schemas
        |   |    ├── index.ts      # Server entry point
        |   ├── Dockerfile
        |   ├── tsconfig.json
        |
        ├── frontend/             # Frontend app (React/ Nextjs)
        |
        ├── types/                # Shared types and interfaces
        ├── scripts/              # Dev scripts (seed, reset, lint)
        └── docs/                 # Public + developer documentation`
    }
  ],

  "Tech stack & Versions": [
    { type: 'list', content: [
      'Node.js v20+',
      'Next.js 15 ',
      'TypeScript 5.x',
      'Prisma ORM',
      'PostgreSQL 15+',
      'Redis 7.x',
      'Docker + Compose v2',
      'GitHub Actions for CI/CD',
      'Jest + Playwright for testing'
    ]},
    { type: 'callout', title: 'Note', content: 'TicTask favors stable LTS versions to ensure reproducible builds.' }
  ],

  "Environment & Secrets": [
    "All environment variables are validated at runtime using Zod. Secrets are loaded from `.env` or a managed secret provider (e.g., Doppler, Vault, or AWS SSM).",
    { type: 'code', title: '.env.example', content: 
      `DATABASE_URL="postgresql://user:pass@localhost:5432/tictask"
      REDIS_URL="redis://localhost:6379"
      JWT_SECRET="your-secret-key"
      NODE_ENV="development"` },
    { type: 'callout', title: 'Tip', content: 'Never commit .env files. Use .env.example for defaults and onboarding.' }
  ],

  "Database Design — ER Summary + Migrations": [
    "The schema follows a normalized relational model to ensure data consistency and fast lookups.",
    { type: 'list', content: [
      'Users ↔ Workspaces ↔ Tickets (many-to-many relationships)',
      'Tasks linked to tickets and subtasks',
      'AuditLogs for key user and system actions',
      'Notifications and Comments stored in separate tables with references'
    ]},
    { type: 'code', title: 'Migration command', content: 'npx prisma migrate dev --name init_schema' },
    { type: 'callout', title: 'Note', content: 'Each migration should be peer-reviewed and run in staging before production.' }
  ],

  "Services & Endpoints — API Conventions": [
    "All endpoints follow REST conventions with predictable naming and pagination support.",
    { type: 'code', title: 'Service endpoints', content: `
      GET    /api/tickets           # List all tickets
      POST   /api/tickets           # Create a new ticket
      PATCH  /api/tickets/:id       # Update a ticket
      DELETE /api/tickets/:id       # Delete a ticket
      GET    /api/users/:id         # Get user profile
      POST   /api/auth/login        # Authenticate and issue token` },
    { type: 'callout', title: 'Tip', content: 'Use OpenAPI specs to document all public endpoints. Each service exports its own Swagger JSON.' }
  ],

  "Auth & Security": [
    "Auth model: short-lived JWT access tokens with rotating, HttpOnly refresh tokens stored securely in the DB.",
    { type: 'code', title: 'Auth endpoints', content: `
      POST /auth/join                # Register and verify email
      POST /auth/login               # Authenticate user credentials
      POST /auth/refresh             # Refresh access token
      POST /auth/logout              # Revoke refresh token
      POST /auth/request-password-reset
      POST /auth/reset-password` },
    { type: 'list', content: [
      'Password hashing: bcrypt (cost=12) or Argon2id',
      'Tokens signed with HS256, expiresIn: 15m (access) / 7d (refresh)',
      'CSRF-safe cookie settings with SameSite=Lax',
      'Rate limiting on login, reset-password, and join routes',
      'Audit log all login + refresh token events'
    ]}
  ],

  "Frontend Structure: Patterns, Components & Pages": [
    "Frontend built with Next.js (App Router) and MUI, emphasizing modular and accessible design.",
    { type: 'list', content: [
      'Type Annotations - reusable types and interfaces',
      'Atomic design principles — components organized by function',
      'Reusable MUI wrappers for consistent branding',
      'State management via Zustand and Redux Toolkit',
      'Server actions for mutations (Next 15+)',
      'Emotion caches, framer motions and hookform resolvers',
      'Lazy loading for large modules and code-splitting per route'
    ]},
    { type: 'callout', title: 'Tip', content: 'All shared components should live in packages/ui and be tree-shakeable.' }
  ],

  "Testing Strategy: Unit / Integration / e2e": [
    "Testing ensures stability across deployments and feature updates.",
    { type: 'list', content: [
      'Unit tests — Jest for backend logic & utilities',
      'Integration tests — Supertest for API endpoints',
      'E2E tests — Playwright for full workflows (auth, tickets, tasks)',
      'CI pipelines fail fast on any regression',
      'Minimum coverage: 80% (critical modules must be 100%)'
    ]},
    { type: 'callout', title: 'Tip', content: 'Run tests locally before commits using `npm run test:watch`.' }
  ],

  "CI/CD & Deployments": [
    "GitHub Actions handles linting, testing, building, and deploying. Docker images are versioned and pushed to GHCR.",
    { type: 'code', title: 'Main pipeline', content: `
on:
  push:
    branches: [main]
jobs:
  build-test-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: docker build -t ghcr.io/tictask/app:latest .
      - run: docker push ghcr.io/tictask/app:latest` },
    { type: 'callout', title: 'Tip', content: 'Always test migrations and seed scripts on staging before deployment.' }
  ],

  "Runbook: Common Ops & Recovery Steps": [
    "Operational best practices for maintaining uptime and recovery during incidents.",
    { type: 'list', content: [
      'Restart containers: `docker compose restart api`',
      'Rebuild cache: `docker exec api npm run cache:clear`',
      'Run migrations manually: `npx prisma migrate deploy`',
      'Inspect error logs: `docker logs api --tail=100`',
      'Check DB health: `SELECT * FROM pg_stat_activity;`'
    ]},
    { type: 'callout', title: 'Incident recovery', content: 'If DB corruption or downtime occurs, restore from the latest automated backup snapshot stored in S3.' }
  ],

  "Onboarding Checklist For New Devs": [
    'Clone repo: `git clone git@github.com:tictask/app.git`',
    'Run `docker compose up -d`',
    'Copy `.env.example` → `.env` and configure DB credentials',
    'Run migrations: `npm run migrate` and `npm run seed`',
    'Create test user and verify login via `/auth/login`',
    { type: 'callout', title: 'Pro tip', content: 'Use `npm run dev:web` and `npm run dev:api` for faster concurrent debugging.' }
  ]
}
