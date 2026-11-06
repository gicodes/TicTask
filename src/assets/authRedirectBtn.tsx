import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import Link from 'next/link';

const AuthRedirectBtn = () => {
  const { getLoginUrl } = useAuthRedirect();

  return (
    <Link href={getLoginUrl()} className='btn'> Login </Link>
  )
}

export default AuthRedirectBtn