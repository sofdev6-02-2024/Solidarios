'use client';

import Layout from '@/components/Layout';
import { EventCategory } from '@/utils/interfaces/Categories';
import CategoryEventSection from '@/components/EventSection/CategoryEventSection';

export default function Home() {
  return (
    <Layout>
      <CategoryEventSection category={EventCategory.All} />
    </Layout>
  );
}
