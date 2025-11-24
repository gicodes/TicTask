import { Ticket, Ticket_Priority, Ticket_Type, Create_Ticket } from '@/types/ticket';
import { DB } from '../_level_0/seed';

const simulate = <T,>(result: T, ms = 200) =>
  new Promise<T>((res) => setTimeout(() => res(result), ms));

export const api = {
  async getTickets() { 
    return simulate(DB.map(t => ({ ...t })), 250); 
  },
  async getTicket(id: string | number) { 
    return simulate(DB.find(t => t.id === id) ?? null, 150); 
  },
  async createTicket(payload: Partial<Create_Ticket>) {
    const now = new Date().toISOString();

    const ticket: Create_Ticket = {
      id: Math.random(),
      title: payload.title ?? 'Untitled',
      description: payload.description ?? '',
      priority: (payload.priority as Ticket_Priority) ?? 'MEDIUM',
      type: (payload.type as Ticket_Type) ?? 'GENERAL',
      createdAt: now,
      updatedAt: now,
      status: payload.status ?? "OPEN",
      assignedToId: payload.assignedToId ?? undefined,
      tags: payload.tags ?? [],
      dueDate: payload.dueDate ?? undefined,
    };

    DB.unshift(ticket);
    return simulate(ticket, 250);
  },
  async updateTicket(id: string | number, patch: Partial<Ticket>) {
    const idx = DB.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Ticket not found');
    DB[idx] = { ...DB[idx], ...patch, updatedAt: new Date().toISOString() || ''};
    return simulate(DB[idx], 150);
  },
};
