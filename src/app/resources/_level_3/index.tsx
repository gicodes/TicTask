"use client";

import { Card, CardContent, Box, Stack, Typography } from "@mui/material";
import { RESOURCES } from "@/constants/resources";
import styles from "@/app/page.module.css";
import Link from "next/link";

export const ResourceHero = ({
  title, subtitle
}: { title?: string, subtitle?: string}) => {
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
          {title || "Learn. Build. Grow with TicTask."}
        </Typography>
        <Typography variant="body1" color="var(--secondary)" maxWidth="md">
          {subtitle || "Dive into the technical and educational side of things with Documentations, Frequently Asked Questions, and Blogs to make the most of your TicTask experience."}
        </Typography>
        {!title && !subtitle && <button className={styles.btnPrimary}>
          <Link href={'/resources/docs'}>Explore Resources</Link></button>}
      </Stack>
    </Box>
  );
}

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
        {RESOURCES.map((r) => (
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
                <Link href={r.link} className={`custom-warm full-width ${styles.btnRetreat}`}>
                  ⟹
                </Link>
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
