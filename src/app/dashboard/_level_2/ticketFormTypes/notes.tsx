import React, { useEffect, useRef, useState } from 'react';
import { TicketColor } from '@/types/ticket';
import { useTheme } from '@mui/material/styles';
import { NotesFormValues } from '../../_level_1/tSchema';
import { colorTooltipMap } from '../../_level_0/constants';
import { useFormContext, Controller } from 'react-hook-form';
import { LightweightRichEditor } from '../../_level_1/richTextEditior';
import {
  Box,
  Paper,
  Stack,
  IconButton,
  ToggleButton,
  TextField,
  Typography,
  Tooltip,
  alpha,
} from '@mui/material';
import { PaletteColor } from '@mui/material/styles';
import { PushPinOutlined, PushPin } from '@mui/icons-material';

export default function NoteForm() {
  const theme = useTheme();
  const autoTitleRef = useRef(true);
  const { control, setValue, watch } = useFormContext<NotesFormValues>();
  const [titleEditing, setTitleEditing] = useState(false);

  const description = watch('description') ?? '';
  const title = watch('title') ?? '';
  const color = (watch('color') ?? 'DEFAULT') as TicketColor;
  const isPinned = watch('isPinned') ?? false;

  useEffect(() => {
    if (!autoTitleRef.current) return;

    if (description) {
      const temp = document.createElement('div');
      temp.innerHTML = description;

      const plain =
        temp.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      const words = plain.split(' ').slice(0, 12).join(' ');

      if (words) {
        setValue('title', words, {
          shouldDirty: false,
          shouldValidate: false,
        });
      }
    }
  }, [description, setValue]);
  
  const paletteMap: Record<
    Exclude<TicketColor, 'DEFAULT'>,
    PaletteColor
  > = {
    INFO: theme.palette.info,
    SUCCESS: theme.palette.success,
    WARNING: theme.palette.warning,
    DANGER: theme.palette.error,
    SPECIAL: theme.palette.secondary,
  };

  const palette = color === 'DEFAULT' ? null : paletteMap[color];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        bgcolor:
          color === 'DEFAULT'
            ? 'transparent'
            : alpha(palette!.main, 0.12),
        borderColor:
          color === 'DEFAULT'
            ? theme.palette.divider
            : alpha(palette!.main, 0.5),
        transition: 'all 0.22s ease',
        '&:hover': {
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Stack spacing={2.5}>
        {titleEditing ? (
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                fullWidth
                label="Title"
                variant="outlined"
                size="medium"
                onChange={(e) => {
                  autoTitleRef.current = false;
                  field.onChange(e);
                }}
                onBlur={() => setTitleEditing(false)}
                sx={{
                  '& .MuiInputBase-root': {
                    fontWeight: 600,
                  },
                }}
              />
            )}
          />
        ) : (
          <Typography
            variant="h6"
            fontWeight={600}
            onClick={() => setTitleEditing(true)}
            sx={{
              cursor: 'text',
              minHeight: 40,
              display: 'flex',
              alignItems: 'center',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                bgcolor: alpha(
                  theme.palette.action.hover,
                  0.08
                ),
              },
              color: title.trim()
                ? 'text.primary'
                : 'text.secondary',
            }}
          >
            {title.trim() || 'Untitled note'}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          flexWrap="wrap"
        >
          {([
            'DEFAULT',
            'INFO',
            'SUCCESS',
            'WARNING',
            'DANGER',
            'SPECIAL',
          ] as TicketColor[]).map((c) => {
            const selected = color === c;
            const palette = c === 'DEFAULT' ? null : paletteMap[c];

            return (
              <Tooltip key={c} title={colorTooltipMap[c]} arrow>
                <IconButton
                  size="small"
                  onClick={() => setValue('color', c, { shouldDirty: true })}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    bgcolor:
                      c === 'DEFAULT'
                        ? theme.palette.background.default
                        : palette!.main,
                    border: selected
                      ? `3px solid ${theme.palette.background.paper}`
                      : '2px solid',
                    borderColor: selected
                      ? palette?.main ?? theme.palette.grey[500]
                      : theme.palette.divider,
                    boxShadow: selected ? 3 : 1,
                    '&:hover': {
                      bgcolor: c === 'DEFAULT' ? theme.palette.grey[400] : palette!.dark,
                    },
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <ToggleButton
            value="pin"
            selected={isPinned}
            onChange={() =>
              setValue('isPinned', !isPinned, {
                shouldDirty: true,
              })
            }
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              gap: 1,
              px: 2,
            }}
          >
            {isPinned ? (
              <PushPin fontSize="small" />
            ) : (
              <PushPinOutlined fontSize="small" />
            )}

            {isPinned ? 'Pinned' : 'Pin note'}
          </ToggleButton>
        </Box>

        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Note content
              </Typography>

              <LightweightRichEditor
                value={value ?? ''}
                onChange={onChange}
                placeholder={'Write your note here...'}
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
      </Stack>
    </Paper>
  );
}