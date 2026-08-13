import { useState } from "react";
import { Button } from "@/assets/buttons";
import { useAlert } from "@/providers/alert";
import { USER_STATUS_OPTIONS } from "../_level_0/constants";
import { useUpdateUserStatus } from "@/hooks/useUpdateStatus";
import { StatusProfileProps, UserStatus } from "@/types/users";
import { Badge, Box, IconButton, Stack, Typography } from "@mui/material";

export function SetStatusButton (
  profile: StatusProfileProps 
) {
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();
  const { updateStatus, loading } = useUpdateUserStatus(profile.id);

  const handleStatusChange = async (status: UserStatus
    ) => {    
    if (profile.data.status === status) {
      showAlert(`Your status is already set as ${status.toLowerCase()}`);
      return;
    }
    
    await updateStatus({ status });
    setOpen(false);
  };

  const currentStatus = USER_STATUS_OPTIONS.find(
    (opt) => opt.value === profile.data.status
  );

  return (
    <Stack onClick={() => setOpen((v) => !v)}>
      <Box 
        p={1}
        borderRadius={10}
        sx={{ 
          cursor: 'pointer',
          '&:hover': {
            borderColor: `gold`,
          },
        }}
        border={'0.5px outset var(--foreground)'}
      >
        <Stack direction="row" gap={1.5} px={0.5} alignItems="center">
          <IconButton size="small" sx={{ fontSize: 11}}>{currentStatus?.emoji ?? "🔘"}</IconButton>
          <Typography fontSize={15}>Set Status</Typography>
        </Stack>
      </Box>

      {open && (
        <Stack
          p={2}
          gap={1}
          mx={'auto'}
          maxWidth={360}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-around"
          bgcolor={'rgba(0,0,0,0.1)'}
        >
          { loading ? (
            <Typography>Loading...</Typography>
          ) : (
            USER_STATUS_OPTIONS.map((option) => (
              <Button 
                tone="action"
                variant="contained"
                key={option.value}
                size="small"
                onClick={() => handleStatusChange(option.value)}
              >
                <Stack 
                  gap={1.5}
                  minWidth={80}
                  maxWidth={120}
                  direction={'row'} 
                  alignItems={'center'}
                >
                  <Badge sx={{ fontSize: 7}}> {option.emoji} </Badge>
                  <Typography variant="subtitle2"> {option.label} </Typography>
                </Stack>
              </Button>
            )
          ))}
        </Stack>
      )}
    </Stack>
  );
}