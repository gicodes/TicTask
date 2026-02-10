import { Button } from "@mui/material";
import { useTickets } from "@/providers/tickets";

export type QA_Status = 'RESOLVED' | 'CANCELLED' | 'IN_PROGRESS';
export type QA_ColorVariations = 'success' | 'secondary' | 'warning';

interface QuickActions {
  ticketID: string | number;
  color: QA_ColorVariations;
  status: QA_Status;
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