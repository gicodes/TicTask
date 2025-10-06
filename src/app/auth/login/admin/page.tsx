import React from 'react';
import { Login } from '@/components/pages/auth/Main';

export default async function Page() {
  return (
    <div>
      <Login
        role={"ADMIN"}
      />
    </div>
  )
}