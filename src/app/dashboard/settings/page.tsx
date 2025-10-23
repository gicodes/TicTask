import React from 'react'
import type { Metadata } from 'next/types';
import SettingsPage from '../_level_3/settings';

export const metadata: Metadata = {
  title: "TicTask",
  description: "Configure your appearance, account, device, workspace and security settings",
};

const Page = () => {
  return (
    <SettingsPage />
  )
}

export default Page;