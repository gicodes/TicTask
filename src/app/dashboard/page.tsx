'use client';

import { useAuth } from '@/providers/auth';
import { redirect } from "next/navigation";

export default function Page() {
  const { user } = useAuth();
 
  if (user?.role === "ADMIN") {
    return redirect("/dashboard/admin");
  }

  return redirect("/dashboard/tickets");
}
