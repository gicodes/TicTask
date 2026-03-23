import { useSession, signOut } from 'next-auth/react';

export   const checkUserPrevSignedIn = async () => {
  const { data, status } = useSession();

  if (data?.user || status==="loading" ) await signOut({ redirect: false});
  else return;
};