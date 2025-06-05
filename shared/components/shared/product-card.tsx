import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  categoryId?: number;
}

const getIngredients = (name: string, categoryId?: number): string => {
  // Пиццы
  if (categoryId === 1) {
    switch (name) {
      case 'Пицца Пепперони':
        return 'Пепперони, моцарелла, томатный соус, чеснок';
      case 'Пицца Грибная':
        return 'Шампиньоны, моцарелла, сырный соус, чеснок';
      case 'Пицца Халапеньё':
        return 'Халапеньё, моцарелла, томаты, жгучий перец, чеснок';
      case 'Пицца 4 сезона':
        return 'Моцарелла, томаты, красный лук, солёные огурчики, сыр Пармезан';
      default:
        return 'Моцарелла, томатный соус';
    }
  }
  
  // Завтрак
  if (categoryId === 2) {
    switch (name) {
      case 'Омлет с ветчиной и грибами':
        return 'Яйца, ветчина, шампиньоны, моцарелла';
      case 'Омлет с пепперони':
        return 'Яйца, пепперони, моцарелла, томаты';
      case 'Дэнвич ветчина и сыр':
        return 'Ветчина, сыр чеддер, томаты, солёные огурчики';
      default:
        return 'Свежие ингредиенты';
    }
  }

  // Закуски
  if (categoryId === 3) {
    switch (name) {
      case 'Додстер':
        return 'Куриное филе, томаты, моцарелла, чеснок';
      case 'Острый бургер 🌶️🌶️':
        return 'Куриное филе, халапеньё, жгучий перец, чеснок';
      case 'Картофель из печи с соусом 🌱':
        return 'Картофель, чеснок, сырный соус';
      case 'Куриные наггетсы':
        return 'Куриное филе, панировка, чеснок';
      default:
        return 'Свежие ингредиенты';
    }
  }

  // Коктейли
  if (categoryId === 4) {
    switch (name) {
      case 'Банановый молочный коктейль':
        return 'Молоко, банан, ваниль';
      case 'Карамельное яблоко молочный коктейль':
        return 'Молоко, яблоко, карамельный сироп';
      case 'Молочный коктейль с печеньем Орео':
        return 'Молоко, печенье Орео, шоколадный сироп';
      case 'Классический молочный коктейль 👶':
        return 'Молоко, ваниль, сливки';
      default:
        return 'Свежие ингредиенты';
    }
  }

  // Кофе
  if (categoryId === 5) {
    switch (name) {
      case 'Кофе Латте':
        return 'Эспрессо, молоко, ваниль';
      case 'Кофе Американо':
        return 'Эспрессо, вода';
      case 'Кофе Кокосовый латте':
        return 'Эспрессо, кокосовое молоко, ваниль';
      case 'Кофе Карамельный капучино':
        return 'Эспрессо, молоко, карамельный сироп';
      case 'Ирландский Капучино':
        return 'Эспрессо, молоко, ирландский сироп';
      default:
        return 'Свежесваренный кофе';
    }
  }

  return 'Свежие ингредиенты';
};

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  categoryId,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/product/${id}`);
  };

  return (
    <div className={cn('group transition-transform duration-300 hover:scale-105', className)}>
      <div onClick={handleClick} className="cursor-pointer">
        <div className="flex justify-center p-4 sm:p-5 lg:p-6 bg-secondary rounded-lg h-[200px] sm:h-[220px] lg:h-[260px]">
          <img className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] lg:w-[215px] lg:h-[215px] rounded-full" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-2 sm:mt-3 font-bold text-base sm:text-lg" />

        <p className='text-xs sm:text-sm text-gray-400 line-clamp-2'>
          {getIngredients(name, categoryId)}
        </p>

        <div className='flex items-center justify-between mt-3 sm:mt-4'>
          <span className='text-base sm:text-lg lg:text-[20px]'>
            от <b>{price} BYN</b>
          </span>

          <Button variant='secondary' className='variant-base font-bold text-sm sm:text-base'>
            <Plus size={16} className='mr-1 sm:mr-1 lg:mr-1'/>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};
