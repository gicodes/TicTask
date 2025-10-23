"use client";
import styles from "@/app/page.module.css";
import { Card, CardContent, Box, Stack, Typography, Button } from "@mui/material";

export const ResourceHero = () => {
  return (
    <Box 
      py={15} 
      textAlign="center" 
      color={'var(--background)'}
      bgcolor={'var(--foreground)'}
      px={1.5}
    >
      <Stack spacing={3} alignItems="center" px={1.5}>
        <Typography variant="h3" fontWeight={700}>
          Learn. Build. Grow with TicTask.
        </Typography>
        <Typography variant="body1" color="var(--secondary)" maxWidth="md">
          Dive into resources, guides, and changelogs to make the most of your TicTask experience.
        </Typography>
        <button className={styles.btnPrimary}>Explore Resources</button>
      </Stack>
    </Box>
  );
}

const resources = [
  { title: "Getting Started", desc: "Your first 10 minutes with TicTask", link: "/docs" },
  { title: "Templates", desc: "Jumpstart workflows with ready-made templates", link: "/templates" },
  { title: "Changelog", desc: "See what’s new and improved", link: "/changelog" },
  { title: "Blog", desc: "Insights, guides, and stories from the TicTask team", link: "/blog" },
];

export const ResourceGrid = () => {
  return (
    <section>
      <Box 
        justifyContent={'space-around'}
        display={'flex'} 
        flexWrap={'wrap'} 
        maxWidth={'lg'} 
        mx={'auto'} 
        gap={5} 
        px={1}
        py={10}
      >
        {resources.map((r) => (
          <Card
            key={r.title} 
            elevation={1}
              sx={{
                p: 1,
                mb: 1,
                width: '100%',
                maxWidth: 420,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
              }}
            >            
              <CardContent sx={{ p: 3, textAlign: 'center'}}>
                <Typography variant="h4" fontWeight={501}>{r.title}</Typography>
                <Typography my={2}>{r.desc}</Typography>
                <Button 
                  href={r.link}
                  color="warning" 
                  className={styles.btnRetreat}
                >
                  Explore
                </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </section>
  );
}

export default function ResourcePage () {
  return (
    <Box>
      <ResourceHero />
      <ResourceGrid />
    </Box>
  )
}
