import { FcOrganization } from 'react-icons/fc';
import { FaPeopleCarry, FaUsers } from 'react-icons/fa';
import { GiLogging } from 'react-icons/gi';
import { CreditCard, Group, Notifications, People, Person, Settings, Event } from '@mui/icons-material';

export const NAV_ITEMS = [
  { label: 'Tickets', path: '/dashboard/tickets', icon: <Event /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <Person /> },
  { label: 'Notifications', path: '/dashboard/notifications', icon: <Notifications /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <Settings /> },
  { label: 'Team', path: '/dashboard/team', icon: <Group /> },
  { label: 'Clients', path: '/dashboard/clients', icon: <People /> },
  { label: 'Subscription', path: '/dashboard/subscription', icon: <CreditCard /> },
  { label: 'All Users', path: '/dashboard/users', icon: <FaUsers /> },
  { label: 'Partners', path: '/dashboard/partners', icon: <FaPeopleCarry /> },
  { label: 'Organizations', path: '/dashboard/organizations', icon: <FcOrganization /> },
  { label: 'System Logs', path: '/dashboard/logs', icon: <GiLogging /> },
];

export const AUTH_ITEMS: LinkItem[] = [
  { label: "Edit Profile", href: "/dashboard/profile/edit", disabled: false },
  { label: "Home", href: "/" },
  { label: "Logout", href: "", cta: true }, 
]

export const menuItems = [
  { label: "Product", href: "/product" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
  { label: "Contact Us", href: "/company/#contact-us" },
];

export const guestLinks: LinkItem[] = [
  { label: "Login", href: "/auth/login" },
  { label: "Join For Free", href: "/auth/join/user", cta: true },
];

export const userLinks: LinkItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Partner", href: "/company/partners/#join" },
  { label: "Logout", href: "", onClick: true},
];

  export type LinkItem = {
    label: string;
    href: string;
    cta?: boolean;
    disabled?: boolean;
    onClick?: boolean;
  };