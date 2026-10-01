import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Demo = () => {
  return (
    <Box>   
      <Box textAlign={'center'}>
        <Typography
          component="h2"
          sx={{
            lineHeight: 1.35,
            textAlign: 'center',
            letterSpacing: "-0.06em",
            fontSize: { xs: "2.2rem", md: "3.4rem" },
          }}
        >
          Need a visual walkthrough? &nbsp;
          <Box 
            component="span" 
            color="var(--flair)" 
            sx={{ 
              display: { 
                xs: 'block',
                md: 'inline',
              }
            }}
          >
            See how TicTask works.
          </Box>
        </Typography>
        <Typography mt={2} mb={5} variant='h6'>
          We have detailed some of the common flow and actions users experience in a 4-minute video
        </Typography>
      </Box>     
          
      <Box p={1} bgcolor={'black'} borderRadius={2}>
        <Grid 
          container 
          spacing={1} 
          alignItems="center" 
          justifyContent="center"
        >
          <Grid sx={{ width: { xs: 300, sm: 500, lg: 600 } }}>
            <Image
              src="/product/Tictask_Join.jpg"
              alt="Demo Image"
              width={600}
              height={400}
              loading="eager"
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
              src="https://www.youtube.com/embed/7t4e0wtqsvY?si=mTiyxjxR1LHAckHt"
              title="YouTube demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{ 
                width: { xs: '100%', sm: 600 }, 
                minHeight: { xs: 200, sm: 401 },
                alignItems: 'center',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Demo