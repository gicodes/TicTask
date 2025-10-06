import { authOptions } from './authOptions';
import { getServerSession } from 'next-auth';

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return session.user;
}