import { Box, Container, Grid, Typography, Link } from "@mui/material";

const sections = {
  COMPANY: ["About", "Careers", "Become a Partner", "Find a Partner", "Contact Us"],
  PRODUCTS: ["View All Products", "Pricing", "Demo", "Status", "API Docs", "Integrations"],
  RESOURCES: ["Blog", "Case Studies", "Help Center", "Developers", "Free Tools", "Security"],
  LEGAL: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Data Protection"],
};

const Footer = () => {
  return (
    <Box component="footer" bgcolor="#111" color="white" py={6} mt={10}>
      <Container>
        <Grid container spacing={{ xs: 4, sm: 8, md: 12, lg: 16}} width={'100%'}>
          {Object.entries(sections).map(([title, items], i) => (
            <Grid key={i}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
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
          ))}
        </Grid>
        <Typography variant="body2" mt={6} textAlign="center" color="gray">
          © {new Date().getFullYear()} TicTask. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
