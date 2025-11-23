import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField, Stack } from "@mui/material";

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
      <Controller
        name="startTime"
        control={control}
        render={({ field}) =>
          <TextField
            label="Start
            time"
            type="datetime-local"
            InputLabelProps={{
              shrink:
              true
            }}
            {...field}
          />
        }
      />
      <Controller
        name="endTime"
        control={control}
        render={({ field }) => 
          <TextField
            label="End
            time"
            type="datetime-local"
            InputLabelProps={{
              shrink:
              true
            }}
            {...field}
          />
        }
      />
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
        render={({ field }) =>
        <TextField
          label="Attendees (comma separated emails)" 
          value={(field.value || []).join(',')} 
          onChange={(e) => field.onChange(e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} 
          />
        } 
      />
    </Stack>
  );
}
