import { Box, Container, Grid, Typography, Link } from "@mui/material";

const sections = {
  PRODUCTS: ["All Products", "Pricing", "Demo", "Integration"],
  RESOURCES: ["Blog", "Help Center", "Developer", "Free Tools", "Security"],
  COMPANY: ["About", "Careers", "Become a Partner", "Find a Partner", "Contact Us"],
  LEGAL: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Data Protection"],
};

const Footer = () => {
  return (
    <Box component="footer" py={2}>
      <Container>
        <Grid container 
          spacing={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 24}} 
          width={'100%'}
        >
          {
            Object.entries(sections).map(([title, items], i) => (
              <Grid key={i} mx={'auto'}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600} 
                  mb={2}
                  color="silver"
                >
                  {title}
                </Typography>
                {items.map((item, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    color="inherit"
                    underline="hover"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    {item}
                  </Link>
                ))}
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;