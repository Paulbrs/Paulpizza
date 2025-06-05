'use client';

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFiltersStore } from '@/shared/store/filters';

interface Props  {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {
    selectedIngredients,
    priceRange,
    isNew,
    isCustomizable,
    setSelectedIngredients,
    setPriceRange,
    setIsNew,
    setIsCustomizable,
  } = useFiltersStore();

  const handleIngredientChange = (checked: boolean, value: string) => {
    setSelectedIngredients(
      checked 
        ? [...selectedIngredients, value]
        : selectedIngredients.filter(v => v !== value)
    );
  };

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-3 sm:mb-4 lg:mb-5 font-bold text-base sm:text-lg' />
      
      {/* Верхние чекбоксы */}
      <div className='flex flex-col gap-3 sm:gap-4'>
        <FilterCheckbox 
          text='Блюда недели' 
          value='customizable'
          checked={isCustomizable}
          onCheckedChange={(checked) => setIsCustomizable(checked)}
        />
        <FilterCheckbox 
          text='Новинки' 
          value='new'
          checked={isNew}
          onCheckedChange={(checked) => setIsNew(checked)}
        />
      </div>

      {/* Фильтр цен */}
      <div className='mt-6 sm:mt-7 lg:mt-8'>
        <Title text='Цена от и до:' size='sm' className='mb-2 sm:mb-3 font-bold text-base sm:text-lg' />
        <div className='flex gap-2 sm:gap-3 mb-4 sm:mb-5'>
          <Input 
            type='number' 
            placeholder='0' 
            min={0} 
            max={50} 
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="text-sm sm:text-base"
          />
          <Input 
            type='number' 
            placeholder='50' 
            min={0} 
            max={50}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="text-sm sm:text-base"
          />
        </div>

        <RangeSlider 
          min={0} 
          max={50} 
          step={1} 
          value={priceRange}
          onValueChange={(values) => setPriceRange([values[0], values[1]])}
        />
      </div>

      <div className='mt-6 sm:mt-7 lg:mt-8'>
        <CheckboxFiltersGroup 
          title='Ингредиенты' 
          limit={6} 
          items={[
            {
              text: 'Сырный соус',
              value: '1',
            },
            {
              text: 'Моццарелла',
              value: '2',
            },
            {
              text: 'Чеснок',
              value: '3',
            },
            {
              text: 'Солёные огурчики',
              value: '4',
            },
            {
              text: 'Красный лук',
              value: '5',
            },
            {
              text: 'Халапеньё',
              value: '6',
            },
            {
              text: 'Томаты',
              value: '7',
            },
            {
              text: 'Жгучий перец',
              value: '8',
            },
            {
              text: 'Лимон',
              value: '9',
            },
            {
              text: 'Сыр Пармезан',
              value: '10',
            },
          ]}
          onCheckedChange={handleIngredientChange}
          defaultValue={selectedIngredients}
        />
      </div>
    </div>
  );
};