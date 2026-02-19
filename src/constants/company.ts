import { X, LinkedIn, YouTube } from "@mui/icons-material";
import { ReactElement, createElement } from "react";

export const TEAM = [
  { name: "Gideon Iduma", role: "Founder & CEO, TicTask", location: "Abuja, Nigeria" },
  { name: "Humphery Atteng", role: "Operations & Experience", location: "Lagos, Nigeria" },
  // { name: "Gi Codes (Gideon)", role: "Product Lead", location: "Abuja, Nigeria" },
  { name: "Kemisola Isijola", role: "Growth & Partnerships", location: "Ontario, Canada" },
  { name: "Select Engineering", role: "Marketing & B2B", location: "Ontario, Canada" }
];

export const SOCIALS: { name: string; icon: ReactElement; url: string }[] = [
  { name: "X (Twitter)", icon: createElement(X), url: "https://x.com/gicodes" },
  { name: "LinkedIn", icon: createElement(LinkedIn), url: "https://www.linkedin.com/in/tictask-for-smes-aaa5762a0/" },
  { name: "YouTube", icon: createElement(YouTube), url: "https://www.youtube.com/@tictask_org" },
  // { name: "Tiktok", icon: <img src="/tiktok.svg" alt="Tiktok" style={{ width: 24, height: 24 }} />, url: "https://www.tiktok.com/@tictask_org" },
];

export const VALUES = [
  {
    title: "Clarity First",
    desc: "We believe work flows best when goals, roles, and next steps are crystal clear.",
  },
  {
    title: "Build for Flow",
    desc: "We obsess over removing friction—so teams can move smoothly, not hurriedly.",
  },
  {
    title: "Remote, Not Distant",
    desc: "We prove that remote work can be deeply connected and collaborative with logs that allow rollbacks.",
  },
  {
    title: "Human at the Center",
    desc: "We design for real people, not just personas. Empathy guides every decision.",
  },
];

export const TEAM_BIO = "We are a small, distributed team passionate about building tools that make collaboration feel effortless. \n The idea is to make professional work completely remote — yet retain the most fundamental values of teamwork that has been for hundreds of years achieved within an physical office or workspace location\n — Making Teamwork Absolutely Remote";

export const CAREERS = [
  {
    title: "Frontend Engineer",
    type: "Full-time • Remote",
    desc: "Shape how teams experience flow in the browser. Build elegant, performant interfaces using Next.js, TypeScript, and modern design systems.",
  },
  {
    title: "Backend Engineer",
    type: "Full-time • Remote",
    desc: "Design scalable APIs and data models that make collaboration effortless. Work with Node.js, Prisma, and distributed systems.",
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