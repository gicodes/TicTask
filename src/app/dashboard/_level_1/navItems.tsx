import { User } from "@/types/users";
import { AuthUser } from "@/providers/auth";
import { CgMenuGridR } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { SiAwsorganizations } from "react-icons/si";
import { GiHelp, GiThreeFriends } from 'react-icons/gi';
import { RiBloggerLine, RiRobot2Fill } from "react-icons/ri";
import { Avatar, Box, Typography, Badge } from '@mui/material';
import { GrResources, GrUpdate, GrTasks } from "react-icons/gr";
import { BsFillCreditCard2BackFill, BsCalendar2Date } from "react-icons/bs";
import { FaUsers, FaDonate, FaVideo, FaHome, FaCircle, FaPeopleCarry } from 'react-icons/fa';
import { FcInvite, FcSerialTasks, FcDocument, FcBearish, FcDataEncryption, FcMoneyTransfer, FcParallelTasks } from "react-icons/fc";
import { MdCategory, MdSettings, MdPaid, MdCampaign, MdQuestionAnswer, MdSwitchAccount, MdWorkHistory, MdLogout } from "react-icons/md";

export const NAV_ITEMS = [
  { label: 'Console', path: '/dashboard/admin', icon: <GrTasks/>},
  { label: 'Tickets Hub', path: '/dashboard/tickets', icon: <FcSerialTasks/> },
  { label: 'Task Manager', path: '/dashboard/tasks', icon: <BsCalendar2Date/>},
  { label: 'AI assistant', path: '/dashboard/ai', icon: <RiRobot2Fill />, released: false, premium: true}, // new
  { label: 'Subscription', path: '/dashboard/subscription', icon: <BsFillCreditCard2BackFill /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <MdSettings /> }, 
  { label: 'Teams', path: '/dashboard/teams', icon: <FaUsers />},
  { label: 'Invite', path: '/dashboard/invite', icon: <FcInvite /> },
  
  { label: 'All Tickets', path: '/dashboard/admin/tickets', icon: <FcParallelTasks /> },
  { label: 'All Users', path: '/dashboard/admin/users', icon: <FaUserGroup /> },
  { label: 'Subscriptions', path: '/dashboard/admin/finances', icon: <FcMoneyTransfer /> },
  { label: 'All Teams', path: '/dashboard/admin/organizations', icon: <SiAwsorganizations /> },
  
  { label: 'Marketing', path: '/dashboard/marketing', icon: <MdCampaign /> },
  { label: "Metrics", path: '/dashboard/metrics', icon: <FcDataEncryption /> },
  { label: 'Careers', path: '/dashboard/admin/careers', icon: <MdWorkHistory />},
  { label: 'Partners', path: '/dashboard/admin/partners', icon: <GiThreeFriends />},
  { label: 'Products', path: '/product', icon: <MdCategory />, external: true },
  { label: 'Legal', path: '/legal', icon: <FcDocument />, external: true},
  { label: 'More', path: '#', icon: <CgMenuGridR />, more: true }, // more includes Docs, FAQ, blog, community and register Go to Signup

  { label: 'System Logs', path: '/dashboard/admin/logs', icon: <FcBearish /> },
  { label: 'Resources', path: '/resources', icon: <GrResources />},
];

export const MORE_NAV_ITEMS = [
  { label: 'Docs', path: '/resources/docs', icon: <GrResources />, external: true},
  { label: 'FAQ', path: '/resources/faq', icon: <MdQuestionAnswer />, external: true},
  { label: 'Blog', path: '/resources/blog', icon: <RiBloggerLine />, external: true},
  { label: 'Community', path: '#', icon: <FaPeopleCarry />, external: true},
  { label: "Go to Signup", path:'/auth/join/user', icon: <MdSwitchAccount />, external: true}, 
]

