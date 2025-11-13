import { TicketPriority, TicketStatus } from '@/types/ticket';
import React, { useMemo } from 'react';
import { priorityColor } from '../_level_1/tColorVariants';

export interface TicketEvent {
  priority: TicketPriority;
  title: string;
  status: TicketStatus;
}
export default function EventRenderer({ event }: { event: TicketEvent }) {
  const color = useMemo(() => {
    return priorityColor(event.priority)
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
