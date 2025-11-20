import React from 'react'
import { Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import { Button } from '@/assets/buttons';
import { FaXTwitter } from 'react-icons/fa6';
import { useAlert } from '@/providers/alert';
import { FaGoogle, FaSlack } from 'react-icons/fa';

interface Option {
  name: string
  provider: string
  icon: React.JSX.Element
}

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

const SignInOptions = () => {
  const { showAlert } = useAlert();

  function notAuthorized(option: Option) {
    const provider = option.provider.toUpperCase()
    const clientIdKey = `NEXT_PUBLIC_${provider}_CLIENT_ID`
    const clientId = process.env[clientIdKey]

    if (!clientId) {
      return showAlert(
        "You are not authorized for SSO. Please use email/ password",
        "warning"
      )
    }
    signIn(option.provider)
  }

  return (
    <Stack gap={2}>
      { signInOptions.map((option, key) => (
        <Button
          key={key}
          tone='secondary'
          startIcon={option.icon}
          onClick={() => notAuthorized(option)}
        >
          <span className='font-weight-l'>Continue with {option.name}</span>
        </Button>
      ))}
    </Stack>
  )
}

export default SignInOptions