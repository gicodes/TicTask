'use client'

import { TeamTicketProvider } from '@/providers/teamTickets';
import { useParams } from 'next/navigation';
import React, { ReactNode } from 'react'

const TeamWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { teamId } = useParams<{ teamId: string }>();

  return (
    <TeamTicketProvider teamId={Number(teamId)}>
      {children}
    </TeamTicketProvider>
  )
}

export default TeamWrapper;
