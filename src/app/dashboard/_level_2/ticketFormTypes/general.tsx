import React from 'react';
import { useAuth } from '@/providers/auth';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from '../../_level_1/tDateControl';
import { Autocomplete, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { EVENT_TAG_SUGGESTIONS, TAG_SUGGESTIONS, TICKET_PRIORITIES,} from '../../_level_0/constants';

type Props = {
  control: Control;
  task?: boolean;
  tagOptions?: readonly string[];
};

const GeneralForm = ({ control, task = false }: Props) => {
  const { user } = useAuth();

  return (
    <Stack spacing={2} mt={2}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => 
          <TextField label="Title" required {...field} />}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => 
          <TextField label="Description" multiline minRows={4} {...field} />}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <TextField select label="Priority" {...field}>
            {Object.values(TICKET_PRIORITIES).map((v) => (
              <MenuItem value={v} key={v}>
                {v[0] + v.slice(1).toLocaleLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      { user?.userType === 'BUSINESS' && (
        <Controller
          name="assignTo"
          control={control}
          render={({ field }) => 
            <TextField type="email" label="Assign to team (member email)" {...field} />}
        />
      )}
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={task ? EVENT_TAG_SUGGESTIONS as readonly string[] 
              : TAG_SUGGESTIONS as readonly string[]}
            value={field.value || []}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderInput={(params) => 
              <TextField {...params} label="Tags" placeholder="Add tags" />}
          />
        )}
      />

      <Stack py={1} spacing={2}>
        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          Set date {task ? 'and time for this task' : 'for this ticket'}
        </Typography>
        <DatePicker control={control} name="dueDate" defaultValue="" />
      </Stack>
    </Stack>
  );
};

export default GeneralForm;