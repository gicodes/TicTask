export const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPEN':
      return { bg: 'var(--surface-2)', color: 'var(--foreground)' };
    case 'IN_PROGRESS':
      return { bg: 'var(--surface-2)', color: 'var(--success)' };
    case 'RESOLVED':
      return { bg: 'var(--surface-2)', color: 'var(--special)' };
    case 'CLOSED':
      return { bg: 'var(--surface-1)', color: 'var(--dull-gray)' };
    case 'CANCELLED':
      return { bg: 'var(--surface-2)', color: 'var(--danger)' };
    case 'UPCOMING':
      return { bg: 'var(--surface-2)', color: 'var(--info)', };
    default:
      return { bg: 'var(--secondary)', color: 'var(--accent-contrast)' };
  }
};

export const priorityColor = (p: string) => {
  switch (p?.toUpperCase()) {
    case 'URGENT': return '#b00020';
    case 'HIGH': return '#e53935';
    case 'MEDIUM': return '#ff9800';
    case 'LOW': return '#999';
    default: return '#9e9e9e';
  }
};

export const getTypeColor = (type: string) => {
  switch (type?.toLocaleUpperCase()) {
    case 'GENERAL' : return 'var(--bw)';
    case 'BUG': return 'var(--danger)';
    case 'FEATURE_REQUEST': return 'var(--special)';
    case 'SUPPORT': return 'var(--success)';
    case 'EVENT' : return 'var(--dull-gray)';
    case 'TASK' : return 'var(--primary)';
    case 'ISSUE' : return 'var(--accent)';
    case 'SECURITY': return 'var(--error)';
    case 'INVOICE': return '#358c29ff';
    case 'MAINTENANCE': return '#ff7043';
    case 'RELEASE': return '#8884ff';
    case 'TEST': return '#fbc02d';
    default: return 'var(--secondary)';
  }
}

export const TICKET_TYPE_COLORS = {
  BUG: '#EF4444',
  FEATURE_REQUEST: '#3B82F6',
  TASK: '#10B981',
  INVOICE: '#F59E0B',
  EVENT: '#8B5CF6',
  MEETING: '#8B5CF6',
  GENERAL: '#111',
};

export const TYPE_COLORS: Record<string, string> = {
  BUG: '#d32f2f',
  FEATURE_REQUEST: '#1976d2',
  INVOICE: '#2e7d32',
  TASK: '#7b1fa2',
  EVENT: '#f57c00',
  MEETING: '#0288d1',
};