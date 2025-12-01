export type AdminOverviewData = {
  adminOverview?: {
    ticketsSummary: {
      total: number;
      escalatedCount: number;
      recent: [];
    };
    usersSummary: {
      totalUsers: number;
      newThisWeek: number;
      inTrial: number;
      recent: [];
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

export type DataTableProps = {
  columns: string[];
  rows: Record<string, unknown>[];
};