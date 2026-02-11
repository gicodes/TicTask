import { Controller, useFormContext } from "react-hook-form";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";

const industries = ["SaaS", "EdTech", "FinTech", "HealthTech", "E-commerce", "Agency", "Other"];

export default function CompanyProfileStep() {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Grid container spacing={3} justifyContent={'center'}>
      <Grid>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Company Name"
              error={!!errors.companyName}
              helperText={errors.companyName?.message as string}
              required
            />
          )}
        />
      </Grid>

      <Grid>
        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth label="Website[](https://...)" />
          )}
        />
      </Grid>

      <Grid minWidth={120}>
        <FormControl fullWidth error={!!errors.industry}>
          <InputLabel>Industry</InputLabel>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Industry">
                {industries.map((ind) => (
                  <MenuItem key={ind} value={ind}>{ind}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.industry?.message as string}</FormHelperText>
        </FormControl>
      </Grid>

      {/* Add file upload for logo – use Dropzone or simple input type="file" */}
      {/* teamSize dropdown, etc. */}
    </Grid>
  );
}