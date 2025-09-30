import { authOptions } from './authOptions';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  return user;
}