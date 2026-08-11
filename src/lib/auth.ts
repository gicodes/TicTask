import { authOptions } from './authOptions';
import { getServerSession, Session } from 'next-auth';

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.error === "RefreshAccessTokenError") {
    return null;
  }

  return {
    ...session.user,
    accessToken: (session as Session).accessToken,
  };
}