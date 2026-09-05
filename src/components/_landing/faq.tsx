'use client'

import { useState } from "react"; 
import { FAQs } from "@/constants/resources";
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Card, 
  Stack, 
  Typography 
} from "@mui/material";
import { 
  VscDebugBreakpointConditional, 
  VscTriangleDown 
} from "react-icons/vsc";

const FAQ = ({ faqPage }: { faqPage?: boolean }) => {
  const [openMore, setOpenMore] = useState(false);
  const visibleFAQs = openMore ? FAQs : FAQs.slice(0, 5);

  if (faqPage === true) return (
    <Box maxWidth={1200} mx="auto" px={2} py={4}>
      {FAQs.map((f, i) => (
        <Accordion 
          key={i} 
          disableGutters 
          sx={{ 
            py: { xs: 1.5, sm: 2 },
            px: { xs: 1, sm: 1.5, md: 2 } 
          }}
        >
          <AccordionSummary expandIcon={<VscTriangleDown />}>
            <Stack 
              display={'flex'} 
              direction={'row'} 
              alignItems={'center'} 
              gap={{ xs: 1.2, sm: 1.5, md: 2 }}
            >
              <VscDebugBreakpointConditional /> 
              <Typography fontSize={15} fontWeight={500}>
                {f.q}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary" p={1}>
              {f.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  ) 
  
  return (
    <Box 
      borderRadius={{ xs: 2, sm: 2.5, md: 3}} 
      p={1} 
      maxWidth={1000} 
      mx="auto"
      mt={8}
    >
      <Typography variant="h5" textAlign="center" mb={4} fontWeight={600}>
        Frequently Asked Questions
      </Typography>
      
      <Card sx={{ borderRadius: 3, px: 0}}>
        {visibleFAQs.map((f, i) => (
          <Accordion 
            key={i} 
            disableGutters 
            sx={{ 
              py: { xs: 1.5, sm: 2 },
              px: { xs: 0, sm: 1.5, md: 2 }, 
            }}
          >
            <AccordionSummary expandIcon={<VscTriangleDown />}>
              <Stack 
                display={'flex'} 
                direction={'row'} 
                alignItems={'center'} 
                gap={{ xs: 1.2, sm: 1.5, md: 2 }}
              >
                <VscDebugBreakpointConditional /> 
                <Typography fontSize={15} fontWeight={500}>
                  {f.q}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary" p={1}>
                {f.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>

      <Box 
        sx={{ 
          mt: 2,
          display: 'flex', 
          justifyContent: 'right', 
          cursor: 'pointer' 
        }}     
        onClick={() => setOpenMore(!openMore)}
      >
        <Typography sx={{ opacity: 0.7 }}>{openMore ? "Load Less" : "Load More"}</Typography>
      </Box>
    </Box>
  );
};

export default FAQ;
