import { getStatusColor, getTypeColor, priorityColor } from '../_level_1/tColorVariants';
import { PlannerEvent } from '@/types/planner';
import { useMemo } from 'react';

export default function EventRenderer({ event }: { event: PlannerEvent }) {
  const todaysDate = new Date().toLocaleDateString();
  const dueDate = 
    new Date(event.dueDate!).toLocaleDateString() ?? 
    new Date(event.endTime!).toLocaleDateString() ?? 
    new Date(event.startTime!).toLocaleDateString();
    
  const notActive = (event.status === "CANCELLED" || event.status=== "CLOSED" || event.status=== "RESOLVED")

  const color = useMemo(() => {
    if (notActive)
      return priorityColor("LOW");
    if (dueDate===todaysDate)
      return getStatusColor('OPEN').color;
    if (event.priority)
      return priorityColor(event.priority);
    if (event.severity)
      return priorityColor(event.severity);
    if (event.impact)
      return priorityColor(event.impact)
    else (event.type) 
      return getTypeColor(event.type)
  }, [event.priority]);

  if (notActive) 
    return  null;
  else
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
