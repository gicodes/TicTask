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

const FAQ = () => {
  return (
    <Box 
      border={'1px solid var(--disabled)'}
      borderRadius={4} 
      px={2}
      py={{ xs: 2, sm: 4, md: 6}} 
      maxWidth={1000} 
      mx="auto"
      boxShadow={2}
    >
      <Typography variant="h5" textAlign="center" mb={4} fontWeight={600}>
        Frequently Asked Questions
      </Typography>
      
      <Card>
        {FAQs.map((f, i) => (
          <Accordion key={i} disableGutters sx={{ p: 1 }}>
            <AccordionSummary expandIcon={<VscTriangleDown />}>
              <Stack 
                display={'flex'} 
                direction={'row'} 
                alignItems={'center'} 
                gap={1}
              >
                <VscDebugBreakpointConditional /> 
                <Typography fontWeight={500}>
                  {f.q}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {f.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>
    </Box>
  );
};

export default FAQ;
