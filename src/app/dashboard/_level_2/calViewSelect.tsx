import { View } from 'react-big-calendar';
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
import { useAlert } from '@/providers/alert';
import { Calendar, CalendarDays, Clock } from 'lucide-react';

export type InternalView = View | 'thisWeek';

const capitalizeView = (v: string) =>
  v.replace('_', ' ').replace(/\b\w/g, (c) => 
    c.toUpperCase()).replace('ThisWeek', 'This week');

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


export default function ViewSelect({
  onChange,
  hasThisWeek,
  internalView,
}: {
  hasThisWeek: boolean;
  internalView: InternalView;
  onChange: (val: InternalView) => void;
}) {
  const { showAlert } = useAlert();
  const handleSelect = (e: SelectChangeEvent<InternalView>) => {
    const newView = e.target.value as InternalView;

    onChange(newView);
    showAlert(`Calendar view changed to ${newView}. Set as default`, "success");
  };

  return (
    <FormControl 
      size="small" 
      sx={{ 
        minWidth: { 
          xs: 120, 
          sm: 150, 
          md: 180, 
          lg: 200 
        } 
      }}
    >
      <InputLabel id="view-select-label">Calendar View</InputLabel>
      <Select
        labelId="view-select-label"
        value={internalView}
        label="Calendar View"
        onChange={handleSelect}
        renderValue={(selected) => (
          <Stack 
            direction="row" 
            alignItems="center" 
            gap={{ xs: 0, sm: 3}}
          >
            <IconButton sx={{ display: { xs: 'none', sm: 'grid' } }}>
              {viewIcon(selected)}
            </IconButton>
            <Typography variant="body1">
              {capitalizeView(selected)}
            </Typography>
          </Stack>
        )}
      >
        {['month', hasThisWeek ? 'thisWeek' : null, 'week', 'day']
          .filter(Boolean)
          .map((v) => (
            <MenuItem key={v} value={v!}>
              <Stack direction="row" alignItems="center" gap={3}>
                <IconButton sx={{ display: { xs: 'none', sm: 'grid' }}}>
                  {viewIcon(v as InternalView)}
                </IconButton>
                <span>{capitalizeView(v!)}</span>{"  "}
              </Stack>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
