import React from 'react'
import { Stack } from '@mui/material';
import { signIn } from 'next-auth/react';
import styles from '@/app/page.module.css';
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
    icon: <FaSlack color="#611F69" />
  }
];

const SignInOptions = () => {
  return (
    <Stack gap={2}>
      { signInOptions.map((option, key) => (
        <button
          key={key}
          onClick={() => signIn(option.provider)}
          className={`min-width-250 flex gap-3 ${styles.btnPrimary}`}
        >
          {option.icon}
          <span className='font-weight-l'>Continue with {option.name}</span>
        </button>
      ))}
    </Stack>
  )
}

export default SignInOptions