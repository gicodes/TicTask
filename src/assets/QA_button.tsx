import { Button } from "@mui/material";
import { useTickets } from "@/providers/tickets";

type Status = 'RESOLVED' | 'CANCELLED' | 'IN_PROGRESS';
type ColorVariations = 'success' | 'secondary' | 'warning';

interface QuickActions {
  ticketID: string | number;
  color: ColorVariations;
  status: Status;
  title: string;
  disabled: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const QA_Btn = ({ 
  ticketID, 
  color, 
  title, 
  status, 
  disabled=false,
  onUpdate,
  onClose,
} : QuickActions ) => {
  const { updateTicket } = useTickets();

  const handleQuickAction = () => {
    updateTicket(Number(ticketID), { status: status }).then(() => {
      onUpdate?.();
      onClose?.();
    });
  }

  return (
    <Button 
      variant="outlined"  
      color={color} 
      sx={{ boxShadow: 2}}
      disabled={disabled}
      onClick={handleQuickAction}
    >
      {disabled ? "PAUSED" : title}
    </Button>
  )}
