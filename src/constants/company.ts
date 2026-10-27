import { X, LinkedIn, YouTube } from "@mui/icons-material";
import { ReactElement, createElement } from "react";

export const VALUES = [
  {
    title: "Modularity, Clarity",
    desc: "Independently identifying the smallest unit of a key object makes it simple to implement, apply and modify or scale",
  },
  {
    title: "Build for Flow",
    desc: "Design solutions that address friction, minimizes dependency between processes and advance development seamlessly",
  },
  {
    title: "Remote, Focused, Cohesive",
    desc: "We prove that remote can work. By defining demands and roles between moving parts, teams stay connected with work",
  },
  {
    title: "Human at the Center",
    desc: "In a world where processes are automated, we build for real people and around real-world needs",
  },
];

export const APPROACH = [
  {
    title: "Fewer moving parts",
    body: "One object for the work. Status is visible. Context stays attached. You should not need a second system to remember what the first one was supposed to do.",
  },
  {
    title: "Calm by design",
    body: "Speed comes from removing friction, not from adding more buttons, views, or notifications. The interface should disappear so the work can move.",
  },
  {
    title: "Built for how people actually work",
    body: "Remote or co-located, solo or in a small team. Ownership, history, and the next step should be obvious without a meeting to explain them.",
  },
];

export const FOUNDERS_QUOTE = `I recongnize the need for structure and standards. A well-structured system answer questions, create solutions and grow through decisions. I am always open to engage in any of these discussions`

export const TEAM_BIO = "We are a small, distributed team passionate about building tools that make collaboration feel effortless. \n The grand idea is to make professional work completely remote, yet retain the most fundamental values of teamwork that has been for hundreds of years achieved within physical offices or workspaces — Making Teamwork Absolutely Remote";

export const TEAM = [
  { name: "Gideon Iduma", role: "Founder & CEO", location: "Abuja, Nigeria" },
  { name: "Humphery Atteng", role: "Operations & Experience", location: "Lagos, Nigeria" },
  { name: "Obiaju Akachukwu", role: "Growth & Partnerships", location: "Lagos, Nigeria" },
  { name: "Select Engineering", role: "Marketing & B2B", location: "Ontario, Canada" }
];

export const SOCIALS: { name: string; icon: ReactElement; url: string }[] = [
  { name: "X (Twitter)", icon: createElement(X), url: "https://www.x.com/tictask_" },
  { name: "LinkedIn", icon: createElement(LinkedIn), url: "https://www.linkedin.com/in/tictask-for-smes-aaa5762a0/" },
  { name: "YouTube", icon: createElement(YouTube), url: "https://www.youtube.com/@tictaskstudio" },
  // { name: "Tiktok", icon: <img src="/tiktok.svg" alt="Tiktok" style={{ width: 24, height: 24 }} />, url: "https://www.tiktok.com/@tictask_org" },
];

export const CAREERS = [
  {
    title: "Backend Engineer",
    type: "Full-time • Remote",
    desc: "Design scalable APIs and data models that make collaboration effortless. Work with Node.js, Prisma, and distributed systems.",
  },
  {
    title: "DevOps Engineer",
    type: "Full-time • Remote",
    desc: "Build and maintain the infrastructure that powers TicTask. Work with AWS, Kubernetes, and CI/CD pipelines to ensure our platform is reliable and scalable.",
  },
  {
    title: "Product Designer",
    type: "Full-time • Hybrid",
    desc: "Craft interfaces that feel calm, intentional, and deeply human. Help define the visual language of productivity at TicTask.",
  },
  {
    title: "Marketing (B2B)",
    type: "Full-time • Hybrid",
    desc: "Build campaigns that inspire teams to work smarter. Manage our brand voice across channels, and connect with media to amplify our mission.",
  }
];