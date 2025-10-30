import { CgMenuGridR } from "react-icons/cg";
import { RiRobot2Fill } from "react-icons/ri";
import { SiAwsorganizations } from "react-icons/si";
import { GrResources, GrUpdate } from "react-icons/gr";
import { GiHelp, GiThreeFriends } from 'react-icons/gi';
import { Avatar, Box, Typography } from '@mui/material';
import { Logout, CorporateFare } from '@mui/icons-material';
import { BsFillCreditCard2BackFill, BsCalendar2Date } from "react-icons/bs";
import { FaUsers, FaDonate, FaVideo, FaHome, FaCircle } from 'react-icons/fa';
import { FcSerialTasks, FcDocument, FcBearish, FcDataEncryption } from "react-icons/fc";
import { MdOutlineFamilyRestroom, MdCategory, MdSettings, MdPaid } from "react-icons/md";

export type LinkItem = {
  label: string | React.ReactNode;
  href: string;
  cta?: boolean;
  disabled?: boolean;
  onClick?: boolean;
};

export interface AvatarProps {
  user: {
    name: string;
    photo?: string;
  } | null;
  size?: number;
}

export const NAV_ITEMS = [
  { label: 'Tickets', path: '/dashboard/', icon: <FcSerialTasks/> },
  { label: 'AI assistant', path: '', icon: <RiRobot2Fill />}, // new
  { label: 'Planner', path: '/dashboard/calendar', icon: < BsCalendar2Date/>}, // new
  { label: 'Products', path: '/product', icon: <MdCategory /> },
  { label: 'Refer a friend', path: '/dashboard/refer', icon: <MdOutlineFamilyRestroom /> },
  { label: 'Subscriptions', path: '/dashboard/subscription', icon: <BsFillCreditCard2BackFill /> },
  { label: 'Documentation', path: '/resources/docs', icon: <FcDocument /> },

  { label: 'Teams', path: '/dashboard/teams', icon: <SiAwsorganizations />}, // user.BUSINESS

  { label: "Metrics", path: '/dashboard/metrics', icon: <FcDataEncryption /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <MdSettings /> }, 
  { label: 'More', path: '', icon: <CgMenuGridR /> }, // more includes FAQ, blog, community and register new account

  { label: 'All Users', path: '/dashboard/users', icon: <FaUsers /> },
  { label: 'Partners', path: '/dashboard/partners', icon: <GiThreeFriends />},
  { label: 'Organizations', path: '/dashboard/organizations', icon: <CorporateFare /> },
  { label: 'Resources', path: '/dashboard/resources', icon: <GrResources />},
  { label: 'System Logs', path: '/dashboard/logs', icon: <FcBearish /> },
];

export const AUTH_ITEMS: LinkItem[] = [
  { label: <div className='flex gap-2 items-center'><GiThreeFriends/> Become a partner</div>, href: "/partner/join"},
  { label: <div className='flex gap-2 items-center'><GrUpdate/> Latest updates</div>, href: "/resources/changelog"},
  { label: <div className='flex gap-2 items-center'><FaVideo/>  Watch videos</div>, href: "#"},
  { label: <div className='flex gap-2 items-center'><MdPaid/>  See pricing</div>, href: "/product/#pricing"},
  { label: <div className='flex gap-2 items-center'><GiHelp/>  Get support</div>, href: "/company/#contact-us"},
  { label: <div className='flex gap-2 items-center'><FaDonate/>  Donations</div>, href: "#"},

  { label: <div className='flex gap-2 items-center'><FaHome/> Back to home </div>, href: "/" },
  { label: <div className='flex gap-2 items-center'><Logout fontSize='inherit'/>&nbsp;Logout</div>, href: "#", cta: true },
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
  { label: "Partner", href: "/partner" },
  { label: "Logout", href: "", onClick: true},
  { label: "Dashboard", href: "/dashboard", cta: true },
];

export const NavbarAvatar = ({ user, size = 36}: AvatarProps) => <Box position={'relative'}>
  <Avatar
    src={user?.photo || ''}
    sx={{
      // In scale: TEAM_ADMIN='var(--sharp)' ? 'primary.main', ADMIN='var(--surface-1)' 
      bgcolor: user ? 'var(--surface-1)' : 'var(--surface-2)', 
      width: size,
      height: size,
      fontSize: 15,
      border: '0.1px solid var(--dull-gray)'
    }}
  >
    <Typography color={'var(--bw)'}>{user ? user.name?.
    split(' ').map(n => n[0]?.toUpperCase()).join('') : 'NA'}</Typography>
  </Avatar>
  <Box position={'absolute'} bottom={-5} right={1}>
    <FaCircle size={9} color={user ? 'limegreen' : ''} />
  </Box>
</Box>