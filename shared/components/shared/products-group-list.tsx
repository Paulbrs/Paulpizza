'use client';

import React from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { useCategoryStore } from '@/shared/store/category';
import { useFiltersStore } from '@/shared/store/filters';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const { selectedIngredients, priceRange, isNew, isCustomizable, newItems, weeklyItems } = useFiltersStore();
  
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  // Отладочная информация
  console.log('Price range:', priceRange);
  console.log('Items:', items.map(item => ({
    id: item.id,
    price: item.items?.[0]?.price,
    fullItem: item
  })));

  const filteredItems = items.filter(product => {
    // Фильтр по цене
    const price = product.items?.[0]?.price;
    console.log('Checking price:', price, 'for product:', product.id);
    
    if (typeof price !== 'number') {
      console.log('Price is not a number for product:', product.id);
      return true; // Пропускаем товары без цены
    }

    if (price < priceRange[0] || price > priceRange[1]) {
      console.log('Price out of range for product:', product.id);
      return false;
    }

    // Фильтр по новинкам
    if (isNew && !newItems.includes(product.name)) {
      return false;
    }

    // Фильтр по блюдам недели
    if (isCustomizable && !weeklyItems.includes(product.name)) {
      return false;
    }

    // Фильтр по ингредиентам
    if (selectedIngredients.length > 0) {
      const productIngredients = product.ingredients || [];
      // Проверяем, содержит ли продукт ВСЕ выбранные ингредиенты
      const hasAllSelectedIngredients = selectedIngredients.every(ingredientId =>
        productIngredients.includes(ingredientId)
      );
      if (!hasAllSelectedIngredients) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn(
        'grid gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[50px]',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        listClassName
      )}>
        {filteredItems.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            categoryId={categoryId}
          />
        ))}
      </div>
    </div>
  );
};
