'use client';

import { useAuth } from './auth';
import { apiGet } from '@/lib/api';
import { Ticket } from '@/types/ticket';
import { TicketsRes } from '@/types/axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type TicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  selected: Ticket | null;
  fetchTickets: () => void;
  selectTicket: (ticket: Ticket) => void;
  clearSelection: () => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error("useTickets must be used within TicketProvider");
  return context;
};

export const TicketsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Ticket | null>(null);    
    
  const priorityOrder = { URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };

  function sortTickets(tickets: Ticket[]): Ticket[] {
    return [...tickets].sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;

      if (a.dueDate && b.dueDate) {
        const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (diff !== 0) return diff;
      }

      const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pDiff !== 0) return pDiff;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      if (!user?.id) return;
      const res: TicketsRes = await apiGet(`/tickets/${user?.id}`);
      const data = sortTickets(res.tickets);
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const selectTicket = (ticket: Ticket) => setSelected(ticket);
  const clearSelection = () => setSelected(null);

  const addTicket = (ticket: Ticket) => setTickets(prev => [...prev, ticket]);
  const updateTicket = (ticket: Ticket) => {
    setTickets(prev => prev.map(t => (t.id === ticket.id ? ticket : t)));
  };
  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    if (selected?.id === id) clearSelection();
  };

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        selected,
        fetchTickets,
        selectTicket,
        clearSelection,
        addTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
