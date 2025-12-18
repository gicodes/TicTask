'use client';

import { ProfileProps } from './perFields';
import {
  Paper,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { FaBriefcase } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { SiAwsorganizations } from 'react-icons/si';
import { MdWorkspacesFilled } from 'react-icons/md';
import { Groups3, Language } from '@mui/icons-material';

export function BusinessSection({
  profile,
  isEditing,
  handleChange,
}: ProfileProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        Organization Details
      </Typography>

      <Stack spacing={1.5}>

        <Stack direction="row" alignItems="center" spacing={1}>
          <SiAwsorganizations />
          {isEditing && profile?.userType === "BUSINESS" ? (
            <TextField
              size="small"
              variant="standard"
              value={profile?.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          ) : <Typography variant="body2">{profile?.organization}</Typography>
          } 
        </Stack>
      
        <Stack direction="row" alignItems="center" spacing={1}>
          <MdWorkspacesFilled />
          {isEditing && profile?.industry ? (
            <TextField
              size="small"
              variant="standard"
              value={profile.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          ) : <Typography variant="body2">{profile?.industry || <i>&nbsp;Industry not specified</i>}</Typography>
          }
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <FaBriefcase size={16} />
          {isEditing ? (
            <TextField
              size="small"
              variant="standard"
              placeholder="Your role in the organization"
              value={profile?.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          ) : <Typography variant="body2"> {profile?.position || <i>&nbsp;Role not specified</i>} </Typography>
          }
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Groups3 fontSize="small" />
          {isEditing && profile?.teamSize ? (
            <TextField
              size="small"
              variant="standard"
              value={String(profile.teamSize)}
              onChange={(e) => handleChange('teamSize', e.target.value)}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
            ) : <Typography variant="body2">Team Size: {profile?.teamSize}</Typography>
          }
        </Stack>

        {isEditing && profile?.website && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Language fontSize="small" />
            <TextField
              size="small"
              variant="standard"
              value={profile.website}
              onChange={(e) => handleChange('website', e.target.value)}
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          </Stack>
        )} 
        {(!isEditing && profile?.website) && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Language fontSize="small" />
            <Typography variant="body2" color="primary">
              <a 
                href={(!profile.website.includes("http")) ? `https://${profile.website}` 
                : profile.website} target="_blank" rel="noopener noreferrer"
              >
                {profile.website}
              </a>
            </Typography>
          </Stack>
        )}

        <Stack direction="row" alignItems="center" spacing={1}>
          <BsPersonWorkspace size={16} />
          {isEditing ? (
            <TextField
              size="small"
              variant="standard"
              placeholder={profile?.data?.workSpaceName|| 'Specify Workspace Name'}
              value={profile?.data?.workSpaceName || ''}
              onChange={(e) => handleChange('data', { ...profile?.data, workSpaceName: e.target.value })}             
              sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
              fullWidth
            />
          ) : <Typography variant="body2"> {profile?.data?.workSpaceName  || <i>&nbsp;Workspace name not set</i>}</Typography>
          }
        </Stack>
      </Stack>
    </Paper>
  );
}
