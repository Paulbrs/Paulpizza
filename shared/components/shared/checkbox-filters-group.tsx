'use client';

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui';
import { Title } from './title';
import { ChevronDown } from 'lucide-react';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onCheckedChange?: (checked: boolean, value: string) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  onCheckedChange,
  limit = 6,
  searchInputPlaceholder = 'Поиск...',
  defaultValue = [],
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
  const [showAll, setShowAll] = useState(false);

  const handleCheckboxChange = (checked: boolean, value: string) => {
    setSelectedValues(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(v => v !== value)
    );
    onCheckedChange?.(checked, value);
  };

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, limit);
  const hasMoreItems = filteredItems.length > limit;

  return (
    <div className={className}>
      <Title text={title} size='sm' className='mb-3 font-bold' />

      <div className='mb-5'>
        <Input
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {displayedItems.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedValues.includes(item.value)}
            onCheckedChange={(checked) => handleCheckboxChange(checked, item.value)}
          />
        ))}
      </div>

      {hasMoreItems && (
        <button
          onClick={() => setShowAll(!showAll)}
          className='flex items-center gap-1 mt-4 text-primary hover:text-primary/80 transition-colors'
        >
          {showAll ? 'Скрыть' : 'Показать всё'}
          <ChevronDown
            size={16}
            className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};
