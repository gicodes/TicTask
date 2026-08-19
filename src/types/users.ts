import { Subscription, PushSubscriptions } from "./subscription";
import { Ticket, TicketHistory, TicketNote } from "./ticket";
import { TeamMember, Team } from "./team";

export type Role = 'ADMIN' | 'USER';
export type UserType = 'PERSONAL' | 'BUSINESS';
export type AdminLevel = 'BASIC' | 'FULL' | 'SUPER';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;

  emailVerifiedAt?: string;
  failedLogins?: number;
  lockedUntil?: string;

  tickets: Ticket[];
  closedTickets?: Ticket[];
  startedTickets?: Ticket[];
  assignedTickets?: Ticket[];

  referralCode: string;
  
  createdTeams: Team[];
  teamMemberships?: TeamMember[];
  teamMembership?: boolean | null; // client-side only, init at provider level

  userType:     UserType;   
  country:      string;
  phone:        string;
  photo?:       string;

  company?: string;
  roles?: string[];
  position?: string; 
  organization?: string;
  industry?:    string;
  teamSize?:    string;
  website?:      string;
  logo?:       string; 
  bio?:          string;
  credits: number;

  data?:    UserPreferences;

  partner?: boolean;
  collab?: boolean;
  partnerRole: string;

  subscription?: Subscription;
  pushSubscriptions?: PushSubscriptions[];

  adminProfile?: Admin;

  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string | Date;

  accessToken: string;
  refreshToken: string;
};

export type Admin = {
  id: number;
  userId: number;
  level: AdminLevel;

  createdAt: string;
};

export type Invitation = {
  id: number;
  email: string;
  token: string;
  accepted: boolean;
  expiresAt: string;
  teamId: number;
  invitedById: number;
  createdAt: string;
};

export type Client = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  tickets: Ticket[];
  notes: TicketNote[];
  histories: TicketHistory[];
  createdAt: Date | string;
}

export enum User_Type {
  BUSINESS = 'BUSINESS',
  PERSONAL = 'PERSONAL'
}

export type NotificationPreferences = {
  email: boolean;
  push: boolean;
  inApp: boolean;
};

export interface UserPreferences {
  status: UserStatus;

  muteNotifications?: boolean;
  getInAppNotifs?: boolean;
  getTNotifsViaEmail?: boolean;
  workSpaceName?: string;

  statusUntil?: string; 
  statusMessage?: string;
  
  approved?: boolean;  // same as partner.approved
  preferredContact?: string; 
  collaborationGoals?: string; 
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BUSY = "BUSY",
  AWAY = "AWAY",
  OFFLINE = "OFFLINE",
}

export interface AvatarProps {
  size?: number;
  showStatus?: boolean;
  user: {
    name: string;
    photo?: string;
    organization?: string;
    data?: { status: UserStatus }
  } | null;
}

export interface StatusProfileProps { 
  id: number,
  data: {
    status?: UserStatus
  }
} 

export type ProfileActivityProps = {
  tickets?: Ticket[];
  closedTickets?: Ticket[];
  startedTickets?: Ticket[];
  assignedTickets?: Ticket[];

  referralCode?: string;
  createdTeams?: Team[];
  teamMemberships?: TeamMember[];
  teamMembership?: boolean | null;
};
