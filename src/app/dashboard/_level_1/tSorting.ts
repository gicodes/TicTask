import { Ticket } from "@/types/ticket";

const daysUntil = (dueDate?: string | Date | null) => {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const getTicketOrder = (t: Ticket) => {
  const days = daysUntil(t.dueDate);

  // 1. UPCOMING & <3 days
  if (t.status === 'UPCOMING' && days !== null && days < 3) return 1;

  // 2. IN_PROGRESS
  if (t.status === 'IN_PROGRESS') return 2;

  // 3. OPEN & <7 days
  if (t.status === 'OPEN' && days !== null && days < 7) return 3;

  // 4. UPCOMING & >=3 days
  if (t.status === 'UPCOMING' && days !== null && days >= 3) return 4;

  // 5. OPEN & >=7 days
  if (t.status === 'OPEN' && days !== null && days >= 7) return 5;

  // 6. Tickets without dueDate (except final categories)
  if (!t.dueDate && !['RESOLVED', 'CLOSED', 'CANCELLED'].includes(t.status ?? "MEDIUM"))
    return 6;

  // 7. RESOLVED
  if (t.status === 'RESOLVED') return 7;

  // 8. CLOSED
  if (t.status === 'CLOSED') return 8;

  // 9. CANCELLED
  if (t.status === 'CANCELLED') return 9;

  return 999; // fallback
};