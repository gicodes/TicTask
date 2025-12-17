export type AdminOverviewData = {
  adminOverview?: {
    ticketsSummary: {
      total: number;
      escalatedCount: number;
      recent: AdminOverviewTicketRows[];
    };
    usersSummary: {
      totalUsers: number;
      newThisWeek: number;
      inTrial: number;
      recent: AdminOverviewUserRows[];
    };
    teamsSummary: {
      totalTeams: number;
      averageMembers: number;
    };
    subsSummary: {
      mrr: number;
      activePaying: number;
    };
    blogSummary: {
      total: number;
      published: number;
      draft: number;
      recent: []
    };
    changelogSummary: {
      total: number
      recent: []
    };
    faqSummary: {
      total: number;
      answered: number;
      missing: number;
      recent: []
    };
    partnerSummary: {
      total: number;
      approved: number;
      pending: number;
      recent: []
    };
    careerSummary: {
      total: number;
      open: number;
      closed: number;
      recent: []
    };
  };
};

export type StatCardProps = {
  title: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  meta?: string;
  element?: React.ReactNode;
};

export type AdminOverviewTicketRows = {
  id: number;
  title: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AdminOverviewUserRows = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  lastLoginIp?: string;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: (keyof T)[];
  rows: T[];
}