import { Stack, TextField, Typography, InputAdornment, MenuItem } from "@mui/material";
import { CURRENCY_OPTIONS, SUGGESTED_TAGS } from "../../_level_1/tSchema";
import { Controller, Control, useWatch } from "react-hook-form";
import { DatePicker } from "../../_level_1/tDateControl";
import { Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

interface InvoiceFormProps {
  control: Control;
} 

const AmountField = ({ control }: { control: Control }) => {
  const currency = useWatch({ control, name: "currency", defaultValue: "USD" });
  const currencySymbol =
    CURRENCY_OPTIONS.find((c) => c.code === currency)?.symbol || "$";

  const amountValue = useWatch({ control, name: "amount" });
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (amountValue == null || amountValue === "") {
      setDisplayValue("");
    }
  }, [amountValue]);

  const formatValue = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Controller
      name="amount"
      control={control}
      rules={{
        required: "Amount is required",
        min: { value: 0.01, message: "Amount must be > 0" },
      }}
      render={({ field: { onChange, onBlur, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          value={displayValue}
          label="Amount"
          required
          placeholder="0.00"
          error={!!error}
          helperText={error?.message || "e.g. 1,250,000.00"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <strong>{currencySymbol}</strong>
              </InputAdornment>
            ),
          }}
          inputProps={{ inputMode: "decimal" }}

          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.]/g, "");
            setDisplayValue(raw);

            const numeric = parseFloat(raw);
            if (!isNaN(numeric)) onChange(numeric);
          }}

          onBlur={() => {
            if (displayValue === "") return;
            const numeric = parseFloat(displayValue);
            if (!isNaN(numeric)) {
              const formatted = formatValue(numeric);
              setDisplayValue(formatted);
              onChange(numeric);
            }
            onBlur();
          }}
        />
      )}
    />
  );
};

export default function InvoiceForm({ control }: InvoiceFormProps) {
  return (
    <Stack spacing={3} mt={2}>
      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Invoice Title"
            required
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        )}
      />

      <AmountField control={control} />

      <Controller
        name="currency"
        control={control}
        defaultValue="USD"
        render={({ field }) => (
          <TextField select label="Currency" {...field}>
            {CURRENCY_OPTIONS.map(({ code, symbol, name }) => (
              <MenuItem key={code} value={code}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <span style={{ fontSize: "1.3em" }}>{symbol}</span>
                  <span>{code}</span>
                  <Typography variant="body2" color="text.secondary">
                    {name}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            label="Description (Optional)"
            multiline
            rows={2}
            placeholder="e.g. Annual subscription renewal – Q4 2025"
            {...field}
          />
        )}
      />

      <Controller 
        name="extClient"
        control={control}
        render={({ field }) => (
          <TextField label="Bill to [client email]" {...field} />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={SUGGESTED_TAGS}
            value={field.value || []}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField {...params} label="Tags (Optional)" placeholder="Add tags..." />
            )}
          />
        )}
      />

      <Controller
        name="recurrence"
        control={control}
        render={({ field }) => (
          <TextField select label="Recurrence (Optional)" {...field} value={field.value || ""}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </TextField>
        )}
      />

      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Payment Deadline (Optional)
        </Typography>
        <DatePicker control={control} name="dueDate" />
      </Stack>
    </Stack>
  );
}