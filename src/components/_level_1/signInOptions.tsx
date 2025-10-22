import React from 'react'
import { Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import styles from '@/app/page.module.css';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGoogle, FaSlack } from 'react-icons/fa';

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
  return (
    <Stack gap={2}>
      { signInOptions.map((option, key) => (
        <button
          key={key}
          onClick={() => signIn(option.provider)}
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