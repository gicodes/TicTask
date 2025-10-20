export const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return { bg: 'var(--accent)', color: 'var(--accent-contrast)' };
      case 'IN_PROGRESS':
        return { bg: '#ffa50066', color: 'var(--bw)' };
      case 'RESOLVED':
        return { bg: 'var(--success)', color: 'var(--accent-contrast)' };
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
      return { bg: '#9ccc65', color: 'black' };
    default:
      return { bg: 'var(--surface-1)', color: 'var(--foreground)' };
  }
};