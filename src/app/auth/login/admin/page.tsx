import React from 'react';
import { Login } from '@/components/_level_3/login';

export default async function Page() {
  return (
    <div>
      <Login
        role={"ADMIN"}
      />
    </div>
  )
}