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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import styles from '@/app/page.module.css';
import { Industries } from '@/constants/industries';
import { allCountries } from '@/constants/allCounties';
import { UserType, OnboardingProps } from '@/types/onboarding';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function OnboardingUI(props: OnboardingProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();
  
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

  const ActionGroup = () => 
    <Stack className={styles.actions}>
      <button
        type="button"
        onClick={handleBack}
        className={`min-width-100 ${styles.btnRetreat}`}
        disabled={loading}
      >
        Back
      </button>
      <button
        type="button"
        onClick={step===3 ? handleSubmit : handleNext}
        className={`min-width-100 ${styles.btnPrimary}`}
        disabled={loading}
      >
        {loading ? 'Saving...' : step===3 ? "Finish" : "Continue"}
      </button>
    </Stack>
    

  const CountrySelect = ({ accountType }: { accountType: UserType}) =>
    <Box mx={"auto"} my={1}>
      <FormControl
        fullWidth
        variant="outlined"
        sx={{ 
          bgcolor: "white",
          borderRadius: 2,
          "& .MuiInputLabel-root": {
            color: "text.secondary",
          }, "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "whitesmoke",
            "& fieldset": {
              borderColor: "#ddd",
            }, "&:hover fieldset": {
              borderColor: "#999",
            }, "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
              borderWidth: 2,
            },
          },
        }}
      >
        <InputLabel>{accountType==="BUSINESS" ? "Country, (HQ) Location" : "Country of Residence"}</InputLabel>
        <Select
          MenuProps={{PaperProps: { sx: { maxHeight: 300, borderRadius: 2,}}}}
          value={accountType==="BUSINESS" ? hqCountry : country} 
          label={accountType==="BUSINESS" ? "Country, (HQ) Location" : "Country of Residence"}
          onChange={accountType==="BUSINESS" ? (e) => setHqCountry(e.target.value) : (e) => setCountry(e.target.value)} 
        >
          {allCountries.map((country) => (
            <MenuItem key={country} value={country}> {country}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                {['PERSONAL', 'BUSINESS'].map((type) => (
                  <Card
                    key={type}
                    elevation={userType === type ? 6 : 2}
                    sx={{
                      borderRadius: 2,
                      width: 130,
                      textAlign: 'center',
                      bgcolor: userType === type ? 'white'
                      : 'var(--surface-2)',
                      color: userType === type ? 'black' : 'var(--secondary)',
                      transition: '0.25s',
                    }}
                  >
                    <CardActionArea>
                      <FormControlLabel
                        value={type}
                        control={<Radio sx={{ display: 'none' }} />}
                        sx={{ m: 0 }}
                        label={<Typography fontWeight={600} py={1.5}>
                          {type === 'PERSONAL' ? 'Individual' : 'Organization'}
                        </Typography>}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </RadioGroup>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}> 
                {userType === 'BUSINESS' ? 'Organizations can manage multiple users and projects' : 'Individual accounts are for personal use'} 
              </Typography> 
              
              <Card 
                sx={{
                  px: 1, py: 0.5,
                  borderRadius: 3
                }}
              >
                {userType === 'PERSONAL' ? (
                  <>
                    <CountrySelect accountType='PERSONAL' />
                    <TextField
                      fullWidth
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    />
                    <TextField
                      fullWidth
                      placeholder="Full Name(s)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      placeholder="Organization Name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    />
                    <TextField
                      fullWidth
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    />
                    <CountrySelect accountType='BUSINESS' />
                    <TextField
                      select
                      fullWidth
                      label="Industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    >
                      {Industries.map((i) => (
                        <MenuItem key={i} value={i}> {i}</MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      placeholder="Number of Team Members"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    />
                    <TextField
                      fullWidth
                      placeholder="Business / Company Website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                    />
                    <TextField
                      fullWidth
                      placeholder="Short Bio / Description"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2, my: 1}}
                      multiline rows={3}
                    />
                  </>
                )}
              </Card>
              <ActionGroup />
            </Box>
          </Fade>
        )}
        {step === 3 && (
          <Fade in timeout={500}>
            <Box className={styles.mid}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Review & Finish
              </Typography>

              <Card sx={{ borderRadius: 3, p: 3, mb: 6, minWidth: 300}}>
                <Box display={'grid'} gap={2} textAlign={'left'}>
                  <Typography variant='subtitle2'>
                    <strong>{userType[0] + userType.slice(1).toLocaleLowerCase()} Account</strong>
                  </Typography>
                  <Divider />
                  
                  <Typography variant='subtitle2'><strong>Name:</strong>&nbsp;{name}</Typography>
                  {orgName && <Typography variant='subtitle2'><strong>Company:</strong> {orgName}</Typography>}
                  <Typography variant='subtitle2'><strong>Country:</strong> {country || hqCountry}</Typography>
                  {phone && <Typography variant='subtitle2'><strong>Phone:</strong> {phone}</Typography>}
                  {industry && <Typography variant='subtitle2'><strong>Industry:</strong> {industry}</Typography>}
                  {teamSize && <Typography variant='subtitle2'><strong>Team Size:</strong> {teamSize}</Typography>}
                  {website && <Typography variant='subtitle2'><strong>Website:</strong> {website}</Typography>}
                  {bio && <Typography variant='subtitle2'><strong>Bio:</strong> {bio}</Typography>}
                </Box>
              </Card>

              <Typography variant="body2" mb={4}>
                Satisfied with the information provided? Click finish to continue to Dashboard.
              </Typography>
              <ActionGroup />
            </Box>
          </Fade>
        )}
      </form>
    </Box>
  );
}
