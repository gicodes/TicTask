import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'

const SomeOnePays = ({ 
  children, 
  flex
}: { 
  children?: ReactNode, 
  flex?: boolean 
}) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "primary.main",
          opacity: 0.06,
          filter: "blur(50px)",
          top: -100,
          right: -80,
          pointerEvents: "none",
        }}
      />

      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4 },
          "&:last-child": { pb: { xs: 2.5, sm: 3.5, md: 4 } },
        }}
      >
        <Stack spacing={{ xs: 3, sm: 3.5 }}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            gap={2}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                }}
              >
                <ConfirmationNumberOutlined fontSize="small" />
              </Box>

              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    display: "block",
                    lineHeight: 1.2,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "text.secondary",
                  }}
                >
                  Team
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{ lineHeight: 1.2 }}
                >
                  Ticket Playground
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="PLAYGROUND"
              size="small"
              sx={{
                display: { xs: "none", sm: "flex" },
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.06em",
                bgcolor: "action.hover",
                border: "1px solid",
                borderColor: "divider",
              }}
            />
          </Stack>

          <Box
            sx={{
              maxWidth: 650,
              pt: { xs: 0, sm: 1 },
            }}
          >
            <Typography
              variant="h4"
              fontWeight={850}
              sx={{
                fontSize: {
                  xs: "1.7rem",
                  sm: "2.15rem",
                  md: "2.4rem",
                },
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
              }}
            >
              Someone pays.
              <br />
              Everyone plays.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              We just call that someone the Owner.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                maxWidth: 560,
                color: "text.secondary",
                lineHeight: 1.7,
              }}
            >
              A shared space for your team to create, assign, discuss,
              and get tickets moving — without turning collaboration into
              another meeting.
            </Typography>
          </Box>

          {children}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SomeOnePays