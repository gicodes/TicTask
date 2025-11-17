'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/auth';
import { useRouter } from 'next/navigation';
import LoginTemplate from './loginTemplate';
import { NextAuthLoginResponse } from '@/types/axios';

export const CredentialsForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await login(email, password);

    if (res && (res as NextAuthLoginResponse).error) {
      setError(res.error || 'Invalid credentials');
      setSubmitting(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <LoginTemplate
        email={email}
        password={password}
        error={error}
        submitting={submitting}
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </>
  );
};
