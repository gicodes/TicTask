import { MenuItem, Stack, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

const FeatureForm = ({ 
  control 
}: { control: Control}
  ) =>  {  return (
    <Stack spacing={2} mt={2}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField label="Feature Title" {...field} />}
      />

      <Controller
        name="impact"
        control={control}
        render={({ field }) => (
          <TextField select label="Impact Level" {...field}>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField label="Detailed Description" minRows={4} multiline {...field} />
        )}
      />
    </Stack>
  );
}

export default FeatureForm;