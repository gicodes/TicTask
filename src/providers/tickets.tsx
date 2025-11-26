'use client';

import { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useRef, 
  useState 
} from "react";
import { useAuth } from "./auth";
import { AppEvents } from "./events";
import { TicketsRes } from "@/types/axios";
import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { Ticket, priorityOrder, statusOrder } from "@/types/ticket";

export const sortTickets = (list: Ticket[]): Ticket[] => {
  if (!Array.isArray(list)) return [];

  return [...list].sort((a, b) => {
    const sA = statusOrder[a.status] ?? 999;
    const sB = statusOrder[b.status] ?? 999;

    if (sA !== sB) return sA - sB;

    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && !b.dueDate) return -1;

    if (a.dueDate && b.dueDate) {
      const diff =
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime();

      if (diff !== 0) return diff;
    }

    const pA = priorityOrder[a.priority ?? "MEDIUM"];
    const pB = priorityOrder[b.priority ?? "MEDIUM"];
    if (pA !== pB) return pA - pB;

    return (
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
    );
  });
};

type TicketContextType = {
  tickets: Ticket[];
  loading: boolean;
  selectedTicket: Ticket | null;
  fetchTickets: (force?: boolean) => Promise<void>;
  selectTicket: (ticketId: string | number | null) => void;
  clearSelection: () => void;
  createTicket: (payload: Partial<Ticket>) => Promise<Ticket | undefined>;
  updateTicket: (ticketId: number, updates: Partial<Ticket>) => Promise<Ticket | undefined>;
  deleteTicket: (id: number | string) => void;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const hasFetched = useRef(false);

  const fetchTickets = useCallback(async (force = false) => {
    if (!user?.id) {
      setTickets([]);
      setLoading(false);
      
      return;
    }

    if (!force && hasFetched.current) return;

    try {
      setLoading(true);
      const res: TicketsRes = await apiGet(`/tickets/${user.id}`);
      
      if (res?.tickets) {
        const sorted = sortTickets(res.tickets);
        setTickets(sorted);
        hasFetched.current = true;
      }
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      hasFetched.current = false;
      fetchTickets();
    }
  }, [user?.id, fetchTickets]);

  const createTicket = async (payload: Partial<Ticket>) => {
    try {
      const created: Ticket = await apiPost(`/tickets`, payload);
      setTickets(prev => sortTickets([...prev, created]));

      AppEvents.emit("ticket:created", { 
        ticketId: created.id, 
        type: created.type, 
        createdBy: created.createdById===user?.id ? "You" : created.createdById, 
        title: created.title 
      });

      return created;
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const updateTicket = async (ticketId: number, updates: Partial<Ticket>) => {
    try {
      const updated: Ticket = await apiPatch(`/tickets/${ticketId}`, updates);
      setTickets(prev => sortTickets(prev.map(t => t.id === updated.id ? updated : t)));
      
      if (selectedTicket?.id === updated.id) {
        setSelectedTicket(updated);
      }

      AppEvents.emit("ticket:updated", {
        ticketId,
        type: updated.type,
        status: updated.status!,
        updatedBy: user?.id,
        changes: updates,
      });

      if (updates.assignedToId) {
        AppEvents.emit("ticket:assigned", {
          ticketId,
          assignee: updates.assignedToId,
          assignedBy: user?.id,
        });
      }

      if (updates.status === "CLOSED") 
        AppEvents.emit("ticket:closed", { 
          ticketId,  
          closedBy: user?.id 
        });

      return updated;
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const selectTicket = (ticketId: string | number | null) => {
    if (!ticketId) {
      setSelectedTicket(null);
      return;
    }
    const found = tickets.find((t) => t.id === Number(ticketId)) || null;
    setSelectedTicket(found);
  };

  const clearSelection = () => setSelectedTicket(null);

  const deleteTicket = (id: string | number) => {
    setTickets(prev => prev.filter(t => t.id !== Number(id)));
  };

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
  )
}

export const useTickets = () => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used inside TicketsProvider");
  return ctx;
};