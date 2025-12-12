import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";

export const formatDatePickerLocal = (
  date: Date | string | null | undefined
): string => {
  if (!date) return "";

  if (
    typeof date === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date)
  ) {
    return date;
  }

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}` +
    `T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`
  );
};

export const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
  disabled,
}: {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  defaultValue?: PathValue<T, Path<T>>;
  disabled?: boolean;
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    disabled={disabled}
    render={({ field }) => {
      const safeValue = formatDatePickerLocal(field.value);

      return (
        <TextField
          {...field}
          value={safeValue}
          onChange={(e) => field.onChange(e.target.value)}  // ← SUBMITS EXACT SAME STRING RHF EXPECTS
          label={label ?? "Select Date & Time"}
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
      );
    }}
  />
);