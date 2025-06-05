import {cn} from '@/shared/lib/utils';
import React from 'react';
import { SortPopup } from './sort-popup';
import { Categories } from './categories';
import { Container } from './container';

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-3 sm:py-5 shadow-lg shadow-black/5 z-10' ,className)}>
      <Container className="flex items-center justify-between">
      <Categories />
      <div className="hidden lg:block">
        <SortPopup />
      </div>
    </Container>
    </div>
  );
};