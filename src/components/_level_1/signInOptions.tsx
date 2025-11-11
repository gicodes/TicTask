import React from 'react'
import { Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import styles from '@/app/page.module.css';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGoogle, FaSlack } from 'react-icons/fa';
import { useAlert } from '@/providers/alert';

const signInOptions = [
  {
    name: 'Google',
    provider: 'google',
    icon: <FaGoogle color="#4285F4" />
  },
  {
    name: 'Slack',
    provider: 'slack',
    icon: <FaSlack color="darkslateblue" />
  },
  { 
    name: 'X',
    provider: 'x',
    icon: <FaXTwitter />
  },
];

interface Option {
  name: string
  provider: string
  icon: React.JSX.Element
}

const SignInOptions = () => {
  const { showAlert } = useAlert();

  function notAuthorized(option: Option) {
    const provider = option.provider.toUpperCase()
    const clientIdKey = `NEXT_PUBLIC_${provider}_CLIENT_ID`
    const clientId = process.env[clientIdKey]

    if (!clientId) {
      return showAlert(
        "You are not authorized for SSO. Please use email/ password or contact administrator",
        "warning"
      )
    }

    signIn(option.provider)
  }

  return (
    <Stack gap={2}>
      { signInOptions.map((option, key) => (
        <button
          key={key}
          onClick={() => notAuthorized(option)}
          className={`min-width-250 flex gap-3 ${styles.btnSecondary}`}
        >
          {option.icon}
          <span className='font-weight-l'>Continue with {option.name}</span>
        </button>
      ))}
    </Stack>
  )
}

export default SignInOptions