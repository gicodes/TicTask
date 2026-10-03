'use client'

import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Button } from '@/assets/buttons'
import { BulkEmailDialog } from '@/components/_level_2/adminBulkAction'

const page = () => {
  const [ openBulkActionDialog, setOpenBulkActionDialog] = useState(false)

  const handleBulkActionDialog = () => {
    setOpenBulkActionDialog(!openBulkActionDialog)
  }

  return (
    <Box>
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: 1500,
          mx: "auto",
          px: { xs: 2.5, md: 4 },
          py: { xs: 10, md: 16 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.42fr 0.58fr" },
            gap: { xs: 6, md: 10 },
            alignItems: "end",
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "3rem", md: "5.2rem" },
              lineHeight: 1,
              letterSpacing: "-0.07em",
              fontWeight: 450,
            }}
          >
            One Channel
            <Box
              component="span"
              sx={{
                display: "block",
                fontStyle: "italic",
                fontWeight: 380,
                letterSpacing: "-0.06em",
                color: "var(--accent)"
              }}
            >
              Multi Messages.
            </Box>
          </Typography>
          <Typography
            sx={{
              maxWidth: 500,
              ml: { md: "auto" },
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.6,
              opacity: 0.72,
            }}
          >
            Create Bulk Emails that can be sent to all users, specific roles, user types, or selected user IDs.
            Use this feature to send important announcements, updates, or notifications to your user base efficiently and effectively.
          </Typography>
        </Box>
        
        <Button onClick={handleBulkActionDialog}>
          {openBulkActionDialog ? 'Bulk Action Open' : 'Open Bulk Action'}
        </Button>
      </Box>

      {openBulkActionDialog && (
        <BulkEmailDialog 
          open={openBulkActionDialog}
          onClose={handleBulkActionDialog}
          target={{ kind: 'all' }}
          targetLabel="All Users"
        />
      )}
    </Box>
  )
}

export default page