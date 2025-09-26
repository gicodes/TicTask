'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AcceptInvitePage() {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    async function acceptInvite() {
      const res = await fetch('/api/invite/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setStatus('failed');
      }
    }

    if (token) acceptInvite();
  }, [token, router]);

  if (status === 'pending') return <p>Accepting invite...</p>;
  if (status === 'success') return <p>Welcome to the team! 🎉</p>;
  return <p>Invalid or expired invitation.</p>;
}
