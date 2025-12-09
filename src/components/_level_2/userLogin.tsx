'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/auth';
import LoginTemplate from '../_level_1/loginTemplate';
import { NextAuthLoginResponse } from '@/types/axios';
import { useRouter, useSearchParams } from 'next/navigation';

export const CredentialsForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await login({email, password, returnUrl});

    if (res && (res as NextAuthLoginResponse).error) {
      setError(res.error || 'Invalid credentials');
      setSubmitting(false);
    } else {
      router.push(returnUrl ?? '/dashboard');
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
