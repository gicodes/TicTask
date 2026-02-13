import { Subscription } from "./subscription";
import { TeamMember, Team } from "./team";
import { Ticket, TicketHistory, TicketNote } from "./ticket";

export type Role = 'ADMIN' | 'USER';
export type UserType = 'PERSONAL' | 'BUSINESS';
export type AdminLevel = 'BASIC' | 'FULL' | 'SUPER';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;

  emailVerifiedAt?: string;

  failedLogins: number;
  lockedUntil?: string;

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

  data?:    UserPreferences;

  subscription?: Subscription;

  teamMemberships: TeamMember[];
  createdTeams: Team[];
  adminProfile?: Admin;

  partner?: boolean;
  collab?: boolean;
  partnerRole: string;

  accessToken: string;
  refreshToken: string;

  createdAt: string;
  updatedAt: string;
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

export interface UserPreferences {
  status: UserStatus;
  getTNotifsViaEmail?: boolean;
  workSpaceName?: string;

  statusUntil?: string; 
  statusMessage?: string;
  
  partnerRoles: string[]; // same as partner.roles
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