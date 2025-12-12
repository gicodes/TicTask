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
    case 'TODAY':
      return { bg: 'var(--surface-2)', color: 'var(--accent)', };
    default:
      return { bg: 'var(--secondary)', color: 'var(--accent-contrast)' };
  }
};

export const priorityColor = (p: string) => {
  switch (p?.toUpperCase()) {
    case 'URGENT': 
      return '#b00020';
    case 'HIGH': 
      return '#e53935';
    case 'MEDIUM': 
      return '#ff9800';
    case 'LOW': 
      return '#999';
    default: 
      return '#9e9e9e';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'URGENT': 
      return { bgcolor: '#ef4444', color: 'white' };
    case 'HIGH':   
      return { bgcolor: '#f97316', color: 'white' };
    case 'MEDIUM': 
      return { bgcolor: '#eab308', color: 'white' };
    case 'LOW':    
      return { bgcolor: '#22c55e', color: 'white' };
    default:       
      return { bgcolor: '#6b7280', color: 'white' };
  }
};

export const getTypeColor = (type: string) => {
  switch (type?.toLocaleUpperCase()) {
    case 'GENERAL' : 
      return 'var(--bw)';
    case 'BUG': 
      return 'var(--danger)';
    case 'FEATURE_REQUEST': 
      return 'var(--special)';
    case 'SUPPORT': 
      return 'var(--success)';
    case 'EVENT' : 
      return '#0288d1';
    case 'MEETING' : 
      return '#0288d1';
    case 'TASK' : 
      return 'var(--primary)';
    case 'ISSUE' : 
      return 'var(--accent)';
    case 'SECURITY': 
      return 'var(--error)';
    case 'INVOICE': 
      return '#358c29ff';
    case 'MAINTENANCE': 
      return '#ff7043';
    case 'RELEASE': 
      return '#8884ff';
    case 'TEST': 
      return '#fbc02d';
    default: 
      return 'var(--secondary)';
  }
}

export const TYPE_COLORS: Record<string, string> = {
  GENERAL: 'var(--bw)',
  TICKET: 'var(--primary)',
  TASK: 'var(--secondary)',
  ISSUE: 'var(--accent)',
  BUG: 'var(--danger)',
  DESIGN: 'var(--special)',
  FEATURE_REQUET: 'var(--special)',
  SUPPORT: 'var(--flair)',
  OPTIMIZATION: 'var(--flair)',
  DOCUMENTATION: 'var(--info)',
  RESEARCH: 'var(--info',
  SECURITY: 'var(--error)',
  INVOICE: 'var(--success)',
  PERFORMANCE: 'var(--success)',
  DEPLOYMENT: '#358c29ff',
  MAINTENANCE: '#ff7043',
  RELEASE: '#8884ff',
  TEST: '#fbc02d',
  EVENT: '#0288d1',
  MEETING: '#0288d1',
};