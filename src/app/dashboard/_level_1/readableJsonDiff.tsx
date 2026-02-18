'use client';

import { Box, Typography, Paper, Divider, Chip, styled } from '@mui/material';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

type ChangeValue = string | object | null | undefined;

interface ReadableJsonDiffProps {
  from?: ChangeValue;
  to?: ChangeValue;
  label?: string; 
  className?: string;
  variant?: 'compact' | 'detailed';
  showRawJsonButton?: boolean;
  aiText?: ChangeValue;
}

const DiffPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
  borderRadius: theme.shape.borderRadius,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  overflowX: 'auto',
}));

const FieldLabel = styled(Typography)({
  fontWeight: 600,
  display: 'inline-block',
  minWidth: '140px',
  color: '#d19a66',
});

const Removed = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  textDecoration: 'line-through',
  backgroundColor: 'rgba(248, 81, 73, 0.15)',
  padding: '1px 4px',
  borderRadius: 4,
}));

const Added = styled('span')(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'rgba(63, 185, 47, 0.18)',
  padding: '1px 4px',
  borderRadius: 4,
}));

export default function ReadableJsonDiff({
  from,
  to,
  label,
  variant = 'detailed',
  showRawJsonButton = true,
  className,
}: ReadableJsonDiffProps) {
  const hasChange = from !== undefined || to !== undefined;

  if (!hasChange) {
    return (
      <Typography variant="body2" color="text.secondary">
        No change recorded
      </Typography>
    );
  }

  let fromObj = typeof from === 'string' ? safeParse(from) : from;
  let toObj = typeof to === 'string' ? safeParse(to) : to;

  const isObjectChange = isPlainObject(fromObj) || isPlainObject(toObj);

  if (variant === 'compact' && isObjectChange) {
    return <CompactDiff from={fromObj} to={toObj} label={label} />;
  }

  return (
    <Box className={className} sx={{ my: 1.5 }}>
      {label && (
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      )}

      <DiffPaper elevation={0}>
        {from !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="text.secondary">
              Before
            </Typography>
            <ValueRenderer value={fromObj} mode="from" />
          </Box>
        )}

        {to !== undefined && (
          <>
            <Typography variant="overline" color="text.secondary">
              After
            </Typography>
            <ValueRenderer value={toObj} mode="to" />
          </>
        )}

        {showRawJsonButton && (from || to) && (
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Chip
              size="small"
              label="Show raw JSON"
              onClick={() => alert(JSON.stringify({ from: fromObj, to: toObj }, null, 2))}
              variant="outlined"
            />
          </Box>
        )}
      </DiffPaper>
    </Box>
  );
}

function safeParse(str: string): any {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

function isPlainObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

interface ValueRendererProps {
  value: any;
  mode: 'from' | 'to';
}

function ValueRenderer({ value, mode }: ValueRendererProps) {
  if (value === null || value === undefined) {
    return <Typography component="span" color="text.disabled">null</Typography>;
  }

  if (typeof value === 'object') {
    return (
      <Box sx={{ mt: 1 }}>
        <JSONPretty
          data={value}
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.5,
          }}
          mainStyle="padding:0"
          keyStyle="color:#9cdcfe"
          valueStyle="color:#ce9178"
          stringStyle="color:#9cdcfe"
        />
      </Box>
    );
  }

  // Simple values
  const color = mode === 'from' ? 'error.main' : 'success.main';
  const Component = mode === 'from' ? Removed : Added;

  return (
    <Component>
      {JSON.stringify(value)}
    </Component>
  );
}


function CompactDiff({ from, to, label }: { from?: any; to?: any; label?: string }) {
  if (!from || !to) return null;

  const changes: Record<string, { old?: any; new?: any }> = {};

  const allKeys = new Set([...Object.keys(from), ...Object.keys(to)]);
  allKeys.forEach(key => {
    if (JSON.stringify(from[key]) !== JSON.stringify(to[key])) {
      changes[key] = { old: from[key], new: to[key] };
    }
  });

  if (Object.keys(changes).length === 0) return null;

  return (
    <Box sx={{ my: 1 }}>
      {label && <Typography variant="subtitle2">{label}</Typography>}
      <Paper variant="outlined" sx={{ p: 1.5, fontSize: '0.9rem' }}>
        {Object.entries(changes).map(([key, { old, new: newer }]) => (
          <Box key={key} sx={{ mb: 0.75 }}>
            <FieldLabel>{key}:</FieldLabel>{' '}
            {old !== undefined && (
              <>
                <Removed>{formatCompactValue(old)}</Removed>
                {' → '}
              </>
            )}
            <Added>{formatCompactValue(newer)}</Added>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

function formatCompactValue(val: any): string {
  if (val === null) return 'null';
  if (typeof val === 'object') {
    if (Array.isArray(val)) return `[${val.length} items]`;
    return '{…}';
  }
  return String(val);
}