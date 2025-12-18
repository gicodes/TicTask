'use client';

import type { User } from '@/types/users';
import { FaBriefcase } from 'react-icons/fa6';
import { Paper, Stack, Typography, TextField } from '@mui/material';
import { BsPersonWorkspace } from 'react-icons/bs';

export interface ProfileProps {
  profile: User | null;
  isEditing: boolean;
  handleChange: (field: keyof User, value: string | unknown) => void;
}

export function PersonalSection({
  profile,
  isEditing,
  handleChange,
}: ProfileProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        Professional Details
      </Typography>
      
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FaBriefcase size={16} />
          {isEditing ? (
            <TextField
              size="small"
              variant="standard"
              placeholder={profile?.position || ' Specify Professional Position'}
              value={profile?.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          ) : <Typography variant="body2"> {profile?.position || <i>&nbsp;Position not specified</i>}</Typography>
          }
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <BsPersonWorkspace size={16} />
          {isEditing ? (
            <TextField
              size="small"
              variant="standard"
              placeholder={profile?.data?.workSpaceName || 'Specify Workspace Name'}
              value={profile?.data?.workSpaceName || ''}
              onChange={(e) => handleChange('data', { ...profile?.data, workSpaceName: e.target.value })}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          ) : <Typography variant="body2"> {(profile?.data?.workSpaceName) || <i>{" "}Workspace name not set</i>}</Typography>
          }
        </Stack>
      </Stack>
    </Paper>
  )
}
