
"use client";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Skeleton,
  Divider,
} from "@mui/material";

export default function TeamsSkeleton() {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={0.8}>
            <Skeleton
              variant="text"
              width={180}
              height={34}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width={230}
              height={22}
              animation="wave"
            />
          </Stack>

          <Divider />

          {/* Team placeholders */}
          {[1, 2, 3].map((item) => (
            <Box key={item}>
              <Box
                sx={{
                  py: 1,
                  px: 1,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Stack spacing={0.5} flex={1} minWidth={0}>
                  <Skeleton
                    variant="text"
                    width={`${45 + item * 8}%`}
                    height={25}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="75%"
                    height={19}
                    animation="wave"
                  />
                </Stack>

                <Stack alignItems="flex-end" spacing={0.5}>
                  <Skeleton
                    variant="text"
                    width={55}
                    height={20}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={105}
                    height={18}
                    animation="wave"
                  />
                </Stack>
              </Box>

              {item !== 3 && <Divider sx={{ opacity: 0.5 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
