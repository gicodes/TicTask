import { Typography, Box } from '@mui/material'

const NoTickets = () => {
  return (
    <Box
        mt={6}
        py={12}
        textAlign="center"
        border="1px dashed"
        borderColor="divider"
        borderRadius={3}
        bgcolor="background.paper"
      >
        <Typography variant="h6" color="text.secondary">
          No tickets here yet
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Create one to get started
        </Typography>
      </Box>
  )
}

export default NoTickets