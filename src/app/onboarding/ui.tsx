'use client';

import {
  Fade,
  Box,
  Typography,
  RadioGroup,
  Card,
  CardActionArea,
  FormControlLabel,
  Radio,
  TextField,
  Stack,
  LinearProgress,
  Alert,
  Divider,
  MenuItem,
} from '@mui/material';
import styles from '@/app/page.module.css';
import { UserType, OnboardingProps } from '@/types/onboarding';

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Media',
  'Real Estate',
  'Transportation',
  'Consulting',
];

export default function OnboardingUI(props: OnboardingProps) {
  const {
    step,
    progress,
    loading,
    error,
    handleNext,
    handleBack,
    handleSubmit,
    userType,
    setUserType,
    password,
    setPassword,
    name,
    setName,
    orgName,
    setOrgName,
    country,
    setCountry,
    phone,
    setPhone,
    industry,
    setIndustry,
    teamSize,
    setTeamSize,
    hqCountry,
    setHqCountry,
    website,
    setWebsite,
    bio,
    setBio,
  } = props;

  return (
    <Box className={styles.container}>
      <form onSubmit={handleSubmit}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ borderRadius: 2, height: 8, mb: 3 }}
        />
        {error && (
          <Alert severity="error" sx={{ mb: 2, mx: 'auto', maxWidth: 400 }}>
            {error}
          </Alert>
        )}

        {step === 1 && (
          <Fade in timeout={500}>
            <Box className={styles.mid}>
              <Typography variant="h6" fontWeight={600}>
                Set Your Password
              </Typography>
              <TextField
                type="password"
                fullWidth
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 4 }}
              />
              <Box textAlign="center">
                <button
                  type="button"
                  disabled={!password || loading}
                  onClick={handleNext}
                  className={styles.btnPrimary}
                >
                  {loading ? 'Saving...' : 'Continue'}
                </button>
              </Box>
            </Box>
          </Fade>
        )}

        {step === 2 && (
          <Fade in timeout={500}>
            <Box className={styles.mid}>
              <Typography variant="h6" fontWeight={600}>
                Choose Account Type
              </Typography>

              <RadioGroup
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  flexDirection: 'row',
                  mt: 2,
                }}
              >
                {['personal', 'business'].map((type) => (
                  <Card
                    key={type}
                    elevation={userType === type ? 6 : 2}
                    sx={{
                      borderRadius: 2,
                      width: 130,
                      textAlign: 'center',
                      bgcolor:
                        userType === type
                          ? 'var(--foreground)'
                          : 'rgb(36, 34, 43)',
                      color: userType === type ? 'black' : 'white',
                      transition: '0.25s',
                    }}
                  >
                    <CardActionArea>
                      <FormControlLabel
                        value={type}
                        control={<Radio sx={{ display: 'none' }} />}
                        label={
                          <Typography fontWeight={600} py={1.5}>
                            {type === 'personal' ? 'Personal' : 'Organization'}
                          </Typography>
                        }
                        sx={{ m: 0 }}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </RadioGroup>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}> 
                {userType === 'BUSINESS' ? 'Organizations can manage multiple users and projects' : 'Personal accounts are for individual use'} 
              </Typography> 
              
              <Divider sx={{ bgcolor: 'gray', width: '100%', my: 2, maxWidth: 360}}/>

              {userType === 'PERSONAL' ? (
                <>
                  <TextField
                    fullWidth
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                  <TextField
                    fullWidth
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                  <TextField
                    fullWidth
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    placeholder="Organization Name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  >
                    {industries.map((i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    placeholder="Number of Team Members"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                  <TextField
                    fullWidth
                    placeholder="HQ Country / Location"
                    value={hqCountry}
                    onChange={(e) => setHqCountry(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                  <TextField
                    fullWidth
                    placeholder="Business Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                  />
                  <TextField
                    fullWidth
                    placeholder="Short Bio / Description"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1 }}
                    multiline
                    rows={3}
                  />
                </>
              )}

              <Stack className={styles.actions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.btnRetreat}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Continue'}
                </button>
              </Stack>
            </Box>
          </Fade>
        )}

        {step === 3 && (
          <Fade in timeout={500}>
            <Box className={styles.mid}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Review & Finish
              </Typography>
              <Typography variant="body2" mb={4}>
                Satisfied with your info? Click finish to continue to your
                dashboard.
              </Typography>

              <Stack className={styles.actions}>
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.btnRetreat}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? 'Finalizing...' : 'Finish'}
                </button>
              </Stack>
            </Box>
          </Fade>
        )}
      </form>
    </Box>
  );
}