export const getFilteredNav = (user: AuthUser | null) => {
  if (!user) {
    const allowed = [
      'Tickets Hub', 'Task Manager', 'AI assistant', 'Products', 'Invite', 'Legal', 'Settings'
    ];
    return NAV_ITEMS.filter(item => allowed.includes(item.label));
  }

  const allowed = [
    'Tickets Hub', 'Task Manager', 'AI assistant', 'Products', 'Invite', 'Legal', 'Subscription', 'Settings',
  ];

  if (user?.role==="USER") allowed.push('More')
  if (user?.partner) allowed.push('Marketing', 'More');
  if (user?.userType==="BUSINESS") allowed.push('Teams', 'Metrics'); 
  if (user?.role === 'ADMIN') {
    return NAV_ITEMS.filter(
      (item) => !['More', 'Invite', 'Subscription'].includes(item.label)    
    );
  }

  const uniqueAllowed = [...new Set(allowed)];
  return NAV_ITEMS.filter(item => uniqueAllowed.includes(item.label));
};

export type LinkItem = {
  label: string | React.ReactNode;
  href: string;
  cta?: boolean;
  disabled?: boolean;
};
export const AUTH_ITEMS: LinkItem[] = [
  { label: <div className='flex gap-2 items-center'><GiThreeFriends/> Become a partner</div>, href: "/company/partner/register"},
  { label: <div className='flex gap-2 items-center'><GrUpdate/> Latest updates</div>, href: "/resources/changelog"},
  { label: <div className='flex gap-2 items-center'><FaVideo/>  Watch videos</div>, href: "#", cta: true},
  { label: <div className='flex gap-2 items-center'><MdPaid/>  See pricing</div>, href: "/product/pricing"},
  { label: <div className='flex gap-2 items-center'><GiHelp/>  Get support</div>, href: "/company/#contact-us"},
  { label: <div className='flex gap-2 items-center'><FaDonate/>  Donations</div>, href: "#", cta: true},
  { label: <div className='flex gap-2 items-center'><FaHome/> Go to main page </div>, href: "/" },
  { label: <div className='flex gap-2 items-center'><MdLogout fontSize='inherit'/>Logout</div>, href: "#", cta: true },
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
  { label: "Logout", href: ""},
  { label: "Dashboard", href: "/dashboard", cta: true },
];

export interface AvatarProps {
  size?: number;
  user: {
    name: string;
    photo?: string;
  } | null;
}
export const NavbarAvatar = ({ 
  user, 
  size = 36}: AvatarProps
) => { 
  return (
  <Box position={'relative'} maxHeight={50} alignContent={'center'}>
    <Avatar
      src={user?.photo || ''}
      sx={{
        bgcolor: user ? 'var(--surface-1)' :  'var(--surface-2)', 
        width: size,
        height: size,
        fontSize: 15,
        border: '0.1px solid var(--dull-gray)'
      }}
    >
      <Typography color={'var(--bw)'}>
        {user ? user.name?.split(' ').slice(0,2).map(n => n[0]?.toUpperCase()).join('') : 'NA'}
      </Typography>
    </Avatar>
    <Box position={'absolute'} bottom={-5} right={0} maxHeight={1}>
      <FaCircle 
        size={9} 
        color={(user as User)?.data?.status===undefined ? 'limegreen' 
          : (user as User)?.data?.status==="ACTIVE" ? 'limegreen' 
          : (user as User)?.data?.status==="AWAY" ? 'greenyellow' 
          : (user as User)?.data?.status==="BUSY" ? 'tomato' : 'var(--secondary)'} />
    </Box>
  </Box>
)};

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

export const ProBadge = () =>  
  <Badge 
    sx={{ 
      p: 1, 
      height: 15, 
      fontSize: 11, 
      display: 'flex', 
      fontWeight: 1000,
      borderRadius: 20, 
      alignItems: 'center', 
      bgcolor: 'var(--sepcial)', 
      color: 'var(--surface-1)', 
      fontFamily: 'monospace'
    }}
  >
    PRO
  </Badge>
