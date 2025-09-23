import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Typography 
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes, we offer a 14-day free trial. No credit card required.",
  },
  {
    q: "Can I integrate with Slack or Email?",
    a: "Absolutely, notifications can be routed via Email, SMS, and Slack.",
  },
  {
    q: "Is my data secure?",
    a: "We use enterprise-grade encryption and role-based access.",
  },
  {
    q: "What platforms do you support?",
    a: "We support Trello, ClickUp, Asana, Jira, and Notion.",
  },
  {
    q: "How can I get support?",
    a: "You can reach out to us via the contact form or email",
  },
];

const FAQ = () => {
  return (
    <Box py={{ xs: 2, sm: 4, md: 6}} maxWidth={1000} mx="auto">
      <Typography variant="h5" textAlign="center" mb={4} fontWeight={600}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((f, i) => (
        <Accordion key={i} disableGutters sx={{ p: 1,}}>
          <AccordionSummary expandIcon={<MdExpandMore/>}>
            <Typography fontWeight={500}>{f.q}</Typography>
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
