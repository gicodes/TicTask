"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "./auth";
import { AppEvents } from "./events";
import {
  getTeamTickets,
  getTeamTicket,
  createTeamTicket,
  updateTeamTicket,
  deleteTeamTicket,
  getCommentOnTeamTicket,
  commentOnTeamTicket,
  getHistoryOnTeamTicket,
} from "@/lib/teams";
import {
  CreateTeamTicketPayload,
} from "@/types/team";
import { sortTickets } from "./tickets";
import { TeamTicketContextType, Ticket } from "@/types/ticket";

const TeamTicketContext = createContext<TeamTicketContextType | undefined>(undefined);

export function TeamTicketProvider({
  teamId,
  children,
}: {
  teamId: number | null;
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const hasFetched = useRef(false);

  const fetchTickets = useCallback(
    async (force = false) => {
      if (!teamId) return;
      if (!force && hasFetched.current) return;

      try {
        setLoading(true);
        const data = await getTeamTickets(teamId);
        
        setTickets(sortTickets(data));
        hasFetched.current = true;
      } catch (err) {
        console.error("Failed to fetch team tickets:", err);
      } finally {
        setLoading(false);
      }
    },
    [teamId]
  );

  useEffect(() => {
    if (user?.id) {
      hasFetched.current = false;
      fetchTickets();
    }
  }, [teamId, fetchTickets, user?.id]);


  const refreshTicket = async (ticketId: number) => {
    if (!teamId) return;

    const updated = await getTeamTicket(teamId, ticketId);

    setTickets(prev =>
      sortTickets(prev.map(t => (t.id === ticketId ? updated : t)))
    );

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(updated);
    }
  };

  const createTicket = async (payload: CreateTeamTicketPayload) => {
    if (!teamId) return null;

    try {
      const ticket = await createTeamTicket(teamId, payload);

      setTickets(prev => sortTickets([...prev, ticket]));

      AppEvents.emit("team:ticket:created", {
        teamId,
        ticketId: ticket.id,
        createdBy: user?.id,
      });

      return ticket;
    } catch (err) {
      console.error("Create failed:", err);
      return null;
    }
  };

  const updateTicket = async (
    ticketId: number,
    updates: Partial<Ticket>
  ) => {
    if (!teamId) return null;

    try {
      const updated = await updateTeamTicket(teamId, ticketId, updates);

      setTickets(prev =>
        sortTickets(prev.map(t => (t.id === ticketId ? updated : t)))
      );

      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(updated);
      }

      AppEvents.emit("team:ticket:updated", {
        teamId,
        ticketId,
        updates,
      });

      return updated;
    } catch (err) {
      console.error("Update failed:", err);
      return null;
    }
  };

  const deleteTicketHandler = async (ticketId: number) => {
    if (!teamId) return;

    await deleteTeamTicket(teamId, ticketId);

    setTickets(prev => prev.filter(t => t.id !== ticketId));

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(null);
    }
  };

  const getTicket = async (ticketId: number) => {
    if (!teamId || !ticketId) return null;
    return await getTeamTicket(teamId, ticketId);
  };

  const getComments = async (ticketId: number) => {
    if (!teamId) return [];
    return await getCommentOnTeamTicket(teamId, ticketId);
  };

  const addComment = async (ticketId: number, content: string) => {
    if (!teamId) return;

    await commentOnTeamTicket(teamId, ticketId, { content });

    AppEvents.emit("team:ticket:comment", {
      teamId,
      ticketId,
      author: user?.id,
    });
  };

  const getHistory = async (ticketId: number) => {
    if (!teamId) return [];
    return await getHistoryOnTeamTicket(teamId, ticketId);
  };

  const selectTicket = (ticketId: number | null) => {
    if (!ticketId) {
      setSelectedTicket(null);
      return;
    }

    const found = tickets.find(t => t.id === ticketId) || null;
    setSelectedTicket(found);
  };

  const clearSelection = () => setSelectedTicket(null);

  const invalidate = () => {
    hasFetched.current = false;
  };

  const value = useMemo(
    () => ({
      tickets,
      loading,
      getTicket,
      selectedTicket,
      fetchTickets,
      refreshTicket,
      selectTicket,
      clearSelection,
      createTicket,
      updateTicket,
      deleteTicket: deleteTicketHandler,
      getComments,
      addComment,
      getHistory,
      invalidate,
    }),
    [tickets, loading, selectedTicket]
  );

  return (
    <TeamTicketContext.Provider value={value}>
      {children}
    </TeamTicketContext.Provider>
  );
}

export const useTeamTicket = () => {
  const ctx = useContext(TeamTicketContext);
  if (!ctx)
    throw new Error("useTeamTicket must be used inside TeamTicketProvider");
  return ctx;
};
