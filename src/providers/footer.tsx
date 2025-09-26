import { Grid, Typography } from '@mui/material'

const GlobalFooter = () => {
  return (
    <Grid mx={'auto'} my={5}>
      <Typography variant="body2" textAlign="center" color="gray">
        © {new Date().getFullYear()} TicTask. All rights reserved.
      </Typography>
    </Grid>
  )
}

export default GlobalFooter