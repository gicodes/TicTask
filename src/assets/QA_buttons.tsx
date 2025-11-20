import { Button } from "@mui/material";

type Status = 'RESOLVED' | 'CANCELLED' | 'IN_PROGRESS';
type ColorVariations = 'success' | 'secondary' | 'warning';

interface QuickActions {
  ticketID: string | number;
  color: ColorVariations;
  status: Status;
  title: string;
  disabled: boolean;
  onClose?: () => void;
  onUpdate?: () => void;
  updateTicket?: (id: number, data: { status: Status }) => Promise<void>;
}

export const QA_BUTTON = ({ 
  ticketID, 
  color, 
  title, 
  status, 
  disabled=false,
  updateTicket,
  onUpdate,
  onClose
} : QuickActions) => (
  <Button 
    variant="outlined"  
    color={color} 
    sx={{ boxShadow: 2}}
    disabled={disabled}
    onClick={() => {
      if (updateTicket) {
        updateTicket(Number(ticketID), { status: status }).then(() => {
          onUpdate?.();
          onClose?.();
        });
      } else {
        onUpdate?.();
        onClose?.();
      }
    }}
  >
    {title}
  </Button>
)
