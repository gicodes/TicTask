'use client';

import { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useState,
  useRef, 
} from "react";
import { useAuth } from "./auth";
import { AppEvents } from "./events";
import { TicketsRes, TicketRes, ErrorResponse } from "@/types/axios";
import { apiGet, apiPatch, apiPost, apiPut } from "@/lib/axios";
import { Ticket, TicketHistory, TicketNote, priorityOrder, statusOrder, CreateTicketResult } from "@/types/ticket";

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
  fetchTicketNote: (ticketId: number) => Promise<TicketNote[] | undefined>;
  fetchTicketHistory: (ticketId: number) => Promise<TicketHistory[] | undefined>;
  selectTicket: (ticketId: string | number | null) => void;
  clearSelection: () => void;
  createTicket: (payload: Partial<Ticket>) => Promise<Ticket | unknown>;
  addTicketComment: (ticketId: number, content: string) => Promise<TicketRes | undefined>;
  addTicketHistory: (ticketId: number, history: Partial<TicketHistory>) => Promise<TicketRes | undefined>;
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

  const createTicket = async (
    payload: Partial<Ticket>,
  ): Promise<CreateTicketResult> => {
    try {
      const response = await apiPost<TicketsRes>("/tickets", payload);

      if (!response.ok) {
        const errorMessage = response.message ?? "Ticket could not be created";

        return {
          success: false,
          error: errorMessage,
        };
      }

      const ticket = response.ticket;

      setTickets((prev) => sortTickets([...prev, ticket]));

      AppEvents.emit("ticket:created", {
        ticketId: ticket.id,
        type: ticket.type,
        createdBy:
          ticket.createdById === user?.id
            ? "you"
            : ticket.createdBy?.name?.split(" ")[0] || "team",
        title: ticket.title,
      });

      return { success: true, ticket };
    } catch (err) {
      const message = (err as ErrorResponse).response.data.message || "Unexpected error occurred";

      console.error("Ticket creation failed:", message, err);

      return {
        success: false,
        error: message,
      };
    }
  };

  const fetchTicketNote = async (ticketId: number) => {
    try {
      const res: TicketRes = await apiGet(`/tickets/${ticketId}/get-comment`);

      if (!res.ok) return;

      return res.notes;
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const fetchTicketHistory = async (ticketId: number) => {
    try {
      const res: TicketRes = await apiGet(`/tickets/${ticketId}/get-history`);
      
      if (!res.ok) return;
      
      return res.history
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const updateTicket = async (ticketId: number, updates: Partial<Ticket>) => {
    try {
      const updated: TicketsRes = await apiPatch(`/tickets/${ticketId}`, updates);

      if (!updated.ok)
      setTickets(prev => sortTickets(prev.map(t => t.id === updated?.ticket?.id ? updated.ticket : t)));
      
      if (selectedTicket?.id === updated.ticket.id) {
        setSelectedTicket(updated.ticket);
      }

      AppEvents.emit("ticket:updated", {
        ticketId,
        type: updated.ticket.type,
        status: updated.ticket.status!,
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

      if (updates.status === "CLOSED") {
        AppEvents.emit("ticket:closed", { 
          ticketId,  
          closedBy: user?.id 
        });
      }

      return updated.ticket;
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const addTicketComment = async (ticketId: number, content: string) => {
    try {
      const updated: TicketRes = await apiPut(`/tickets/${ticketId}/add-comment`, { 
        content, 
        userId: user?.id
      });

      AppEvents.emit("ticket:comment", {
        ticketId,
        commentId: (updated as TicketRes).note?.id ?? '',
        text: content,
        author: updated.note?.authorId===user?.id ? 'you' : updated.note?.authorId ?? 'unknown'
      });

      return updated;
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const addTicketHistory = async (ticketId: number, history: Partial<TicketHistory>) => {
    try {
      const updated: TicketRes = await apiPut(`/tickets/${ticketId}/add-history`, {
        history, 
        userId: user?.id
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
        fetchTicketNote,
        fetchTicketHistory,
        addTicketComment,
        addTicketHistory,
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
