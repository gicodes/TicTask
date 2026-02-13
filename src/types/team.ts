import { AppNotification } from "./notification";
import { Subscription } from "./subscription";
import { Ticket } from "./ticket";
import { Invitation, User } from "./users";

export type TeamRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export type Team = {
  id: number;
  slug: string;
  name: string;
  description: string;

  ownerId: number;
  createdAt: string;
  updatedAt: string;

  owner: User;
  invitations: Invitation[];
  notifications: AppNotification;

  _count: {
    tickets: number;
  };
  tickets: Ticket[];

  members: TeamMember[];
  subscription: Subscription;
} | null;

export type TeamMember = {
  id: number;
  userId: number;
  teamId: number;
  role: TeamRole;

  name?: string;


  invitedBy?: number;
  createdAt: string;

  user: User;
  team: Team;
};

export interface Analytics {
  totalTickets: number;
  completedTickets: number;
  openTickets: number;
  membersCount: number;
}

export type UpdateTeamPayload = Partial<{
  name: string;
  description: string;
}>;