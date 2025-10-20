import { Role } from '@/types/users';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Join } from '@/components/pages/auth/join';

interface PageProps {
  params: Promise<{ role: string }>;
}

export const metadata: Metadata = {
  title: "Join ticTask",
  description: "Register and verify your email to create an account, manage your tasks efficiently.",
};

export default async function Page({ params }: PageProps) {
  const { role } = await params;
  const roleParam = role.toUpperCase() as Role;

  const validRoles: Role[] = ['USER', 'ADMIN'];
  if (!validRoles.includes(roleParam)) {
    notFound();
  }

  return <Join roleParam={roleParam} />;
}
