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
    };
    teamsSummary: {
      totalTeams: number;
      averageMembers: number;
    };
    subsSummary: {
      mrr: number;
      activePaying: number;
    };
  };
};

export type StatCardProps = {
  title: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  meta?: string;
};

export type DataTableProps = {
  columns: string[];
  rows: Record<string, unknown>[];
};