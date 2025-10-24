import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const GenericHeader = () => (
  <Box textAlign={'center'} py={15} px={1}>
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      TicTask Documentation
    </motion.h1>
    <Typography variant="h6">
      Reading these docs should guide you through the basic functionalities of TicTask with clarity and calm.
    </Typography>
  </Box>
)