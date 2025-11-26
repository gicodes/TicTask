import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

export const formatDateTimeLocal = (date: Date | string | undefined | null): string => {
  if (!date) return "";
  if (typeof date === "string") {
    // If it's already a valid datetime-local string, use it
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date)) return date;
    // Otherwise try to parse
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 16);
  }
  return date.toISOString().slice(0, 16);
};

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
