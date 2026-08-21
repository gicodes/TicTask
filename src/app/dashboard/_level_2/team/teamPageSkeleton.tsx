import { Box, Card, CardContent, Typography } from "@mui/material"
import type { ReactNode } from "react"

type TeamPageSkeletonProps = {
  children?: ReactNode,
  loading?: boolean
}

export const TeamPageSkeleton = ({ 
  children,
  loading = true
}: TeamPageSkeletonProps) => {
  return (
    <Box maxWidth={800} p={2} minHeight={'90vh'}>
      <Card 
        variant="outlined" 
        sx={{ 
          borderRadius: 3, 
          overflow: "hidden" 
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {loading && !children &&
            <Typography py={2} textAlign="center">
              Loading...
            </Typography>
          }
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}