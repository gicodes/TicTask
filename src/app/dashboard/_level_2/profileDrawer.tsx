'use client';

import type { User } from '@/types/users';
import { useAuth } from '@/providers/auth';
import { useAlert } from '@/providers/alert';
import { apiGet, apiPatch } from '@/lib/axios';
import { UserProfileRes } from '@/types/axios';
import React, { useEffect, useState } from 'react';
import { PersonalSection } from './profileSections/perFields';
import { BusinessSection } from './profileSections/busFields';
import { ModeratorSection } from './profileSections/modFields';
import {
  Drawer,
  Box,
  Typography,
  Stack,
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
import { MdEmail, } from 'react-icons/md';
import { Check, Download, Share2, UserCog2Icon,} from 'lucide-react';
import { CloseSharp, EditOutlined, ArrowBack } from '@mui/icons-material';
import { ProfileActivitySection } from './profileSections/profileActivity';
import { FaLocationDot, FaPhone, FaEllipsisVertical } from 'react-icons/fa6';

export default function ProfileDetailDrawer() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
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

  const handleChange = (field: keyof User, value: string | unknown) => {
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
        showAlert('Profile link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing profile:', err);
    }
  };

  const isBusiness = profile?.userType === 'BUSINESS';
  const isModerator = profile?.collab || profile?.partner || profile?.role === 'ADMIN';

  if (loading) {
    return (
      <Drawer
        anchor="right"
        open={!closeDrawer}
        onClose={closeDetail}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', md: 500 }, px: 3 } }}
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
    <> 
      { closeDrawer ? (
        <Fab
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
          <Tooltip title='open profile'>
            <UserCog2Icon />
          </Tooltip>
        </Fab>
      ) : (
        <Drawer
          anchor="right"
          open={!closeDrawer}
          onClose={closeDetail}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '100%', md: 500, xl: 600 },
              borderTopLeftRadius: 16,
              boxShadow: '-6px 0px 20px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Toolbar />
          <Fade in>
            <Box>

              <Stack
                px={1}
                zIndex={99}
                position="fixed"
                right={0}
                bgcolor="rgba(0,0,0,0.1)"
                sx={{
                  width: {
                    xs: '100%',
                    md: 500,
                    xl: 600,
                  },
                  boxSizing: 'border-box',
                }}
              >
                <Box 
                  py={1}
                  px={2}
                  gap={3}
                  height={60} 
                  width={'100%'}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Typography 
                    width={250}
                    variant="h6" 
                    fontWeight={600} 
                    color='text.secondary' 
                  >
                    {isEditing ? 'Editing Profile' : isBusiness ? 'Business' : 'User'} Profile
                  </Typography>
                  
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  > 
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
                    
                    { moreOptions && (
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
                        { !moreOptions ? (
                          <FaEllipsisVertical size={18} /> 
                        ) : (
                          <CloseSharp sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Stack>
              <Toolbar/>

              <Box px={3}>
                <Stack alignItems="center" spacing={1} textAlign="center" my={3}>
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
                  
                  <Typography variant="body2" color="text.secondary">
                    {profile?.position || (isBusiness ? 'Organization' : 'Member')}
                  </Typography>
                  
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
                    <Typography variant="body2" color="text.secondary" py={1} px={4}>
                      {profile?.bio || 'No bio added yet.'}
                    </Typography>
                  )}
                </Stack>

                <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" mb={1} pb={1} borderBottom={'2px dashed var(--surface-1)'}>
                    Contact Information
                  </Typography>

                  <Stack spacing={1}>
                    {(['email', 'phone', 'country'] as const).map((field, i, arr) => (
                      <>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          key={field}
                          py={0.5}
                        >
                          <IconButton color='info' sx={{ bgcolor: 'var(--surface-1)'}}>
                            { field === 'email' ? <MdEmail size={16} />
                            : field === 'phone' ? <FaPhone size={16} />
                            : <FaLocationDot size={16} />
                          }
                          </IconButton>

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
                          ) : <Typography variant="body2"> {profile?.[field] || 'Not provided'} </Typography>}
                        </Stack>
                        {i < arr.length - 1 && <Divider />}
                      </>
                    ))}
                  </Stack>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    mb={2} pb={1}
                    borderBottom={'2px dashed var(--surface-1)'}
                  >
                    Account Information
                  </Typography>

                  <Stack spacing={1.75}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Email verification
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Your email address verification status
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={profile?.emailVerifiedAt ? 'success.main' : 'warning.main'}
                      >
                        {profile?.emailVerifiedAt ? 'Verified' : 'Not verified'}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Tictask Credits
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Credits are used for ticket sudo actions and automation runs
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {profile?.credits ?? 0}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Member since
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          When this account was created
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {profile?.createdAt
                          ? new Date(profile.createdAt).toLocaleDateString()
                          : '—'}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Last updated
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          When your profile was last changed
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString(): '—'}
                      </Typography>
                    </Stack>
                    <Divider />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Last login
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Your most recent account activity
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        { user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'No login recorded'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>

                {isBusiness ? (
                  <BusinessSection
                    profile={profile}
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                ) : (
                  <PersonalSection 
                    profile={profile}
                    isEditing={isEditing}
                    handleChange={handleChange}
                  />
                )}

                <ProfileActivitySection
                  tickets={profile?.tickets}
                  closedTickets={profile?.closedTickets}
                  startedTickets={profile?.startedTickets}
                  assignedTickets={profile?.assignedTickets}
                  createdTeams={profile?.createdTeams}
                  teamMemberships={profile?.teamMemberships}
                  teamMembership={profile?.teamMembership}
                />

                {isModerator && <ModeratorSection profile={profile} />}
              </Box>
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
      )}
    </>
  );
}
