'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
};

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Ticket | null>(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tickets');
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  }, []);

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
