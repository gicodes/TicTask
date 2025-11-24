import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { InternalView } from './_calendar';
import { Calendar, CalendarDays, Clock } from 'lucide-react';

const viewIcon = (v: InternalView) => {
  switch (v) {
    case 'month':
      return <Calendar size={18} />;
    case 'week':
    case 'thisWeek':
      return <CalendarDays size={18} />;
    case 'day':
      return <Clock size={18} />;
  }
};

const capitalizeView = (v: string) =>
  v.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace('ThisWeek', 'This Week');

export default function ViewSelect({
  internalView,
  onChange,
  hasThisWeek,
}: {
  internalView: InternalView;
  onChange: (val: InternalView) => void;
  hasThisWeek: boolean;
}) {
  const handleSelect = (e: SelectChangeEvent<InternalView>) => {
    onChange(e.target.value as InternalView);
  };

  return (
    <FormControl size="small" sx={{ minWidth: { xs: 100, sm: 125, md: 150, lg: 180 } }}>
      <InputLabel id="view-select-label">View</InputLabel>
      <Select
        labelId="view-select-label"
        value={internalView}
        label="View"
        onChange={handleSelect}
        renderValue={(selected) => (
          <Stack direction="row" alignItems="center" gap={3} px={{xs: 1, sm: 0}}>
              <IconButton sx={{ display: { xs: 'none', sm: 'grid' } }}>
                {viewIcon(selected)}
              </IconButton>
            <Typography variant="body1">{capitalizeView(selected)}</Typography>
          </Stack>
        )}
      >
        {['month', hasThisWeek ? 'thisWeek' : null, 'week', 'day']
          .filter(Boolean)
          .map((v) => (
            <MenuItem key={v} value={v!}>
              <Stack direction="row" alignItems="center" gap={3}>
                <IconButton sx={{ display: { xs: 'none', sm: 'grid' } }}>
                  {viewIcon(v as InternalView)}
                </IconButton>
                <span>{capitalizeView(v!)}</span>
              </Stack>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
