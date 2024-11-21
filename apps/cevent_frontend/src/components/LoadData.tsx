'use client';

import { AppDispatch } from '@/redux/store';
import { fetchCategories } from '@/services/CategoryService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const LoadData = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return <></>;
};
export default LoadData;
