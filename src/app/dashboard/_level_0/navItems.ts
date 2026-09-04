import { LinkItem } from "./constants";

export const menuItems = [
  { label: "Product", href: "/product" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export const extendedMenuItems: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Overview", href: "/product" },
    { label: "Pricing", href: "/product/pricing" },
    { label: "Demo", href: "/product/demo" },
  ],
  Resources: [
    { label: "Overview", href: "/resources" },
    { label: "FAQ", href: "/resources/faq" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Documentation", href: "/resources/docs" },
  ],
  Company: [
    { label: "Overview", href: "/company" },
    { label: "Careers", href: "/company/careers" },
    { label: "Partner", href: "/company/partner" },
    { label: "Contact Us", href: "/company/#contact-us" },
  ],
};

export const guestLinks: LinkItem[] = [
  { label: "Login", href: "/auth/login" },
  { label: "Join For Free", href: "/auth/join/user", cta: true },
];

export const userLinks: LinkItem[] = [
  { label: "Logout", href: ""},
  { label: "Dashboard", href: "/dashboard", cta: true },
];