import { AuthUser } from "@/types/auth";
import { AvatarProps } from "@/types/users";
import { CgMenuGridR, CgOrganisation } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { LinkItem } from "../_level_0/constants";
import { GiHelp, GiThreeFriends } from 'react-icons/gi';
import { RiBloggerLine, RiRobot2Fill } from "react-icons/ri";
import { Avatar, Box, Typography, Badge } from '@mui/material';
import { GrResources, GrUpdate, GrTasks } from "react-icons/gr";
import { BsFillCreditCard2BackFill, BsCalendar2Date } from "react-icons/bs";
import { FaUsers, FaDonate, FaVideo, FaHome, FaCircle, FaPeopleCarry } from 'react-icons/fa';
import { 
  FcInvite,  
  FcBearish,  
  FcDocument, 
  FcSerialTasks,
  FcMoneyTransfer, 
  FcParallelTasks,
  FcDataEncryption,
} from "react-icons/fc";
import { 
  MdPaid, 
  MdLogout,
  MdCategory, 
  MdSettings, 
  MdCampaign, 
  MdWorkHistory, 
  MdSwitchAccount, 
  MdQuestionAnswer, 
} from "react-icons/md";

/* 
  Nav items are used to render the navigation menu in the dashboard.
  Featuring: Nav items, More nav items, Auth items, Navbar avatar, New feature badge, Pro badge
*/

export const NAV_ITEMS = [
  { label: 'Console', path: '/dashboard/admin', icon: <GrTasks/>},
  { label: 'Ticket Hub', path: '/dashboard/tickets', icon: <FcSerialTasks/> },
  { label: 'Task Manager', path: '/dashboard/tasks', icon: <BsCalendar2Date/>},
  { label: 'AI assistant', path: '/dashboard/ai', icon: <RiRobot2Fill />, released: false, premium: true}, // new
  { label: 'Subscription', path: '/dashboard/subscription', icon: <BsFillCreditCard2BackFill /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <MdSettings /> }, 
  { label: 'Teams', path: '/dashboard/teams', icon: <FaUsers />},
  { label: 'Invite', path: '/dashboard/invite', icon: <FcInvite /> },
  { label: 'All Tickets', path: '/dashboard/admin/tickets', icon: <FcParallelTasks /> },
  { label: 'All Users', path: '/dashboard/admin/users', icon: <FaUserGroup /> },
  { label: 'Subscriptions', path: '/dashboard/admin/finances', icon: <FcMoneyTransfer /> },
  { label: 'All Teams', path: '/dashboard/admin/organizations', icon: <CgOrganisation /> },
  { label: 'Marketing', path: '/dashboard/marketing', icon: <MdCampaign /> },
  { label: "Metrics", path: '/dashboard/metrics', icon: <FcDataEncryption /> },
  { label: 'Careers', path: '/dashboard/admin/careers', icon: <MdWorkHistory />},
  { label: 'Partners', path: '/dashboard/admin/partners', icon: <GiThreeFriends />},
  { label: 'Product', path: '/product', icon: <MdCategory />, external: true },
  { label: 'Legal', path: '/legal', icon: <FcDocument />, external: true},
  { label: 'More', path: '#', icon: <CgMenuGridR />, more: true }, 
  // more includes Docs, FAQ, blog, community and register Go to Signup
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
      'Ticket Hub',
      'Task Manager',
      'Product',
      'Invite',
      'Legal',
      'Settings',
    ];

    return NAV_ITEMS.filter(item => allowed.includes(item.label));
  }

  const allowed = [
    'Ticket Hub',
    'Task Manager',
    'Product',
    'Invite',
    'Legal',
    'Subscription',
    'Settings',
  ];

  if (user.role === 'USER') {
    allowed.push('More');
  }

  if (user.partner && user.data?.approved) {
    allowed.push('Marketing', 'More');
  }

  if (
    // user.subscription?.active ||
    user.userType === 'BUSINESS' ||
    user.teamMembership ||
    user.data?.approved
  ) {
    allowed.push('Teams');
  }

  if (user.role === 'ADMIN') {
    return NAV_ITEMS.filter(
      item => !['More', 'Invite', 'Subscription'].includes(item.label)
    );
  }

  return NAV_ITEMS.filter(item => allowed.includes(item.label));
};

export const AUTH_ITEMS: LinkItem[] = [
  { label: <div className='flex gap-3 items-center'> <GiThreeFriends/> Become a partner</div>, href: "/company/partner/register"},
  // { label: <div className='flex gap-3 items-center'> <GrUpdate/> Latest updates</div>, href: "/resources/changelog"},
  { label: <div className='flex gap-3 items-center'> <FaVideo/>  Watch videos</div>, href: "https://youtube.com/@tictaskstudio?si=G8uD9kCZZrzINKeK", cta: true},
  { label: <div className='flex gap-3 items-center'> <MdPaid/>  See pricing</div>, href: "/product/pricing"},
  { label: <div className='flex gap-3 items-center'> <GiHelp/>  Get support</div>, href: "/company/#contact-us"},
  { label: <div className='flex gap-3 items-center'> <FaDonate/>  Donations</div>, href: "#", cta: true},
  { label: <div className='flex gap-3 items-center'> <FaHome/> Go to main page </div>, href: "/" },
  { label: <div className='flex gap-3 items-center'> <MdLogout fontSize='inherit'/> Logout</div>, href: "#", cta: true },
]

export const NavbarAvatar = ({ 
  user, 
  size = 36,
  showStatus = true
}: AvatarProps
) => { 
  const getInitials = (text: string) => {
    const parts = text.split(' ').filter(Boolean);
    if (parts.length === 0) return '...';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    
    return parts.slice(0, 2).map((n) => n[0]).join('').toUpperCase();
  };

  const avatarName = () => {
    if (!user) return '?';
    if (user.name) return getInitials(user.name);
    if (!user.name && user.organization) return getInitials(user.organization);
    return '?';
  };
  
  return (
    <Box position={'relative'} maxHeight={50} alignContent={'center'}>
      <Avatar
        src={user?.photo || ''}
        sx={{
          bgcolor: user ? 'var(--surface-1)' :  'var(--surface-2)', 
          width: size,
          height: size,
          border: '0.1px solid var(--dull-gray)'
        }}
      >
        <Typography color={'var(--bw)'} fontSize={size ? size / 2.4 : 15}>
          {avatarName()}
        </Typography>
      </Avatar>
      {showStatus && user?.name && 
        <Box 
          position={'absolute'} 
          maxHeight={size/ size}
          bottom={size > 64 ? -36 : -8}
          right={size < 32 ? -4 : size > 64 ? -2 : -5} 
        >
        <FaCircle 
          size={size > 50 ? size / 6 : size / 4} 
          color={
            user?.data?.status===undefined ? 'var(--disabled)' 
            : user?.data?.status==="ACTIVE" ? 'limegreen' 
            : user?.data?.status==="AWAY" ? 'gold' 
            : user?.data?.status==="BUSY" ? 'tomato' : 'gray'
          }
        />
      </Box>}
    </Box>
  )
};

export const NewFeatureBadge = () => (
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
)

export const ProBadge = () => (
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
)
