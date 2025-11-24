export type Role = 'ADMIN' | 'USER';
export type UserType = 'PERSONAL' | 'BUSINESS';
export type TeamRole = 'OWNER' | 'ADMIN' | 'MEMBER';
export type AdminLevel = 'BASIC' | 'FULL' | 'SUPER';
export type Plan = 'FREE' | 'STANDARD' | 'PRO' | 'ENTERPRISE';

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

  position?: string; 

  organization?: string;
  industry?:    string;
  teamSize?:    string;
  website?:      string;
  logo?:       string; 
  bio?:          string;

  subscription?: Subscription;
  getTNotifsViaEmail?: boolean;

  teamMemberships: TeamMember[];
  createdTeams: Team[];
  adminProfile?: Admin;

  partner?: boolean;
  collab?: boolean;
  partnerRole: string;

  accessToken: string;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  id: number;
  userId: number;
  level: AdminLevel;
  createdAt: string;
};

export type Team = {
  id: number;
  name: string;
  slug: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;

  members: TeamMember[];
  subscription?: Subscription;
};

export type TeamMember = {
  id: number;
  userId: number;
  teamId: number;
  role: TeamRole;

  invitedBy?: number;
  createdAt: string;

  user: User;
  team: Team;
};

export type Invitation = {
  id: number;
  email: string;
  token: string;
  accepted: boolean;
  expiresAt: string;
  createdAt: string;
  teamId: number;
  invitedById: number;
};

export type Subscription = {
  id: number;
  plan: Plan;
  active: boolean;
  startedAt: string;
  expiresAt: string;
  createdAt: string;
  teamId: number;
  userId: number;
};