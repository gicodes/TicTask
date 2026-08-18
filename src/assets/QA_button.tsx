"use client";

import { Ticket } from "@/types/ticket";
import { useTickets } from "@/providers/tickets";
import { useTeamTicket } from "@/providers/teamTickets";
import { 
  Box, 
  Button, 
  Card, 
  Fade, 
  Stack, 
  Tooltip, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { 
  PlayArrowRounded, 
  CheckCircleRounded, 
  CancelRounded, 
  LockRounded, 
  LockOpenRounded 
} from "@mui/icons-material";
import { GiAbstract050 } from "react-icons/gi";
import { useState, useRef, useEffect } from "react";

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
interface Props {
  localTicket: Ticket;
  disabled?: boolean;
}
type ActionKey = "START" | "RESOLVE" | "CLOSE" | "OPEN" | "CANCEL";

interface ActionConfig {
  key: ActionKey;
  label: string;
  status: string;
  color: "primary" | "success" | "warning" | "error" | "inherit";
  icon: React.ReactNode;
  variant?: "contained" | "outlined";
}

const getAvailableActions = (status: string): ActionConfig[] => {
  switch (status) {
    case "UPCOMING":
    case "OPEN":
      return [
        {
          key: "START",
          label: "Start",
          status: "IN_PROGRESS",
          color: "primary",
          icon: <PlayArrowRounded fontSize="small" />,
          variant: "contained",
        },
        {
          key: "RESOLVE",
          label: "Resolve",
          status: "RESOLVED",
          color: "success",
          icon: <CheckCircleRounded fontSize="small" />,
        },
        {
          key: "CANCEL",
          label: "Cancel",
          status: "CANCELLED",
          color: "error",
          icon: <CancelRounded fontSize="small" />,
        },
      ];

    case "IN_PROGRESS":
      return [
        {
          key: "RESOLVE",
          label: "Resolve",
          status: "RESOLVED",
          color: "success",
          icon: <CheckCircleRounded fontSize="small" />,
          variant: "contained",
        },
        {
          key: "CLOSE",
          label: "Close",
          status: "CLOSED",
          color: "warning",
          icon: <LockRounded fontSize="small" />,
        },
        {
          key: "CANCEL",
          label: "Cancel",
          status: "CANCELLED",
          color: "error",
          icon: <CancelRounded fontSize="small" />,
        },
      ];

    case "RESOLVED":
      return [
        {
          key: "CLOSE",
          label: "Close",
          status: "CLOSED",
          color: "warning",
          icon: <LockRounded fontSize="small" />,
          variant: "contained",
        },
        {
          key: "OPEN",
          label: "Re-open",
          status: "OPEN",
          color: "primary",
          icon: <LockOpenRounded fontSize="small" />,
        },
      ];

    case "CLOSED":
      return [
        {
          key: "OPEN",
          label: "Re-open",
          status: "OPEN",
          color: "primary",
          icon: <LockOpenRounded fontSize="small" />,
          variant: "contained",
        },
      ];

    default:
      return [];
  }
};

export default function QATeamActions({ localTicket, disabled = false }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const { updateTicket } = useTeamTicket();

  const [visible, setVisible] = useState(true);
  const [forceShow, setForceShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const actions = getAvailableActions(localTicket.status);

  useEffect(() => {
    if (forceShow) return;

    setVisible(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [localTicket.status, forceShow]);

  const handleAction = async (status: string) => {
    const now = new Date().toISOString();

    const payload: Record<string, any> = {
      teamId: localTicket.teamId,
      status,
      assignTo: localTicket.assignedTo?.email || undefined,
      assignees: localTicket.assignees?.length
        ? localTicket.assignees.map((u) => u.id)
        : undefined,
    };

    if (status === "IN_PROGRESS") payload.startedAt = now;
    if (status === "RESOLVED" || status === "CLOSED" || status === "CANCELLED") {
      payload.closedAt = now;
    }
    if (status === "OPEN") {
      payload.closedAt = null;
    }

    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    await updateTicket(localTicket.id, payload);
  };

  if (actions.length === 0) return null;

  return (
    <>
      <Fade in={visible || forceShow} timeout={400}>
        <Box
          sx={{
            position: "fixed",
            top: { xs: 240, sm: 242, md: 256, lg: 260 },
            left: 0,
            right: 0,
            zIndex: 1100,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Card
            elevation={0}
            sx={{
              pointerEvents: "auto",
              px: 1.5,
              py: 1,
              borderRadius: 999,
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(30,30,30,0.88)"
                  : "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              justifyContent="center"
            >
              {actions.map((action) => (
                <Button
                  key={action.key}
                  size={isMobile ? "small" : "medium"}
                  variant={action.variant || "outlined"}
                  color={action.color}
                  disabled={disabled}
                  startIcon={action.icon}
                  onClick={() => handleAction(action.status)}
                  sx={{
                    borderRadius: 999,
                    px: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    minWidth: isMobile ? 90 : 110,
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Card>
        </Box>
      </Fade>

      <Fade in={!visible && !forceShow}>
        <Box
          sx={{
            position: "fixed",
            top: { xs: 240, sm: 242, md: 256, lg: 260 },
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1100,
          }}
        >
          <Tooltip title="Show quick actions">
            <Button
              size="small"
              onClick={() => setForceShow(true)}
              sx={{
                borderRadius: 999,
                px: 2,
                bgcolor: "background.paper",
                boxShadow: 2,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              <GiAbstract050 />
            </Button>
          </Tooltip>
        </Box>
      </Fade>
    </>
  );
}
