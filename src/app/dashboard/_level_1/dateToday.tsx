import Typography from "@mui/material/Typography";

const now = new Date();

export const DateToday = () => (
    <Typography 
      noWrap 
      textAlign={{ 
        xs: 'center', 
        sm: 'left'
      }} 
      width={{ xs: 110, sm: 200 }}
    >
      <strong>{now.toDateString()}</strong>
    </Typography>
  )