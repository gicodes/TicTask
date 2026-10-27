import { VALUES } from "@/constants/company";
import { Box, Grid, Stack, Typography } from "@mui/material";

export const ValuesSection = () => {
  return (
    <Box
      component="section"
      py={{ xs: 10, md: 14 }}
      px={{ xs: 2, md: 4 }}
      color="var(--background)"
      bgcolor="var(--foreground)"
    >
      <Stack maxWidth="lg" mx="auto" spacing={6} textAlign="center">
        <Box display={'grid'} gap={2}>
          <Typography 
            variant="h3" 
            fontWeight={650} sx={{ letterSpacing: "-0.02em" }}
          >
            What guides the product
          </Typography>
          <Typography 
            sx={{ 
              opacity: 0.75, 
              maxWidth: 600, 
              mx: "auto", 
              fontSize: 17 
            }}
          >
            There are values to consider when deciding what belongs in TicTask
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {VALUES.map((v) => (
            <Grid key={v.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  p: { xs: 2, md: 3},
                  gap: 2,
                  display: 'flex',
                  borderRadius: 2,
                  flexDirection: 'column',
                  background: "rgba(255,255,255,0.04)",
                  border: "1px dashed var(--disabled)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={650}
                >
                  {v.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  {v.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};