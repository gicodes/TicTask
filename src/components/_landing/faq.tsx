import { FAQs } from "@/constants/resources";
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Stack, 
  Typography 
} from "@mui/material";
import { VscDebugBreakpointConditional, VscTriangleDown } from "react-icons/vsc";

const FAQ = () => {
  return (
    <Box py={{ xs: 2, sm: 4, md: 6}} maxWidth={1000} mx="auto">
      <Typography variant="h5" textAlign="center" mb={4} fontWeight={600}>
        Frequently Asked Questions
      </Typography>
      
      {FAQs.map((f, i) => (
        <Accordion key={i} disableGutters sx={{ p: 1,}}>
          <AccordionSummary expandIcon={<VscTriangleDown />}>
            <Stack display={'flex'} direction={'row'} alignItems={'center'} gap={1}>
              <VscDebugBreakpointConditional /> 
              <Typography fontWeight={500}>{f.q}
            </Typography></Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
