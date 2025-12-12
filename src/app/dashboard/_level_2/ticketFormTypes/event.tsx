import { TextField, Stack } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { DatePicker } from "../../_level_1/tDateControl";
import EventMeetingAttendeesInput from "../../_level_1/tEvenMeetingAttd";

type Props = { control: Control };

export default function EventMeetingForm({ control }: Props) {
  return (
    <Stack spacing={2} mt={2}>
      <Controller 
        name="title" 
        control={control} 
        render={({ field }) => 
        <TextField
          label="Title"
          required
          {...field}
        />} 
      />
      <Controller
        name="description"
        control={control}
        render={({field }) => 
          <TextField 
            label="Description" 
            multiline minRows={2} 
            {...field} 
          />
        } 
      />
      <DatePicker control={control} name="startTime" label="Start Time" />
      <DatePicker control={control} name="endTime" label="End Time" />
      <Controller
        name="location"
        control={control}
        render={({ field }) =>
          <TextField
            label="Location"
            {...field}
          />
        }
      />
      <Controller
        name="attendees"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <EventMeetingAttendeesInput
            value={field.value}
            onChange={(arr) => field.onChange(arr)}
            onBlur={field.onBlur}
          />
        )}
      />
    </Stack>
  );
}
