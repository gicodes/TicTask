import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

export const DatePicker = <T extends FieldValues>({
  control,
  name,
  defaultValue,
}: {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <TextField
        {...field}
        label="Due Date & Time"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{
          "& input": {
            padding: "20px 14px",
            borderRadius: 1,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          },
        }}
      />
    )}
  />
);
