'use client';

import { useState } from 'react';
import type { User } from '@/types/users';
import { Check, Copy } from 'lucide-react';
import { FaBriefcase } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { 
  Paper, 
  Stack, 
  Typography, 
  TextField, 
  Divider, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { FcInvite } from 'react-icons/fc';

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
  const [copied, setCopied] = useState(false);

  const copyReferralCode = async () => {
    if (!profile?.referralCode) return;

    try {
      await navigator.clipboard.writeText(profile?.referralCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy referral code:', error);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={2} pb={1} borderBottom={'2px dashed var(--surface-1)'}>
        Professional Details
      </Typography>
      
      <Stack spacing={1.5}>
        <Stack 
          width={'100%'}
          gap={1.5}
          direction={'row'} 
          alignItems={'center'}
          justifyContent={'space-between'}
        >           
          <IconButton color='success' sx={{ bgcolor: 'var(--surface-1)'}}>
            <FaBriefcase size={16} />
          </IconButton>
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
          ) : (
            <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}> 
              <Stack>
                <Typography variant='body2'> Position</Typography> 
                <Typography variant='caption' color="text.secondary">Set your position/ title</Typography>
              </Stack>
              <Typography variant="body2"> {profile?.position || <i>&nbsp;Position not specified</i>}</Typography>
            </Stack>
          )}
        </Stack>
        <Divider />

        <Stack 
          gap={1.5}
          width={'100%'}
          direction={'row'} 
          alignItems={'center'}
          justifyContent={'space-between'}
        >           
          <IconButton color='success' sx={{ bgcolor: 'var(--surface-1)', height: 'max-content'}}>
            <BsPersonWorkspace size={16} />
          </IconButton>
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
          ) : (
            <Stack 
              width={'100%'}
              direction={'row'} 
              alignItems={'center'}
              justifyContent={'space-between'}
            > 
              <Stack>
                <Typography variant='body2'> Workspace Name</Typography> 
                <Typography variant='caption' color="text.secondary">Set your workspace name</Typography>
              </Stack>
              <Typography variant='body2'>
                {(profile?.data?.workSpaceName) || <i>{" "}Workspace name not set</i>}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Divider />

        {profile?.referralCode && (
          <Stack direction={'row'} gap={1.5}>
            <IconButton sx={{ bgcolor: 'var(--surface-1)', height: 'max-content'}} >
              <FcInvite size={16} />
            </IconButton>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              width={'100%'}
            >
              <Stack>
                <Typography variant="body2">
                  Referral code
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Share this code to earn referrals
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    fontFamily: 'monospace',
                    letterSpacing: 0.5,
                  }}
                >
                  {profile?.referralCode}
                </Typography>

                <Tooltip title={copied ? 'Copied!' : 'Copy referral code'}>
                  <IconButton
                    size="small"
                    onClick={copyReferralCode}
                    color={copied ? 'success' : 'default'}
                  >
                    { copied ? <Check size={16} /> : <Copy size={16} />}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}