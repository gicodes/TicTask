import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { LightweightRichEditor } from "../../_level_1/richTextEditior";
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
        render={({ field: { value, onChange }, fieldState }) => (
          <>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Description
            </Typography>

            <LightweightRichEditor
              value={value ?? ''}
              onChange={onChange}
              placeholder={'Write your description here...'}
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

export default FeatureForm;
