import { getStatusColor, getTypeColor, priorityColor } from '../_level_1/tColorVariants';
import { TicketPriority, TicketStatus, TicketType } from '@/types/ticket';
import { useMemo } from 'react';

export interface TicketEvent {
  type: Partial<TicketType>;
  priority: TicketPriority;
  title: string;
  status: TicketStatus;
  start: Date | string;
  end: Date | string;
}

export interface EventSlot {
  start: Date;
  end: Date;
}

export default function EventRenderer({ event }: { event: TicketEvent }) {
  const todaysDate = new Date().toLocaleDateString();
  const dueDate = new Date(event.start || event.end).toLocaleDateString();

  const color = useMemo(() => {
    if (dueDate===todaysDate)
      return getStatusColor('OPEN').color;
    if (event.priority)
      return priorityColor(event.priority);
    else (event.type) 
      return getTypeColor(event.type)
  }, [event.priority]);

  return (
    <div 
      style={{ 
        display: 'flex', 
        gap: 10, 
        alignItems: 'center', 
        width: '100%' 
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 8,
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <div 
        style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          display: 'grid',
          gap: 5
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 12.5 }}>
          {event.title}
        </div>
        {event.status && (
          <div style={{ fontSize: 10, opacity: 0.75 }}>
            {String(event.status)}
          </div>
        )}
      </div>
    </div>
  );
}
