import { Controller, useFormContext } from "react-hook-form";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Box,
  OutlinedInput,
  Typography,
  Stack,
} from "@mui/material";

const ROLES = [
  { role: "Angel Investor"},
  { role: "Products Expert"},
  { role: "Operations & Logistics"},
  { role: "Integration Partner" },
  { role: "Reseller / Distributor" },
  { role: "Affiliate / Referral" },
  { role: "Implementation Consultant" },
  { role: "Open Source Contributor" },
  { role: "Community Builder" },
  { role: "Content Creator / Educator" },
];

export default function PartnershipDetailsStep() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectedRoles = watch("partnerRoles") || [];

  return (
    <Grid container spacing={3} justifyContent={'center'}>
      <Stack gap={2} direction={{ xs: 'column', sm: 'row'}} alignItems={'start'}>
      <Grid minWidth={250}>
        <FormControl fullWidth>
          <InputLabel id="roles-label">Preferred contact method</InputLabel>
          <Controller
            name="preferredContact"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Preferred contact method">
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone / WhatsApp</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>

      <Grid minWidth={250}>
        <FormControl fullWidth error={!!errors.partnerRoles}>
          <InputLabel id="roles-label">Partner / Collaboration Roles *</InputLabel>
          <Controller
            name="partnerRoles"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="roles-label"
                multiple
                value={field.value || []}
                onChange={field.onChange}
                input={<OutlinedInput label="Partner / Collaboration Roles *" />}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {ROLES.map((r) => (
                  <MenuItem key={r.role} value={r.role}>
                    {r.role}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.partnerRoles?.message as string | undefined}</FormHelperText>
        </FormControl>
      </Grid>
        
      </Stack>

      <Grid width={'100%'}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="About Your Company / You"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={
                errors.description?.message as string ||
                `${(field.value || "").length} / 50+ characters recommended`
              }
              required
            />
          )}
        />
      </Grid>

      <Grid width={'100%'}>
        <Controller
          name="collaborationGoals"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Collaboration goals with TicTask? (optional)"
              multiline
              rows={3}
              helperText={errors.collaborationGoals?.message as string | undefined}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}