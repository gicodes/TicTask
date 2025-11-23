import React from "react";
import { Button } from "@/assets/buttons";
import { Add, Delete } from "@mui/icons-material";
import { TextField, Stack, IconButton } from "@mui/material";
import { Controller, Control, useFieldArray } from "react-hook-form";

type Props = { control: Control };

export default function TaskForm({ control }: Props) {
  const checklist = useFieldArray({ control, name: 'checklist' as const });
  const subtasks = useFieldArray({ control, name: 'subtasks' as const });

  return (
    <Stack spacing={2} mt={2}>
      <Controller 
        name="title" 
        control={control} 
        render={({ field }) => 
          <TextField label="Task Title" required {...field} />
        } 
      />
      <Controller 
        name="description" 
        control={control} 
        render={({ field }) => 
          <TextField label="Description" multiline minRows={3} {...field} />
        } 
      />
      <Controller 
        name="assignTo" 
        control={control} 
        render={({ field }) => 
          <TextField label="Assign to (email)" {...field} />
        } 
      />
      <Controller 
        name="estimatedTimeHours" 
        control={control} 
        render={({ field }) => 
          <TextField type="number" label="Estimated time (hours)" {...field} />
        } 
      />
      <Controller 
        name="recurrence" 
        control={control} 
        render={({ field }) => 
          <TextField label="Recurrence (e.g. daily, weekly, cron)" {...field} />
        } 
      />
      <div>
        <div style={{
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center'
        }}
      >
          <strong>Checklist</strong>
          <Button 
            size="small" 
            tone="secondary"
            startIcon={<Add />} 
            onClick={() => checklist.append('')}
          >
            Add
          </Button>
        </div>
        {checklist.fields.map((f, i) => (
          <div 
            key={f.id} 
            style={{
              display:'flex', 
              gap:8, 
              marginTop:8, 
              alignItems:'center'
            }}
          >
            <Controller 
              name={`checklist.${i}` as const} 
              control={control} 
              render={({ field }) => 
                <TextField {...field} fullWidth />
              } 
            />
            <IconButton 
              size="small" 
              onClick={() => checklist.remove(i)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>

      <div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <strong>Subtasks</strong>
          <Button 
            size="small" 
            tone="retreat"
            startIcon={<Add />} 
            onClick={() => subtasks.append({ title: '' })}
          >
            Add
          </Button>
        </div>
        {subtasks.fields.map((f, i) => (
          <div key={f.id} style={{display:'flex', gap:8, marginTop:8, alignItems:'center'}}>
            <Controller 
              name={`subtasks.${i}.title` as const}
              control={control} 
              render={({ field }) => 
                <TextField {...field} placeholder="Subtask title" />
              } 
            />
            <IconButton size="small" onClick={() => subtasks.remove(i)}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>

      <Controller name="attachments" control={control} render={({ field }) => (
        <TextField 
          label="Attachments (comma separated URLs)" 
          value={(field.value || []).join(',')} 
          onChange={(e) => field.onChange(
            e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} 
          />
        )} 
      />
    </Stack>
  );
}
