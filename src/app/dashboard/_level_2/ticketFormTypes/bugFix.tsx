import { MenuItem, Stack, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

const BugFixForm = ({ 
  control }: { control: Control}
) => {
  return (
    <Stack spacing={2} mt={2}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField label="Bug title" required {...field} />
        )}
      />

      <Controller
        name="severity"
        control={control}
        render={({ field }) => (
          <TextField select label="Severity" {...field}>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="CRITICAL">Critical</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="steps"
        control={control}
        render={({ field }) => (
          <TextField
            label="Steps to reproduce"
            multiline
            minRows={3}
            {...field}
          />
        )}
      />
    </Stack>
  );
}

export default BugFixForm;
