import { Button } from "@mui/material";
import { useTickets } from "@/providers/tickets";
import { useTeamTicket } from "@/providers/teamTickets";
import { Ticket } from "@/types/ticket";

export type QA_Status = 'RESOLVED' | 'CANCELLED' | 'IN_PROGRESS';
export type QA_ColorVariations = 'success' | 'secondary' | 'warning';

interface QuickActions {
  ticketID: string | number;
  color: QA_ColorVariations;
  status: QA_Status;
  title: string;
  disabled: boolean;
  team?:boolean;
  onClose?: () => void;
  onUpdate?: () => void;
}

export const QA_Btn = ({ 
  ticketID, 
  color, 
  title, 
  status, 
  disabled=false,
  team=false,
  onUpdate,
  onClose,
} : QuickActions ) => {
  const { updateTicket } = useTickets();
  const { updateTicket: updateTeamTicket } = useTeamTicket();

  const handleQuickAction = async () => {
    const now = new Date().toISOString();

    if (team) {
      const payload: Record<string, any> = { status };

      if (status === 'IN_PROGRESS') {
        payload.startedAt = now;
      }

      if (status === 'RESOLVED' || status === 'CANCELLED') {
        payload.closedAt = now;
      }

      await updateTeamTicket(Number(ticketID), payload);
    } else {
      await updateTicket(Number(ticketID), { status }).then(() => {
        onUpdate?.();
        onClose?.();
      });
    }

    onUpdate?.();
    onClose?.();
  };

  return (
    <Button  
      color={color} 
      variant="outlined" 
      disabled={disabled}
      onClick={handleQuickAction}
      sx={{ 
        boxShadow: 2,
        height: { xs: 36, sm: ''},
        maxWidth: { xs: 96, sm: 'none'},
        fontSize: { xs: 12, sm: 15, md: 16}
      }}
    >
      {disabled ? "CLOSED" : title}
    </Button>
  )}