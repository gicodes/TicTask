'use client';

import { Card } from '@mui/material';
import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader';
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import PartnersList from '../_level_3/partners';

export default function PartnersPage() {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader
        title="Partners"
        description="Partner records, inbound messages and pending outbound messages from partners"
      />
      <Card elevation={2} sx={{ p: 2}}>
        <PartnersList />
      </Card>
    </GenericGridPageLayout>
  );
}