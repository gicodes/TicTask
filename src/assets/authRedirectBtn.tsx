import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import Link from 'next/link';

const AuthRedirectBtn = () => {
  const { getLoginUrl } = useAuthRedirect();

  return (
    <Link href={getLoginUrl()} className='custom-link'> Login </Link>
  )
}

export default AuthRedirectBtn