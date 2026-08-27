'use client'

import type { ReactNode } from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { LockOutlined, GroupsOutlined } from '@mui/icons-material'

type MarketingCardProps = {
  children?: ReactNode
  flex?: boolean
}

const MarketingCard = ({ children, flex = false }: MarketingCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#fafafa',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 20px 50px rgba(0,0,0,0.35)'
            : '0 16px 48px rgba(0,0,0,0.06)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          bgcolor: 'text.primary',
          opacity: 0.03,
          filter: 'blur(60px)',
          top: -120,
          right: -100,
          pointerEvents: 'none',
        }}
      />

      <CardContent
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          '&:last-child': { pb: { xs: 3, sm: 4, md: 5 } },
        }}
      >
        <Stack
          direction={flex ? { xs: 'column', md: 'row' } : 'column'}
          spacing={{ xs: 3.5, md: flex ? 5 : 3.5 }}
          alignItems={flex ? { md: 'center' } : 'stretch'}
        >
          <Stack
            spacing={3}
            sx={{
              flex: flex ? 1 : undefined,
              minWidth: 0,
            }}
          >
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              gap={2}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    bgcolor: 'text.primary',
                    color: 'background.paper',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  <LockOutlined sx={{ fontSize: 20 }} />
                </Box>

                <Box display={'grid'} gap={0.5}>
                  <Typography
                    variant="overline"
                    sx={{
                      display: 'block',
                      lineHeight: 1.2,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                    }}
                  >
                    Organization
                  </Typography>
                  <Typography
                    variant={"h5"}
                    fontSize={{ xs: 18, sm: 20, lg: 24}}
                    fontWeight={800}
                    sx={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}
                  >
                    Gated by design
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label="UNLOCKED WITH PLAN"
                size="small"
                icon={<GroupsOutlined sx={{ fontSize: '14px !important' }} />}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  height: 26,
                  bgcolor: 'action.hover',
                  border: '1px solid',
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '& .MuiChip-icon': {
                    color: 'text.secondary',
                    ml: 0.75,
                  },
                }}
              />
            </Stack>

            <Box sx={{ maxWidth: 800, py: { xs: 2, md: 3, xl: 4} }}>
              <Typography
                variant="h1"
                fontWeight={900}
                sx={{
                  fontSize: {
                    xs: '2rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '4rem',
                    xl: '4.5rem'
                  },
                  lineHeight: 1.25,
                  letterSpacing: '-0.045em',
                  color: 'text.primary',
                }}
              >
                One Account.
                <br/>
                <span className='custom-dull'>One Paid Plan.</span>
                <br />
                Own A Workforce.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 1.25,
                  color: 'text.disabled',
                  fontStyle: 'italic',
                  letterSpacing: '0.01em',
                }}
              >
                We keep the best parts behind the gate — on purpose.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 2.5,
                  maxWidth: 540,
                  color: 'text.secondary',
                  lineHeight: 1.75,
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                }}
              >
                Personal plans unlock the essentials. Organization plans unlock
                Teams — shared tickets, real collaboration, guest invites, and
                the workflows that actually move work forward. Everything else
                stays deliberately out of reach until you’re ready.
              </Typography>
            </Box>

            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
              sx={{ pt: 0.5 }}
            >
              {[
                'Teams workspace',
                'Guest invites',
                'Shared tickets',
                'Priority support',
                'Advanced automation',
              ].map((label) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: '0.02em',
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    height: 28,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {children && (
            <Box
              sx={{
                flex: flex ? { md: 1 } : undefined,
                width: '100%',
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: flex ? 'flex-end' : 'center' },
              }}
            >
              {children}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MarketingCard