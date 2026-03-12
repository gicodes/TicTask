import { useAuth } from '@/providers/auth';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from '../../_level_1/tDateControl';
import { LightweightRichEditor } from '../../_level_1/richTextEditior';
import { Autocomplete, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { TAG_SUGGESTIONS, TICKET_PRIORITIES, TicketType,} from '../../_level_0/constants';

export type GeneralFormProps = {
  control: Control;
  type?: TicketType
  tagOptions?: readonly string[];
};

const GeneralForm = ({ control, type = 'GENERAL' }: GeneralFormProps) => {
  const { user } = useAuth();

  return (
    <Stack spacing={2} mt={1}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => 
          <TextField label="Title" required {...field} />}
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
      {type==="GENERAL" && <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={TAG_SUGGESTIONS as readonly string[]}
            value={field.value || []}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderInput={(params) => 
              <TextField {...params} label="Tags" placeholder="Add tags" />}
          />
        )}
      />}

      <Stack py={1} spacing={2}>
        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          Set date for this ticket
        </Typography>
        <DatePicker control={control} name="dueDate" defaultValue="" />
      </Stack>
    </Stack>
  );
};

export default GeneralForm;