export const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPEN':
      return { bg: 'var(--accent)', color: 'var(--foreground)' };
    case 'IN_PROGRESS':
      return { bg: 'var(--success)', color: 'var(--bw)' };
    case 'RESOLVED':
      return { bg: 'var(--special)', color: 'var(--bw)' };
    case 'CLOSED':
      return { bg: 'gray', color: 'white' };
    case 'CANCELLED':
      return { bg: '#d32f2f', color: 'white' };
    case 'UPCOMING':
      return { bg: '#8884ff', color: 'white' };
    default:
      return { bg: 'var(--secondary)', color: 'var(--accent-contrast)' };
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return { bg: '#ff7043', color: 'white' };
    case 'MEDIUM':
      return { bg: '#fbc02d', color: 'black' };
    case 'LOW':
      return { bg: '#ffa50066', color: 'black' };
    default:
      return { bg: 'var(--surface-1)', color: 'var(--foreground)' };
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
    case 'GENERAL' : return '#000';
    case 'BUG': return 'var(--danger)';
    case 'FEATURE_REQUEST': return 'var(--special)';
    case 'SUPPORT': return 'var(--success)';
    case 'EVENT' : return 'var(--surface-1)';
    case 'TASK' : return 'var(--primary)';
    case 'ISSUE' : return 'var(--accent)';
    case 'INVOICE': return 'var(--surface-2)';
    default: return 'var(--secondary)';
  }
}