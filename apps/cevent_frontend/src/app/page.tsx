'use client';

import Layout from '@/components/Layout';
import { EventCategory } from '@/utils/interfaces/Categories';
import CategoryEventSection from '@/components/EventSection/CategoryEventSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ALL_CATEGORY_VALUE } from '@/utils/constans';
import { useEffect } from 'react';

export default function Home() {
  const categories: EventCategory[] = useSelector(
    (state: RootState) => state.category,
  );

  useEffect(() => {
    if (categories.length === 0) {
      console.log('No categories');
    } else {
      console.log('Categories loaded');
      categories.forEach((category) => {
        console.log(category);
      });
    }
  }, [categories]);

  return (
    <Layout>
      <CategoryEventSection category={ALL_CATEGORY_VALUE} />
      {categories.map((category) => {
        if (category.keyWord === ALL_CATEGORY_VALUE.keyWord) return null;
        return (
          <CategoryEventSection
            key={category.keyWord}
            category={category as EventCategory}
          />
        );
      })}
    </Layout>
  );
}
