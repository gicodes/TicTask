import { CgMenuGridR } from "react-icons/cg";
import { RiRobot2Fill } from "react-icons/ri";
import { SiAwsorganizations } from "react-icons/si";
import { GrResources, GrUpdate } from "react-icons/gr";
import { GiHelp, GiThreeFriends } from 'react-icons/gi';
import { Logout, CorporateFare, WorkSharp } from '@mui/icons-material';
import { Avatar, Box, Typography, Badge } from '@mui/material';
import { BsFillCreditCard2BackFill, BsCalendar2Date } from "react-icons/bs";
import { FaUsers, FaDonate, FaVideo, FaHome, FaCircle } from 'react-icons/fa';
import { FcSerialTasks, FcDocument, FcBearish, FcDataEncryption } from "react-icons/fc";
import { MdOutlineFamilyRestroom, MdCategory, MdSettings, MdPaid, MdCampaign } from "react-icons/md";
import { AuthUser } from "@/providers/auth";

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
  { label: 'AI assistant', path: '#', icon: <RiRobot2Fill />, released: false}, // new
  { label: 'Planner', path: '/dashboard/planner', icon: < BsCalendar2Date/>},
  { label: 'Products', path: '/product', icon: <MdCategory /> },
  { label: 'Refer a friend', path: '/dashboard/refer', icon: <MdOutlineFamilyRestroom /> },
  { label: 'Subscriptions', path: '/dashboard/subscription', icon: <BsFillCreditCard2BackFill /> },
  { label: 'Marketing', path: '/dashboard/marketing', icon: <MdCampaign /> },
  { label: 'Teams', path: '/dashboard/teams', icon: <SiAwsorganizations />}, // user.BUSINESS
  { label: "Metrics", path: '/dashboard/metrics', icon: <FcDataEncryption /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <MdSettings /> }, 
  { label: 'Legal', path: '/legal', icon: <FcDocument />}, // user.BUSINESS
  { label: 'More', path: '', icon: <CgMenuGridR /> }, // more includes Docs, FAQ, blog, community and register new account
  { label: 'All Users', path: '/dashboard/users', icon: <FaUsers /> },
  { label: 'Careers', path: '/dashboard/careers', icon: <WorkSharp />},
  { label: 'Partners', path: '/dashboard/partners', icon: <GiThreeFriends />},
  { label: 'Organizations', path: '/dashboard/organizations', icon: <CorporateFare /> },
  { label: 'Resources', path: '/resources', icon: <GrResources />},
  { label: 'System Logs', path: '/dashboard/logs', icon: <FcBearish /> },
];

export const getFilteredNav = (user: AuthUser | null) => {
  if (!user) {
    const allowed = [
      'Tickets', 'AI assistant', 'Planner', 'Products',
      'Refer a friend', 'Legal', 'Settings'
    ];
    return NAV_ITEMS.filter(item => allowed.includes(item.label));
  }

  const allowed = [
    'Tickets', 'AI assistant', 'Planner', 'Products',
    'Refer a friend', 'Legal', 'Subscriptions', 'Settings',
    'More'
  ];

  if (user?.partner) allowed.push('Marketing');
  if (user?.organization) allowed.push('Teams', 'Metrics'); 
  if (user?.role === 'ADMIN') {
    return NAV_ITEMS;
  }

  const uniqueAllowed = [...new Set(allowed)];
  return NAV_ITEMS.filter(item => uniqueAllowed.includes(item.label));
};

export const AUTH_ITEMS: LinkItem[] = [
  { label: <div className='flex gap-2 items-center'><GiThreeFriends/> Become a partner</div>, href: "/company/partner/register"},
  { label: <div className='flex gap-2 items-center'><GrUpdate/> Latest updates</div>, href: "/resources/changelog"},
  { label: <div className='flex gap-2 items-center'><FaVideo/>  Watch videos</div>, href: "#", cta: true},
  { label: <div className='flex gap-2 items-center'><MdPaid/>  See pricing</div>, href: "/product/pricing"},
  { label: <div className='flex gap-2 items-center'><GiHelp/>  Get support</div>, href: "/company/#contact-us"},
  { label: <div className='flex gap-2 items-center'><FaDonate/>  Donations</div>, href: "#", cta: true},
  { label: <div className='flex gap-2 items-center'><FaHome/> Back to home </div>, href: "/" },
  { label: <div className='flex gap-2 items-center'><Logout fontSize='inherit'/>Logout</div>, href: "#", cta: true },
]

export const menuItems = [
  { label: "Products", href: "/product" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export const extendedMenuItems: Record<string, { label: string; href: string }[]> = {
  Products: [
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
  { label: "Logout", href: "", onClick: true},
  { label: "Dashboard", href: "/dashboard", cta: true },
];

export const NavbarAvatar = ({ user, size = 36}: AvatarProps) => <Box position={'relative'} maxHeight={50} alignContent={'center'}>
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
  <Box position={'absolute'} bottom={-5} right={0} maxHeight={1}>
    <FaCircle size={9} color={user ? 'limegreen' : 'var(--secondary)'} />
  </Box>
</Box>

export const NewFeatureBadge = () => 
  <Badge 
    sx={{ 
      p: 1.5, 
      height: 15, 
      display: 'flex', 
      fontWeight: 1000,
      fontSize: 11, 
      borderRadius: 20, 
      alignItems: 'center', 
      bgcolor: 'orange', 
      color: 'var(--surface-1)', 
      fontFamily: 'monospace'
    }}
  >
    BETA
  </Badge>