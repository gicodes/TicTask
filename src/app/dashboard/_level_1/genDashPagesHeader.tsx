import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GDPHProps {
  title: string;
  description: string;
  extras?: ReactNode;
}

const GenericDashboardPagesHeader = ({
  title, description, extras
}: GDPHProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}> 
      <Stack spacing={1} textAlign={{xs: 'center', sm: 'inherit'}}> 
        <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}> 
          {title}
        </Typography> 
        <Typography variant="body1" sx={{ opacity: 0.7 }}> 
          {description}
        </Typography>
      </Stack> 
      {extras && extras}
    </motion.div>
  )
}

export default GenericDashboardPagesHeader;
