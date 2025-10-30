'use client';

import { motion } from "framer-motion";
import { DocTextBlock } from "@/types/resources";
import { Box, Card, CardContent, Chip, Link, Typography } from "@mui/material";

export const GenericHeader = () => (
  <Box textAlign={'center'} py={15} px={1}>
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ fontSize: 44}}
    >
      TicTask Documentation
    </motion.h1>
    <Typography variant="h6">
      Learn how to use TicTask quickly and effectively.
    </Typography>
  </Box>
)

export const DocSection = ({ 
    title, 
    blocks 
  }: { 
    title: string; 
    blocks: DocTextBlock[]
  }) => (
    <section id={title.replace(/\s+/g, '-').toLowerCase()}>
      <Box id={title.replace(/\s+/g, '-').toLowerCase()} py={10}>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Typography variant='h4' mb={3} fontWeight={700}>{title}</Typography>
          { blocks.map((b, i) => {
            if (typeof b === 'string') {
              return <section key={i} id={`${i+1}`}>
                <Typography mb={2} lineHeight={1.8}>{b}</Typography></section>; // normal - No {} or type renders this
            }
            switch (b.type) {
              case 'callout':
                return (
                  <section key={i} id={`${i+1}`} style={{ padding: '10px 0'}}>
                    <Card variant='outlined' sx={{ borderLeft: '4px solid var(--accent)' }}>
                      <CardContent>
                        <Typography variant='subtitle1' fontWeight={700} mb={1}>{b.title}</Typography>
                        <Typography>{b.content}</Typography>
                      </CardContent>
                    </Card>
                  </section>
                );
              case 'list':
                return (
                  <section key={i} id={`${i+1}`}>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                      { typeof b.content=="object" && b.content.map((li: string, idx: number) => 
                        <li key={idx}><Typography my={1}>{li}</Typography></li>)}
                    </ul>
                  </section>
                  );
              case 'code':
                return (
                  <section key={i} id={`${i+1}`}>
                    <Card variant='outlined' sx={{ mb: 2, }}>
                      <CardContent>
                        <Typography mb={1} color='primary'>{b.title}</Typography>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{b.content}</pre>
                      </CardContent>
                    </Card>
                  </section>
                );
              case 'badge':
                return <Chip key={i} label={b.content} color='primary' sx={{ margin: 1}} />
              case 'point':
                return <Typography key={i} my={1.5} fontWeight={501}>➢ {b.content}</Typography>
              case 'highlight':
                return <span key={i} className="custom-sharp" style={{ fontWeight: 501}}>{b.content}</span>
              case 'link':
                return <span key={i}><Link href={b.href || '#'}>{b.content}</Link></span>
              case 'inline':
                return <span key={i} style={{ lineHeight: 2, marginBottom: 2}}>{b.content}</span> // normal like default, but inline
              case 'disabled':
                return <span key={i} className="custom-dull font-xxs">{b.content}</span>
              case 'outline':
                return <span key={i} className={'btn'}>{b.content}</span>
              case 'italic':
                return <span key={i}><i>{b.content}</i></span>
              case 'strong':
                return <span key={i}><strong>{b.content}</strong></span>
              default:
                return <section key={i} id={`${i+1}`}>
                  <Typography my={1}>{b.content}</Typography>
                </section> // serves as paragraph
              }
            }
          )
        }
        </motion.div>
      </Box>
    </section>
);