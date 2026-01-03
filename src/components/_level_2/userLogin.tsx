'use client';

import { useAuth } from '@/providers/auth';
import { useEffect, useState } from 'react';
import LoginTemplate from '../_level_1/loginTemplate';
import { useRouter, useSearchParams } from 'next/navigation';

export const CredentialsForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/dashboard";

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('rememberedEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      localStorage.removeItem('rememberedEmail');
    }
  }, []);

  useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem('rememberedEmail');
    }
  }, [rememberMe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await login({ email, password, returnUrl });

    if (res && !res.ok) {
      setError(res.error || 'Invalid credentials');
      setSubmitting(false);
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else localStorage.removeItem('rememberedEmail');

    router.push(returnUrl);
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
        remember={rememberMe}
        setRemember={setRememberMe}
      />
    </>
  );
};
