'use client'

import {cn} from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import React from 'react';

interface Props {
    className?: string;
}

const cats = [
    { id: 1, name: 'Пиццы'    },
    { id: 2, name: 'Завтрак'    }, 
    { id: 3, name: 'Закуски'  },
    { id: 4, name: 'Коктейли' },
    { id: 6, name: 'Кофе'  },
];

export const Categories: React.FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId)
     return (
      <div className={cn('flex flex-wrap sm:flex-nowrap gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {
            cats.map(({name, id}, index) => (
                   <a className={cn(
                    'flex items-center font-bold h-11 rounded-2xl px-5',
                    categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                   )} 
                   href={`/#${name}`}
                   key={index}>
                    <button>{name}</button>
                </a>
            )) 
        }
      </div>
    );
};