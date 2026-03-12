import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { LightweightRichEditor } from "../../_level_1/richTextEditior";
import { Control, Controller } from "react-hook-form";

const BugFixForm = ({ 
  control 
}: { 
  control: Control 
}) => {
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
            <MenuItem value="URGENT">Critical</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="steps"
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Steps To Reproduce
            </Typography>

            <LightweightRichEditor
              value={value ?? ''}
              onChange={onChange}
              placeholder={'Describe your steps here...'}
            />

            {fieldState.error && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5 }}
              >
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Stack>
  );
}

export default BugFixForm;
