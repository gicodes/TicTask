import { Typography, type TypographyProps } from '@mui/material';

export function EllipsisTypography({
  sx,
  ...props
}: TypographyProps) {
  return (
    <Typography
      variant='body2'
      noWrap
      {...props}
      sx={{
        minWidth: 0,
        maxWidth: { xs: 100, sm: 150, lg: 200 },
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...sx,
      }}
    />
  );
}