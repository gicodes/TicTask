import React from 'react';
import { getServerSessionUser } from '@/lib/auth';
import { Login } from '@/components/pages/auth/login';

export default async function Page() {
  const user = await getServerSessionUser();
  const name = user?.name;

  return (
    <div>
      <Login
        name={name}
        role={"USER"}
      />
    </div>
  )
}