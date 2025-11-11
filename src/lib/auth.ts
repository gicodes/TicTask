import { authOptions } from './authOptions.server';
import { getServerSession } from 'next-auth';

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return session.user;
}