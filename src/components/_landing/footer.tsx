import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { FOOTER_LINKS } from "@/constants/footerLinks";

const Footer = () => {
  return (
    <Box component="footer" py={2}>
      <Container>
        <Grid container 
          spacing={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12}} 
          width={'100%'}

        >
          {
            Object.entries(FOOTER_LINKS).map(([title, items], i) => (
              <Grid key={i} width={{xs: '100%', sm: 'fit-content'}} maxWidth={125}>
                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  mb={2}
                  color="silver"
                >
                  {title}
                </Typography>
                {items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    color="inherit"
                    underline="hover"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    {item.title}
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