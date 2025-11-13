'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/providers/auth';
import { Add, DeleteOutline } from '@mui/icons-material';
import { Box, Stack, Typography, Card, CardContent, Button, Divider, Avatar, Grid, IconButton } from '@mui/material';

export default function TeamsPage() {
  const { user } = useAuth();

  const mockTeam = [
    { id: 1, name: `${user?.name}`, company: `${user?.organization || "TicTask"}`, role: `${user?.position || "Project Manager"}` },
    { id: 2, name: 'John Doe', company: `${user?.organization || "TicTask"}`, role: 'Developer' },
    { id: 3, name: 'Jane Doe', company: `${user?.organization || "TicTask"}`, role: 'Designer' },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <Stack spacing={4} maxWidth="900px" mx="auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack spacing={1} textAlign={{xs: 'center', sm: 'inherit'}}>
            <Typography variant="h4" fontWeight={700}  sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              Manage Team
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              Add, remove, or manage members of your organization.
            </Typography>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack direction={{ xs: "column-reverse", sm: "row"}} justifyContent="space-between" gap={3} alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600}>
                  Team Members
                </Typography>
                <Button startIcon={<Add />} variant="contained" color="inherit" sx={{ textTransform: 'none', minWidth: 234}}>
                  Add Member
                </Button>
              </Stack>
              <Divider sx={{ mb: 2, opacity: 0.2 }} />

              <Grid container spacing={2}>
                {mockTeam.map((member) => (
                  <Grid key={member.id}>
                    <Stack
                      minWidth={278}
                      direction="row"
                      alignItems="end"
                      justifyContent="space-between"
                      sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.02)' }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar>{member.name[0]}</Avatar>
                        <Box display={'grid'} gap={0.75}>
                          <Typography fontWeight={600}>{member.name}</Typography>
                          <Stack>
                            <Typography variant='body2' color='var(--secondary)'>
                              {member.company}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.6 }}>
                              <i>{member.role}</i>
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                      <IconButton color="error">
                        <DeleteOutline />
                      </IconButton>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Stack>
    </Box>
  );
}
