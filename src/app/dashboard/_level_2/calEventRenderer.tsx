import React, { useMemo } from 'react';

export default function EventRenderer({ event }: { event: any }) {
  const color = useMemo(() => {
    switch (event.priority) {
      case 'URGENT':
        return 'var(--danger)';
      case 'HIGH':
        return 'var(--error)';
      case 'MEDIUM':
        return 'var(--accent)';
      case 'LOW':
        return 'var(--secondary)';
      default:
        return 'var(--surface-2)';
    }
  }, [event.priority]);

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 8,
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{event.title}</div>
        {event.status && (
          <div style={{ fontSize: 11, opacity: 0.8 }}>{String(event.status)}</div>
        )}
      </div>
    </div>
  );
}
