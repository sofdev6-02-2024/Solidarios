'use client';

import Layout from '@/components/Layout';
import { EventCategory } from '@/utils/interfaces/Categories';
import CategoryEventSection from '@/components/EventSection/CategoryEventSection';
import { CategoryObj } from '@/utils/interfaces/Categories';

export default function Home() {
  return (
    <Layout>
      <CategoryEventSection category={EventCategory.All} />
      {Object.keys(CategoryObj).map((category) => {
        if (category === EventCategory.All) return null;
        return (
          <CategoryEventSection
            key={category}
            category={category as EventCategory}
          />
        );
      })}
    </Layout>
  );
}
