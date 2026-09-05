import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";
import { FOOTER_LINKS } from "@/constants/footerLinks";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      py={{ xs: 4, sm: 8, lg: 12}}
      margin={'0 auto'}
      maxWidth={1600}
      width={'100%'}
      color={'black'}
      bgcolor={'whitesmoke'}
    >
      <Container>
        <Grid 
          container 
          spacing={{ xs: 4, sm: 6, md: 8, lg: 10, xl: 12 }} 
          width={'100%'}
          
        >
          {
            Object.entries(FOOTER_LINKS).map(([title, items], i) => (
              <Grid 
                key={i} 
                maxWidth={125}
                margin={'0 auto'}
                width={{ xs: '100%', sm: 'fit-content' }} 
              >
                <Typography variant="h6" fontWeight={600}>
                  {title}
                </Typography>
                
                <Stack py={2} gap={1}>
                  {items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.link}
                      color="inherit"
                      underline="hover"
                    >
                      {item.title}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;