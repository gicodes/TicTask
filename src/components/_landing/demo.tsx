import { Box, Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Demo = () => {
  return (
    <Box p={1} bgcolor={'black'} borderRadius={2}>
      <Grid 
        container 
        spacing={4} 
        alignItems="center" 
        justifyContent="center"
      >
        <Grid sx={{ width: { xs: 300, sm: 500, lg: 600 } }}>
          <Image
            src="/abstract/tictask_imagine.jpg"
            alt="Demo Image"
            width={600}
            height={400}
            style={{ 
              width: '100%', 
              height: 'auto' 
            }}
          />
        </Grid>
        <Grid>
          <Box
            component="iframe"
            width="100%"
            height="auto"
            src="https://www.youtube.com/embed/v=XUkq-0LtKvU"
            title="YouTube demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{ 
              display: 'block', 
              width: { xs: '100%', sm: 600 }, 
              minHeight: { xs: 200, sm: 400 },
              alignItems: 'center',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Demo