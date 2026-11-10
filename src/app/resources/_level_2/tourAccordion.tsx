import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Stack, Box } from '@mui/material';

const AccordionDisplay = ({
  title,
  image,
  subtitle,
  content,
}: {
  title: string;
  image?: string;
  subtitle?: string;
  content: React.ReactNode;
}): React.ReactNode => {
  return (
    <Accordion 
      sx={{
        boxShadow: 0,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="dashboard-navigation-content"
        id="dashboard-navigation-header"
      >
        <Stack>
          <Typography fontWeight={501}>{title}</Typography>
          <Typography variant='caption' color='var(--secondary)'>{subtitle}</Typography>
        </Stack>
      </AccordionSummary>
      
      <AccordionDetails>
        {image && (
          <Stack display="grid" gap={2}>
            <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
          </Stack>
        )}
        <Stack display="grid" gap={2}>
          {content}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionDisplay

export const BannerDisplay = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  return (
    <Box 
      my={1} 
      py={1}
      px={{ xs: 2, md: 4}}
      width={'fit-content'}
      borderRadius={1}
      bgcolor={'rgba(0,0,0,0.09)'}
      border={'0.1px solid rgba(0,0,0,0.05)'}
    >
      {children}
    </Box>
  )
}
