import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Demo = () => {
  return (
    <Box>
      <Stack 
        px={{ xs: 2, md: 4 }}
        mb={{ xs: 3, md: 4 }}
        borderRadius={3}
        border={'1px solid color-mix(in srgb, var(--flair) 50%, transparent)'}
      >
        <Typography
          component="h2"
          sx={{
            my: 3,
            fontSize: { xs: "2.2rem", md: "3.4rem" },
            lineHeight: 1.35,
            letterSpacing: "-0.06em",
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
      </Stack>
      
      <Box p={1} bgcolor={'black'} borderRadius={2}>
        <Grid 
          container 
          spacing={4} 
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
                display: 'block', 
                width: { xs: '100%', sm: 600 }, 
                minHeight: { xs: 200, sm: 400 },
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