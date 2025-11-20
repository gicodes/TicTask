'use client';

import { useAuth } from './auth';
import { AppEvents } from './events';
import { Ticket } from '@/types/ticket';
import { TicketsRes } from '@/types/axios';
import { apiGet, apiPatch, apiPost } from '@/lib/api';
import { 
  createContext, 
  useCallback,
  useContext, 
  useEffect,  
  useRef, 
  useState 
} from 'react';

type TicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  selectedTicket: Ticket | null;
  fetchTickets: () => Promise<void>;
  selectTicket: (ticketId: string | number | null) => void;
  clearSelection: () => void;
  createTicket?: (payload: Partial<Ticket>) => Promise<Ticket | void>;
  updateTicket: (ticketId: number, updates: Partial<Ticket>) => Promise<Ticket | void>;
  deleteTicket: (id: number | string) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const priorityOrder: Record<string, number> = {
  URGENT: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};

function sortTickets(list: Ticket[]): Ticket[] {
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
}

export const useTickets = () => {
  const context = useContext(TicketContext);

  if (!context) throw new Error("useTickets must be used within a TicketsProvider");
  return context;
};

export const TicketsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const hasFetchedRef = useRef(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const fetchTickets = useCallback(async () => {
    if (hasFetchedRef.current) return; 
    hasFetchedRef.current = true;

    if (!user?.id) return;
    setLoading(true);

    try {
      const res: TicketsRes = await apiGet(`/tickets/${user.id}`);
      const sorted = sortTickets(res.tickets);

      setTickets(sorted);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
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

  const createTicket = async (payload: Partial<Ticket>) => {
    try {
      const created: Ticket = await apiPost('/tickets', payload);
      setTickets(prev => sortTickets([...prev, created]));

      AppEvents.emit("ticket:created", {
        ticketId: payload.id!,
        title: payload.title!,
        createdBy: payload.createdById!,
        assignee: payload.assignee,
      });

      return created;
    } catch (err) {
      console.error("Failed to create ticket:", err);
    }
  };

  const updateTicket = async (ticketId: number, updates: Partial<Ticket>) => {
    try {
      const updated: Ticket = await apiPatch(`/tickets/${ticketId}`, updates);
      
      setTickets(prev => {
        const updatedList = prev.map(t => (t.id === updated.id ? updated : t));
        return sortTickets(updatedList);
      });

      if (selectedTicket?.id === updated.id) setSelectedTicket(updated);

      AppEvents.emit("ticket:updated", {
        ticketId,
        status: updated.status,
        changes: updates,
        updatedBy: user?.id,
      });

      if (updates.assignee) {
        AppEvents.emit("ticket:assigned", {
          ticketId,
          assignee: updated.assignee,
          assignedBy: updated.createdById,
        });
      }

      if (updates.status && updates.status === "RESOLVED") {
        AppEvents.emit("ticket:resolved", { ticketId, resolvedBy: updated.updatedById });
      }

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
    hasFetchedRef.current = false;
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
        createTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
