import { Button } from "@mui/material";
import { Ticket } from "@/types/ticket";
import { useTickets } from "@/providers/tickets";
import { useTeamTicket } from "@/providers/teamTickets";

export type QA_Status = 'RESOLVED' | 'CANCELLED' | 'IN_PROGRESS';
export type QA_ColorVariations = 'success' | 'secondary' | 'warning';

interface QuickActionProps {
  ticketID: string | number;
  color: QA_ColorVariations;
  status: QA_Status;
  title: string;
  disabled?: boolean;
  onClose?: () => void;
  onUpdate?: () => void;
}

interface TeamQuickActionProps extends QuickActionProps {
  localTicket: Ticket;
}

/**
 * Shared button UI
 */
const QuickActionButton = ({
  color,
  title,
  disabled = false,
  onClick,
}: {
  color: QA_ColorVariations;
  title: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      color={color}
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      sx={{
        boxShadow: 2,
        height: { xs: 36, sm: '' },
        maxWidth: { xs: 96, sm: 'none' },
        fontSize: { xs: 12, sm: 15, md: 16 },
      }}
    >
      {disabled ? 'CLOSED' : title}
    </Button>
  );
};

export const QA_Btn = ({
  ticketID,
  color,
  title,
  status,
  disabled = false,
  onUpdate,
  onClose,
}: QuickActionProps) => {
  const { updateTicket } = useTickets();

  const handleQuickAction = async () => {
    await updateTicket(Number(ticketID), { status });

    onUpdate?.();
    onClose?.();
  };

  return (
    <QuickActionButton
      color={color}
      title={title}
      disabled={disabled}
      onClick={handleQuickAction}
    />
  );
};


/**
 * Team ticket quick action
 *
 * Must be used inside TeamProvider.
 */
export const QA_TeamBtn = ({
  localTicket,
  color,
  title,
  status,
  disabled = false,
  onUpdate,
  onClose,
}: TeamQuickActionProps) => {
  const { updateTicket: updateTeamTicket } = useTeamTicket();

  const handleQuickAction = async () => {
    const now = new Date().toISOString();

    const payload: Record<string, any> = {
      teamId: localTicket.teamId,
      title: localTicket.title?.trim() || undefined,
      description: localTicket.description?.trim() || undefined,
      status,
      assignTo: localTicket.assignedTo?.email || undefined,
      assignees: localTicket.assignees?.length
        ? localTicket.assignees.map((u) => u.id)
        : undefined,
    };

    if (status === 'IN_PROGRESS') {
      payload.startedAt = now;
    }

    if (status === 'RESOLVED' || status === 'CANCELLED') {
      payload.closedAt = now;
    }

    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    console.log('QA button payload', payload);

    await updateTeamTicket(localTicket.id, payload);

    onUpdate?.();
    onClose?.();
  };

  return (
    <QuickActionButton
      color={color}
      title={title}
      disabled={disabled}
      onClick={handleQuickAction}
    />
  );
};
