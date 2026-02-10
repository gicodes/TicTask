'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginTemplate from '../_level_1/loginTemplate';

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  
  const [submitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

    try {
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || 'Login failed');

      localStorage.setItem('token', data.token);

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
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
        remember={rememberMe}
        setRemember={setRememberMe}
      />
    </>
  );
};
