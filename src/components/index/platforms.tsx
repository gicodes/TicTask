"use client";
import { motion } from "framer-motion";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const platforms = [
  { name: "Trello", logo: "/platforms/trello.png", link: 'trello.com' }, 
  { name: "ClickUp", logo: "/platforms/clickup.png", link: 'clickup.com' },
  { name: "Asana", logo: "/platforms/asana.png", link: 'asana.com' },
  { name: "Jira", logo: "/platforms/jira.png", link: 'jira.com' },
  { name: "Notion", logo: "/platforms/notion.png", link: 'notion.com' },
];

const ProPlatform = () => {
  return (
    <Box 
      py={6}  
      mx={'auto'}
      textAlign={'center'}
      maxWidth={{ xs: 333, sm: 500, md: 777, lg: 1000, xl: 1200}}
    >
      <Typography 
        variant="h4" 
        fontWeight={600}
        fontSize={{ xs: 35, sm: 40, md: 42, lg: 45}} 
      >
        Got inspired by the right ideas
      </Typography>
      <Typography
        variant="subtitle1"
        color="disabled.main"
        mt={1} mb={4}
      > 
        Don&apos;t Get Left Out. Join The Moving Train. 
      </Typography>
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
            <Image loading="lazy" src={p.logo} alt={p.name} height={169} width={300} />
            <Typography display={'flex'} gap={2} variant="body2" mt={1} color="disabled.main" justifyContent={'space-around'}>
              {p.name} <span>➞</span> <Link href={p.link}><strong>{p.link}</strong></Link>
            </Typography>
            <Divider sx={{ mt: 2, bgcolor:'#222'}} />
          </Box>
        ))}
        </motion.div>
        <Divider sx={{ mt: 5, bgcolor:'#555'}} />
    </Box>
  );
};

export default ProPlatform;
