'use client';

import { useEffect } from "react";
import { useAuth } from '@/providers/auth';
import { Typography } from '@mui/material';
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (user.role === "ADMIN") {
      router.replace("/dashboard/admin");
    } else router.replace("/dashboard/tickets");
  }, [user, router]);

  return <Typography py={12} textAlign={'center'}>Loading...</Typography>;
}
