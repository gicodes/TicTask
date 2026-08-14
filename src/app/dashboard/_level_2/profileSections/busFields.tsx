'use client';

import { useState } from 'react';
import { ProfileProps } from './perFields';
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Copy, Check } from 'lucide-react';
import { FaBriefcase } from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { MdWorkspacesFilled } from 'react-icons/md';
import { Groups3, Language } from '@mui/icons-material';
import { FcInvite, FcOrganization } from 'react-icons/fc';
import { EllipsisTypography } from '../../_level_1/elipsisTypography';

export function BusinessSection({
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
      <Typography variant="subtitle2" color="text.secondary" mb={3} pb={1} borderBottom={'1px dashed var(--divider)'}>
        Organization Details
      </Typography>

      <Stack spacing={2}>
        <Stack gap={1} direction="row" alignItems="center" spacing={1}>
          <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
            <FcOrganization size={16} />
          </IconButton>
          {isEditing && profile?.userType === "BUSINESS" ? (
            <TextField
              size="small"
              variant="standard"
              value={profile?.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
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
                <Typography variant="body2"> Organization Name </Typography>
                <Typography variant='caption' color='text.secondary'> Set your organization/ business name</Typography>
              </Stack>
              <EllipsisTypography>{profile?.organization}</EllipsisTypography>
            </Stack>
          )} 
        </Stack>
        <Divider />
      
        <Stack gap={1} direction="row" alignItems="center" spacing={1}>
          <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
            <MdWorkspacesFilled size={16}/>
          </IconButton>
          {isEditing && profile?.industry ? (
            <TextField
              size="small"
              variant="standard"
              value={profile.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
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
                <Typography variant="body2"> Industry </Typography>
                <Typography variant='caption' color='text.secondary'> Set your organization niche/ industry</Typography>
              </Stack>
              <EllipsisTypography>{profile?.industry || <i>Industry not specified</i>}</EllipsisTypography>
            </Stack>
          )}
        </Stack>
        <Divider />

        <Stack gap={1} direction="row" alignItems="center" spacing={1}>
          <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
            <FaBriefcase size={16} />
          </IconButton>
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
          ) : (
            <Stack 
              width={'100%'}
              direction={'row'} 
              alignItems={'center'}
              justifyContent={'space-between'}
            > 
              <Stack>
                <Typography variant="body2"> Position </Typography>
                <Typography variant='caption' color='text.secondary'> Set your position/ role/ title</Typography>
              </Stack>
              <EllipsisTypography>{profile?.position || <i>Not set</i>}</EllipsisTypography>
            </Stack>
          )}
        </Stack>
        <Divider />

        <Stack gap={1} direction="row" alignItems="center" spacing={1}>
          <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
            <Groups3 fontSize="small" />
          </IconButton>
          { isEditing && profile?.teamSize ? (
            <TextField
              size="small"
              variant="standard"
              value={String(profile.teamSize)}
              onChange={(e) => handleChange('teamSize', e.target.value)}
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
                <Typography variant="body2"> Team Strength </Typography>
                <Typography variant='caption' color='text.secondary'> Set your organization size</Typography>
              </Stack>
              <Typography variant="body2">{profile?.teamSize|| <i>Not set</i>}</Typography>
            </Stack>
          )}
        </Stack>
        <Divider />

        {isEditing && profile?.website && (
          <Stack gap={1} direction="row" alignItems="center" spacing={1}>
            <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
              <Language fontSize="small" />
            </IconButton>
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
          <Stack gap={1} direction="row" alignItems="center" spacing={1}>
            <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
              <Language fontSize="small" />
            </IconButton>

            <Stack 
              width={'100%'}
              direction={'row'} 
              alignItems={'center'}
              justifyContent={'space-between'}
            > 
              <Stack>
                <Typography variant="body2"> Website </Typography>
                <Typography variant='caption' color='text.secondary'> Set your website url</Typography>
              </Stack>
              <EllipsisTypography color="primary">
                <a 
                  href={(!profile.website.includes("http")) ? `https://${profile.website}` 
                  : profile.website} target="_blank" rel="noopener noreferrer"
                >
                  {profile.website}
                </a>
              </EllipsisTypography>
            </Stack>
          </Stack>
        )}
        <Divider />

        <Stack gap={1} direction="row" alignItems="center" spacing={1}>
          <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
            <BsPersonWorkspace size={16} />
          </IconButton>
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
          ) : (
            <Stack 
              width={'100%'}
              direction={'row'} 
              alignItems={'center'}
              justifyContent={'space-between'}
            > 
              <Stack>
                <Typography variant="body2"> Workspace Name </Typography>
                <Typography variant='caption' color='text.secondary'> Set your workspace name</Typography>
              </Stack>
              <EllipsisTypography> {profile?.data?.workSpaceName  || <i>Not set</i>}</EllipsisTypography>
            </Stack>
          )}
        </Stack>
        <Divider />

        {profile?.referralCode && (
          <Stack direction={'row'} gap={1.7}>
            <IconButton color='primary' sx={{ bgcolor: 'var(--divider)', height: 'max-content'}} >
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
                <Typography variant="body2" fontWeight={500}>
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
                  sx={{
                    fontFamily: 'monospace',
                    letterSpacing: 0.5,
                  }}
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
  );
}