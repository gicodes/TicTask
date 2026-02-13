'use client';

import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader'
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import Organizations from '../_level_3/organizations';

const Page = () => {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Organizations'} 
        description={'Manage Standard, Pro and Enterprise-level teams as organizations'} 
      />
      <Organizations />
    </GenericGridPageLayout>
  )
}

export default Page;