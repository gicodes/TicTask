'use client';

import { useAuth } from './auth';
import { Ticket } from '@/types/ticket';
import { apiGet, apiPatch } from '@/lib/api';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { TicketsRes } from '@/types/axios';

type TicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  selectedTicket: Ticket | null;
  fetchTickets: () => Promise<void>;
  selectTicket: (ticketId: string | number | null) => void;
  clearSelection: () => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticketId: number, updates: Partial<Ticket>) => Promise<Ticket | void>;
  deleteTicket: (id: number | string) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error("useTickets must be used within a TicketsProvider");
  return context;
};

export const TicketsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const priorityOrder: Record<string, number> = {
    URGENT: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
  };

  const sortTickets = (list: Ticket[]): Ticket[] => {  // Sorting algorithm: DueDate → Priority → CreatedAt
    return [...list].sort((a, b) => {
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;

      if (a.dueDate && b.dueDate) {
        const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (diff !== 0) return diff;
      }

      const pDiff = (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99);
      if (pDiff !== 0) return pDiff;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      if (!user?.id) return;
      const res: TicketsRes = await apiGet(`/tickets/${user.id}`);
      const sorted = sortTickets(res.tickets);
      setTickets(sorted);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const selectTicket = (ticketId: string | number | null) => {
    if (!ticketId) return setSelectedTicket(null);
    const found = tickets.find(t => t.id === Number(ticketId)) || null;
    setSelectedTicket(found);
  };

  const clearSelection = () => setSelectedTicket(null); 

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => sortTickets([...prev, ticket]));
  };

  const updateTicket = async (ticketId: number, updates: Partial<Ticket>) => {
    try {
      const updated: Ticket = await apiPatch(`/tickets/${ticketId}`, updates);
      setTickets(prev => {
        const updatedList = prev.map(t => (t.id === updated.id ? updated : t));
        return sortTickets(updatedList);
      });
      if (selectedTicket?.id === updated.id) setSelectedTicket(updated);
      return updated;
    } catch (err) {
      console.error("Failed to update ticket:", err);
    }
  };

  const deleteTicket = (id: string | number) => {
    setTickets(prev => prev.filter(t => t.id !== Number(id)));
    if (selectedTicket?.id === Number(id)) clearSelection();
  };

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        selectedTicket,
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
