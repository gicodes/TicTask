import { useState } from "react";
import { Button } from "@/assets/buttons";
import { UserStatus } from "@/types/users";
import { useAlert } from "@/providers/alert";
import { Stack, Typography } from "@mui/material";
import { USER_STATUS_OPTIONS } from "../_level_0/constants";
import { useUpdateUserStatus } from "@/hooks/useUpdateStatus";

export function SetStatusButton({ 
  profile 
}: { 
  profile: { 
    id: number,
    status?: UserStatus
  } 
}) {
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();
  const { updateStatus, loading } = useUpdateUserStatus(profile.id);

  const handleStatusChange = async (status: UserStatus) => {    
    if (profile.status === status) {
      showAlert(`Your status is already set as ${status.toLowerCase()}`)
      return;
    }
    await updateStatus({ status });
    setOpen(false);
  };

  return (
    <>
      <Button
        tone="inverted"
        onClick={() => setOpen(v => !v)}
        disabled={loading}
        style={{ 
          padding: 7.5, 
          fontSize: 13, 
          margin: '1px 0', 
          display: 'flex', 
          borderRadius: 5,
          justifyContent: 'flex-start',
        }} 
      >
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          <span>🗿</span>
          <span>Set Status</span>
        </Stack>
      </Button>

      {open && (
        <Stack
          p={1}
          gap={1}
          borderRadius={2}
          direction={'row'}
          flexWrap={'wrap'}
          justifyContent={'space-around'}
          border={'0.1px dotted var(--disabled)'}
        >
          {USER_STATUS_OPTIONS.map(option => (
            <Button
              key={option.value}
              size="small"
              onClick={() => handleStatusChange(option.value)}
              style={{ justifyContent: "flex-start", minWidth: 100, maxWidth: 120 }}
            >
              <Typography fontSize={13}>
                {option.emoji} &nbsp; {option.label}
              </Typography>
            </Button>
          ))}
        </Stack>
      )}
    </>
  );
}
