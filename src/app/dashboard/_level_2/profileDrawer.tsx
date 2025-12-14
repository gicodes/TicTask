'use client';

import type { User } from '@/types/users';
import { useAuth } from '@/providers/auth';
import { apiGet, apiPatch } from '@/lib/axios';
import { UserProfileRes } from '@/types/axios';
import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Chip,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  Fade,
  useTheme,
  Paper,
  Skeleton,
  CircularProgress,
  TextField,
  Divider,
  Fab,
} from '@mui/material';
import Link from 'next/link';
import { Button } from '@/assets/buttons';
import { SiAwsorganizations } from 'react-icons/si';
import { MdEmail, MdWorkspacesFilled } from 'react-icons/md';
import { Check, Download, Share2, UserCog2Icon,} from 'lucide-react';
import { FaBriefcase, FaLocationDot, FaPhone, FaEllipsisVertical } from 'react-icons/fa6';
import { CloseSharp, Language, Groups3, EditOutlined, ArrowBack } from '@mui/icons-material';

export default function ProfileDetailDrawer() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [closeDrawer, setCloseDrawer] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) return;

      try {
        const res: UserProfileRes = await apiGet(`/user/${user.id}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user?.id]);

  const handleSavePDF = () => window.print();

  const handleEditToggle = () => {
    if (moreOptions) setMoreOptions(false);
    setIsEditing((prev) => !prev)
  };

  const toggleMoreOptions = () => {
    if (isEditing) setIsEditing(false);
    setMoreOptions(!moreOptions)
  };

  const closeDetail = () => setCloseDrawer(true);

  const handleChange = (field: keyof User, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);

    try {
      await apiPatch(`/user/${profile.id}`, profile);
      setIsEditing(false);
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (!user) return;
    const shareUrl = `${window.location.origin}/user/${user.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${user.name}'s Profile`,
          text: 'Check out my TicTask User Profile:',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Profile link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing profile:', err);
    }
  };

  if (loading) return <Box py={5} textAlign="center"><CircularProgress /></Box>

  const isBusiness = profile?.userType === 'BUSINESS';
  const isModerator = profile?.collab || profile?.partner || profile?.role === 'ADMIN';

  if (loading) {
    return (
      <Drawer
        anchor="right"
        open={!closeDrawer}
        onClose={closeDetail}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 440 }, px: 3 } }}
      >
        <Toolbar />
        <Stack p={3} spacing={2}>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        </Stack>
      </Drawer>
    );
  }

  return (
    <> { closeDrawer ? 
      <Fab // Future updates will introduce a full page for drawer-less profile viewing
        aria-label="Open profile"
        onClick={() => setCloseDrawer(false)}
        sx={{
          bgcolor: 'var(--secondary)',
          position: 'fixed',
          top: 80,
          right: 8,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Tooltip title='open profile'><UserCog2Icon /></Tooltip>
      </Fab>
      :
      <Drawer
        anchor="right"
        open={!closeDrawer}
        onClose={closeDetail}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', md: 500 },
            borderTopLeftRadius: 16,
            boxShadow: '-6px 0px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Toolbar />
        <Fade in>
          <Box px={3}>
            <Stack 
              direction="row" 
              alignItems="center" 
              justifyContent="space-between" minHeight={64}
            >
              <Typography variant="h6" fontWeight={600} color='textDisabled'>
                {isEditing ? 'Editing Profile' : isBusiness ? 'Business Profile' : 'User Profile'}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Stack direction={'row'} gap={1}>
                  { !isEditing ?
                    <Tooltip title="Edit Profile">
                      <IconButton onClick={handleEditToggle}>
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                  : <>
                      <Tooltip title="Cancel Edit">
                        <IconButton color="inherit" onClick={handleEditToggle}>
                          <CloseSharp sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Save Changes">
                        <IconButton color="primary" onClick={handleSave} disabled={saving}>
                          {saving ? <CircularProgress size={20} /> : <Check color='var(--info)'/>}
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                </Stack>
                {moreOptions && (
                  <Fade in>
                    <Stack direction="row">
                      <Tooltip title="Save as PDF / Print">
                        <IconButton onClick={handleSavePDF}>
                          <Download size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share Profile">
                        <IconButton onClick={handleShare}>
                          <Share2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Fade>
                )}
                <Tooltip title={!moreOptions ? 'More Options' : 'Close'}>
                  <IconButton onClick={toggleMoreOptions}>
                    {!moreOptions ? <FaEllipsisVertical size={18} /> : <CloseSharp sx={{ fontSize: 20 }} />}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack alignItems="center" spacing={1.5} textAlign="center" my={3}>
              <Avatar
                src={profile?.photo || '/default-avatar.png'}
                alt={profile?.name}
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: 32,
                  mb: 1,
                  color: 'var(--foreground)',
                  background: 'var(--background)',
                  border: `2.5px solid ${
                    isBusiness ? theme.palette.primary.main
                    : isModerator ? `var(--special)`
                    : theme.palette.success.main
                  }`,
                }}
              />
              {isEditing ? (
                <TextField
                  value={profile?.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  variant="standard"
                  fullWidth
                  sx={{ maxWidth: 260, textAlign: 'center', border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
                />
              ) : (
                <Typography variant="h6" fontWeight={600}>{profile?.name}</Typography>
              )}
              <Stack direction="row" spacing={1} display={'flex'} alignItems={'center'}>
                <Chip 
                  label={profile?.role==='USER' ? "Tier 𝟚" : profile?.role}
                  sx={{
                    bgcolor: isModerator ? 'var(--special)' : 'default',
                    color: isModerator ? 'black' : 'var(--bw)',
                    fontWeight: 600,
                    fontStyle: profile?.role==='USER' ? 'italic' : 'inherit',
                  }}
                />
                <Chip
                  label={profile?.userType==="BUSINESS" ? "ORGANIZATION" : "PERSONAL"}
                  color={isBusiness ? 'primary' : 'default'}
                  size="small"
                  variant={isBusiness ? 'filled' : "outlined"}
                  sx={{ p: 1.8}}
                />
              </Stack>
              {isEditing ? (
                <TextField
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  value={profile?.bio || ''}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  sx={{ maxWidth: 340, borderRadius: 5, mt: 5 }}
                  placeholder="Tell us something about yourself..."
                />
              ) : (
                <Typography variant="body2" color="text.secondary" pt={1} px={4}>
                  {profile?.bio || 'No bio added yet.'}
                </Typography>
              )}
            </Stack>
            <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Contact Information
              </Typography>
              <Stack spacing={1.5}>
                {(['email', 'phone', 'country'] as const).map((field) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    key={field}
                  >
                    {field === 'email' ? (
                      <MdEmail size={16} />
                    ) : field === 'phone' ? (
                      <FaPhone size={16} />
                    ) : (
                      <FaLocationDot size={16} />
                    )}
                    {isEditing && field !== 'email' ? (
                      <TextField
                        size="small"
                        variant="standard"
                        value={profile?.[field] || ''}
                        onChange={(e) => handleChange(field, e.target.value)}
                        fullWidth
                        sx={{
                          border: '1px solid var(--disabled)',
                          px: 2,
                          borderRadius: 2,
                        }}
                      />
                    ) : (
                      <Typography variant="body2">
                        {profile?.[field] || 'Not provided'}
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Paper>
            { isBusiness && (
              <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  Organization Details
                </Typography>
                <Stack spacing={1.5}>
                  {isEditing && profile?.userType === "BUSINESS" ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SiAwsorganizations />
                      <TextField
                        size="small"
                        variant="standard"
                        value={profile?.organization || ''}
                        onChange={(e) => handleChange('organization', e.target.value)}
                        sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
                        fullWidth
                      />
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <SiAwsorganizations />
                      <Typography variant="body2">{profile.organization}</Typography>
                    </Stack>
                  )}
                  {isEditing && profile?.industry ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MdWorkspacesFilled />
                      <TextField
                        size="small"
                        variant="standard"
                        value={profile.industry}
                        onChange={(e) => handleChange('industry', e.target.value)}
                        sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
                        fullWidth
                      />
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MdWorkspacesFilled />
                      <Typography variant="body2">{profile.industry || "Industry not specified"}</Typography>
                    </Stack>
                  )}
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
                    ) : (
                      <Typography variant="body2">
                        {profile?.position || 'Role not specified'}
                      </Typography>
                    )}
                  </Stack>
                  {isEditing && profile?.teamSize ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Groups3 fontSize="small" />
                      <TextField
                        size="small"
                        variant="standard"
                        value={String(profile.teamSize)}
                        onChange={(e) => handleChange('teamSize', e.target.value)}
                        sx={{ border: '1px solid var(--disabled)', px: 2, borderRadius: 2 }}
                        fullWidth
                      />
                    </Stack>
                  ) : (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Groups3 fontSize="small" />
                      <Typography variant="body2">Team Size: {profile.teamSize}</Typography>
                    </Stack>
                  )}
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
                  )} {(!isEditing && profile?.website) && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Language fontSize="small" />
                      <Typography variant="body2" color="primary">
                        <a href={(!profile.website.includes("http")) ? `https://${profile.website}` : profile.website} target="_blank" rel="noopener noreferrer">
                          {profile.website}
                        </a>
                      </Typography>
                    </Stack>
                  )}
                  {(user as User).data?.workSpaceName && <Typography variant='body2'>{(user as User).data?.workSpaceName}</Typography>}
                </Stack>
              </Paper>
            )}
            {!isBusiness && (
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
                    ) : (
                      <Typography variant="body2"> {profile?.position || 'Position not specified'}</Typography>
                    )}
                  </Stack>
                  {(user as User).data?.workSpaceName && <Typography variant='body2'>{(user as User).data?.workSpaceName}</Typography>}
                </Stack>
              </Paper>
            )}
            {isModerator && (
              <Paper
                variant="outlined"
                sx={{
                  p: 2, 
                  mb: 2,
                  borderRadius: 3,
                  bgcolor: theme.palette.warning.light + '15',
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
                  Moderator & Contributor Info
                </Typography>
                <Typography variant="body2" color="text.disabled" fontStyle={'italic'} sx={{ opacity: 0.5}}>
                  ・ {profile?.collab
                    ? 'Private access to product templates, docs and collaboration tools'
                    : profile?.partner
                    ? `Partner Role: ${profile?.partnerRole || 'Private access to changelogs, beta features and partner resources'}`
                    : 'Admin privileges enabled'}
                </Typography>
              </Paper>
            )}
          </Box>
        </Fade>

        <Divider sx={{ width: '100%', border: '5px solid var(--disabled)'}} />
        
        <Box p={3}>
          <Button 
            onClick={closeDetail} 
            tone='inverted'
            component={Link} href="/dashboard" 
            startIcon={<ArrowBack />}
            sx={{ maxWidth: 250 }}
          > 
            Back 
          </Button>
        </Box>
      </Drawer>
    }</>
  );
}
