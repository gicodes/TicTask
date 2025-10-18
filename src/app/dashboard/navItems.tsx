import { FcOrganization } from 'react-icons/fc';
import { FaPeopleCarry, FaUsers } from 'react-icons/fa';
import { GiLogging } from 'react-icons/gi';
import { LinkItem } from '@/providers/header';
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
  { label: "Logout", href: "/logout", cta: true }, 
]