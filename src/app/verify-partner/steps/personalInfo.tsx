import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";

export default function PersonalInfoStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <Grid container spacing={3} justifyContent={'center'}>
      <Grid>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Full Name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message as string | undefined}
              required
            />
          )}
        />
      </Grid>
      <Grid>
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Position / Title (optional)"
              error={!!errors.position}
              helperText={errors.position?.message as string | undefined}
            />
          )}
        />
      </Grid>
      <Grid>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              disabled
              helperText="Verified email – cannot be changed here"
              sx={{ bgcolor: "action.hover" }}
            />
          )}
        />
      </Grid>
      <Grid>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Set Password"
              error={!!errors.password}
              placeholder="Enter a strong password"
              helperText={errors.password?.message as string}
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
            />
          )}
        />
      </Grid>
    </Grid>
  );
}