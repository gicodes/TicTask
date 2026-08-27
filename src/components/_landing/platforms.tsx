"use client";
import { motion } from "framer-motion";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const platforms = [
  { name: "Trello", logo: "/platforms/trello.png", link: 'https://trello.com' }, 
  { name: "ClickUp", logo: "/platforms/clickup.png", link: 'https://app.clickup.com' },
  { name: "Asana", logo: "/platforms/asana.png", link: 'https://asana.com' },
  { name: "Jira", logo: "/platforms/jira.png", link: 'https://jira.com' },
  { name: "Notion", logo: "/platforms/notion.png", link: 'https://notion.com' },
];

const ProPlatform = () => {
  return (
    <Box 
      py={5}  
      mx={'auto'}
      textAlign={'center'}
      maxWidth={{ xs: 333, sm: 500, md: 777, lg: 1000, xl: 1200}}
    >
      <Stack px={1} pt={2} pb={5} spacing={2}>
        <Typography 
          variant="h4" 
          fontWeight={600}
          fontSize={{ xs: 35, sm: 40, md: 42, lg: 45}} 
        >
          The right ideas inspire us all
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ opacity: 0.8 }}
        > 
          Don&apos;t get left out. Join the moving train. 
        </Typography>
      </Stack>
      
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
        style={{
          display: "flex",
          gap: 50,
          overflow: "hidden",
          margin: '0 auto',
          width: 'fit-content',
        }}
      >
        {[...platforms, ...platforms].map((p, i) => (
          <Box key={i} textAlign="center">
            <Image 
              loading="lazy" 
              src={p.logo} 
              alt={p.name} 
              height={169} 
              width={300} 
            />
            <Typography 
              display={'flex'} 
              gap={2} 
              variant="body2" 
              mt={1} 
              justifyContent={'space-between'}
              sx={{ opacity: 0.7}}
            >
              {p.name} 
              <span>🖇️</span> <Link href={p.link}><strong>{p.link}</strong></Link>
            </Typography>
            <Divider sx={{ mt: 2, bgcolor:'#222'}} />
          </Box>
        ))}
        </motion.div>
    </Box>
  );
};

export default ProPlatform;
