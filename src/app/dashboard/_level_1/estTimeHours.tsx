import { Typography, Stack, TextField, FormControl, Select, MenuItem } from "@mui/material";
import { useState, useMemo } from "react";

export function EstimatedTimeField({
  estimatedHours,
  editMode,
  onChange,
}: {
  estimatedHours: number | undefined;
  editMode: boolean;
  onChange: (hours: number | undefined) => void;
}) {
  const [unit, setUnit] = useState<'hours' | 'days'>('hours');

  const displayValue = useMemo(() => {
    if (estimatedHours === null || estimatedHours === undefined) return '';
    return unit === 'hours' 
      ? estimatedHours 
      : Number((estimatedHours / 24).toFixed(1));
  }, [estimatedHours, unit]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === '') {
      onChange(undefined);
      return;
    }

    const num = parseFloat(raw);
    if (isNaN(num) || num < 0) return; 

    const hours = unit === 'hours' ? num : num * 24;
    onChange(hours);
  };

  // const toggleUnit = () => {
  //   setUnit(prev => prev === 'hours' ? 'days' : 'hours');
  // };

  const label = unit === 'hours' 
    ? "Estimated time (hours)" 
    : "Estimated time (days)";

  const helperText = unit === 'days' 
    ? "1 day = 24 hours" 
    : estimatedHours && estimatedHours > 48 
      ? `≈ ${(estimatedHours / 24).toFixed(1)} days` 
      : undefined;

  if (!editMode) {
    if (!estimatedHours) {
      return (
        <Typography variant="caption" color="text.secondary">
          <i>No estimated time set</i>
        </Typography>
      );
    }

    const display = estimatedHours <= 48 
      ? `${estimatedHours} hours` 
      : `${(estimatedHours / 24).toFixed(1)} days`;

    return (
      <Typography variant="body2">
        Estimated time: <strong>{display}</strong>
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <TextField
        label={label}
        type="number"
        size="small"
        value={displayValue}
        onChange={handleValueChange}
        inputProps={{
          step: unit === 'hours' ? 0.5 : 0.1,
          min: 0.5,
        }}
        sx={{ flex: 1, maxWidth: 150 }}
        helperText={helperText}
        FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
      />

      <FormControl size="small" sx={{ minWidth: 100 }}>
        <Select
          value={unit}
          onChange={(e) => setUnit(e.target.value as 'hours' | 'days')}
          displayEmpty
        >
          <MenuItem value="hours">hours</MenuItem>
          <MenuItem value="days">days</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}