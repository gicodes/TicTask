import {
  Paper,
  Stack,
  Typography,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';

import {
  Groups3,
  Language,
} from '@mui/icons-material';

import { FaBriefcase } from 'react-icons/fa6';
import { FcOrganization } from 'react-icons/fc';
import { BsPersonWorkspace } from 'react-icons/bs';
import { MdWorkspacesFilled } from 'react-icons/md';

import { ProfileProps } from '@/types/users';
import { EllipsisTypography } from '../../_level_1/elipsisTypography';

export function ProfileDetailsSection({
  profile,
  isEditing,
  handleChange,
}: ProfileProps) {
  const isBusiness = profile?.userType === 'BUSINESS';

  const fieldSx = {
    border: '1px solid var(--disabled)',
    px: 2,
    borderRadius: 2,
  };

  const iconSx = {
    bgcolor: 'var(--divider)',
    height: 'max-content',
  };

  const renderField = ({
    icon,
    label,
    description,
    value,
    field,
    placeholder,
    iconColor = 'primary',
    fallback = 'Not set',
    // multiline = false,
  }: {
    icon: React.ReactNode;
    label: string;
    description: string;
    value: React.ReactNode;
    field?: Parameters<ProfileProps['handleChange']>[0];
    placeholder?: string;
    iconColor?: 'primary' | 'success';
    fallback?: React.ReactNode;
    multiline?: boolean;
  }) => (
    <>
      <Stack
        gap={1}
        direction="row"
        alignItems="center"
      >
        <IconButton
          color={iconColor}
          sx={iconSx}
        >
          {icon}
        </IconButton>

        {isEditing && field ? (
          <TextField
            size="small"
            variant="standard"
            value={value ?? ''}
            placeholder={placeholder}
            onChange={(e) => handleChange(field, e.target.value)}
            sx={fieldSx}
            fullWidth
          />
        ) : (
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack>
              <Typography variant="body2">
                {label}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {description}
              </Typography>
            </Stack>

            <EllipsisTypography>
              {value || <i>{fallback}</i>}
            </EllipsisTypography>
          </Stack>
        )}
      </Stack>
      <Divider />
    </>
  );

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3 }}>
      <Stack
        sx={{ bgcolor: 'rgba(0,0,0,0.09)' }}
        p={2}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
        >
          {isBusiness
            ? 'Organization Details'
            : 'Professional Details'}
        </Typography>
      </Stack>

      <Stack spacing={1.5} px={1.5} py={2}>
        {renderField({
          icon: <FaBriefcase size={16} />,
          label: 'Position',
          description: isBusiness
            ? 'Set your position/ role/ title'
            : 'Set your position/ title',
          value: profile?.position,
          field: 'position',
          placeholder: isBusiness
            ? 'Your role in the organization'
            : 'Specify Professional Position',
          iconColor: isBusiness ? 'primary' : 'success',
        })}

        {isBusiness && (
          <>
            {renderField({
              icon: <FcOrganization size={16} />,
              label: 'Organization Name',
              description: 'Set your organization/ business name',
              value: profile?.organization,
              field: 'organization',
              fallback: '',
            })}

            {renderField({
              icon: <MdWorkspacesFilled size={16} />,
              label: 'Industry',
              description: 'Set your organization niche/ industry',
              value: profile?.industry,
              field: 'industry',
              fallback: 'Industry not specified',
            })}

            {renderField({
              icon: <Groups3 fontSize="small" />,
              label: 'Team Strength',
              description: 'Set your organization size',
              value: profile?.teamSize,
              field: 'teamSize',
            })}

            {profile?.website && (
              <>
                <Stack gap={1} direction="row" alignItems="center">
                  <IconButton color="primary" sx={iconSx}>
                    <Language fontSize="small" />
                  </IconButton>

                  {isEditing ? (
                    <TextField
                      size="small"
                      variant="standard"
                      value={profile.website}
                      onChange={(e) =>
                        handleChange('website', e.target.value)
                      }
                      sx={fieldSx}
                      fullWidth
                    />
                  ) : (
                    <Stack
                      width="100%"
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack>
                        <Typography variant="body2">
                          Website
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Set your website url
                        </Typography>
                      </Stack>

                      <EllipsisTypography color="primary">
                        <a
                          href={
                            profile.website.includes('http')
                              ? profile.website
                              : `https://${profile.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {profile.website}
                        </a>
                      </EllipsisTypography>
                    </Stack>
                  )}
                </Stack>

                <Divider />
              </>
            )}
          </>
        )}

        <Stack
          gap={1}
          direction="row"
          alignItems="center"
        >          
          <IconButton
            color={isBusiness ? 'primary' : 'success'}
            sx={iconSx}
          >
            <BsPersonWorkspace size={16} />
          </IconButton>

          {isEditing ? (
            <TextField
              size="small"
              variant="standard"
              placeholder={
                profile?.data?.workSpaceName ||
                'Specify Workspace Name'
              }
              value={profile?.data?.workSpaceName || ''}
              onChange={(e) =>
                handleChange('data', {
                  ...profile?.data,
                  workSpaceName: e.target.value,
                })
              }
              sx={fieldSx}
              fullWidth
            />
          ) : (
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack ml={0.2}>
                <Typography variant="body2">
                  Workspace Name
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Set your workspace name
                </Typography>
              </Stack>

              <EllipsisTypography>
                {profile?.data?.workSpaceName || <i>Not set</i>}
              </EllipsisTypography>
            </Stack>
          )}
        </Stack>

      </Stack>
    </Paper>
  );
}
