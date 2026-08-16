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
import { EllipsisTypography } from '../../_level_1/elipsisTypography';

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
    <Paper variant="outlined" sx={{ borderRadius: 3 }}>
      <Stack sx={{ bgcolor: 'rgba(0,0,0,0.09)'}} p={2}>
        <Typography variant="subtitle2" color="text.secondary">
          Professional Details
        </Typography>
      </Stack>

      <Stack spacing={1.5} px={1.5} py={2}>
        <Stack 
          width={'100%'}
          gap={1.5}
          direction={'row'} 
          alignItems={'center'}
          justifyContent={'space-between'}
        >           
          <IconButton color='success' sx={{ bgcolor: 'var(--divider)'}}>
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
            <Stack gap={1} direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}> 
              <Stack>
                <Typography variant='body2'> Position</Typography> 
                <Typography variant='caption' color="text.secondary">Set your position/ title</Typography>
              </Stack>
              <EllipsisTypography> {profile?.position || <i>Not set</i>}</EllipsisTypography>
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
          <IconButton color='success' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}}>
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
              <EllipsisTypography>
                {(profile?.data?.workSpaceName) || <i>Not set</i>}
              </EllipsisTypography>
            </Stack>
          )}
        </Stack>
        <Divider />

       {profile?.referralCode && (
          <Stack direction={'row'} gap={1.5}>
            <IconButton sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
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
                  Share this link to earn referrals
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
              >
                <EllipsisTypography 
                  sx={{ fontFamily: 'monospace', letterSpacing: 0.5 }}
                >
                  {`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/join/${profile?.referralCode}`}
                </EllipsisTypography>

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
