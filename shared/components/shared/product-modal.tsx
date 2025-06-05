'use client'

import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Notification } from './notification';
import { useCart } from '@/shared/context/cart-context';

interface Props {
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
        categoryId?: number;
    };
    className?: string;
}

const getProductDescription = (name: string, categoryId?: number): { description: string; ingredients: string } => {
    // Пиццы
    if (categoryId === 1) {
        switch (name) {
            case 'Пицца Пепперони':
                return {
                    description: 'Классическая пицца с пепперони и моцареллой. Острый вкус и аромат итальянской кухни.',
                    ingredients: 'Пепперони, моцарелла, томатный соус, чеснок'
                };
            case 'Пицца Грибная':
                return {
                    description: 'Нежная пицца с шампиньонами и сырным соусом. Идеальный выбор для любителей грибов.',
                    ingredients: 'Шампиньоны, моцарелла, сырный соус, чеснок'
                };
            case 'Пицца Халапеньё':
                return {
                    description: 'Острая пицца с халапеньё и жгучим перцем. Для тех, кто любит поострее!',
                    ingredients: 'Халапеньё, моцарелла, томаты, жгучий перец, чеснок'
                };
            case 'Пицца 4 сезона':
                return {
                    description: 'Пицца, объединяющая вкусы всех сезонов. Разнообразие ингредиентов в каждом кусочке.',
                    ingredients: 'Моцарелла, томаты, красный лук, солёные огурчики, сыр Пармезан'
                };
            default:
                return {
                    description: 'Классическая пицца с моцареллой и томатным соусом.',
                    ingredients: 'Моцарелла, томатный соус'
                };
        }
    }
    
    // Завтрак
    if (categoryId === 2) {
        switch (name) {
            case 'Омлет с ветчиной и грибами':
                return {
                    description: 'Сытный омлет с ветчиной и шампиньонами. Идеальное начало дня.',
                    ingredients: 'Яйца, ветчина, шампиньоны, моцарелла'
                };
            case 'Омлет с пепперони':
                return {
                    description: 'Острый омлет с пепперони и томатами. Для любителей пикантного завтрака.',
                    ingredients: 'Яйца, пепперони, моцарелла, томаты'
                };
            case 'Дэнвич ветчина и сыр':
                return {
                    description: 'Классический сэндвич с ветчиной и сыром. Быстрый и вкусный завтрак.',
                    ingredients: 'Ветчина, сыр чеддер, томаты, солёные огурчики'
                };
            default:
                return {
                    description: 'Свежий и вкусный завтрак.',
                    ingredients: 'Свежие ингредиенты'
                };
        }
    }

    // Закуски
    if (categoryId === 3) {
        switch (name) {
            case 'Додстер':
                return {
                    description: 'Сочный додстер с куриным филе и овощами. Идеальная закуска.',
                    ingredients: 'Куриное филе, томаты, моцарелла, чеснок'
                };
            case 'Острый Бургер 🌶️🌶️':
                return {
                    description: 'Острый бургер с халапеньё и жгучим перцем. Для любителей острого!',
                    ingredients: 'Куриное филе, халапеньё, жгучий перец, чеснок'
                };
            case 'Картофель из печи с соусом 🌱':
                return {
                    description: 'Хрустящий картофель из печи с ароматным чесночным соусом.',
                    ingredients: 'Картофель, чеснок, сырный соус'
                };
            case 'Куриные наггетсы':
                return {
                    description: 'Хрустящие куриные наггетсы с чесночным соусом.',
                    ingredients: 'Куриное филе, панировка, чеснок'
                };
            default:
                return {
                    description: 'Вкусная закуска из свежих ингредиентов.',
                    ingredients: 'Свежие ингредиенты'
                };
        }
    }

    // Коктейли
    if (categoryId === 4) {
        switch (name) {
            case 'Банановый молочный коктейль':
                return {
                    description: 'Нежный молочный коктейль с бананом и ванилью.',
                    ingredients: 'Молоко, банан, ваниль'
                };
            case 'Карамельное яблоко молочный коктейль':
                return {
                    description: 'Сладкий коктейль с яблоком и карамельным сиропом.',
                    ingredients: 'Молоко, яблоко, карамельный сироп'
                };
            case 'Молочный коктейль с печеньем Орео':
                return {
                    description: 'Классический коктейль с печеньем Орео и шоколадным сиропом.',
                    ingredients: 'Молоко, печенье Орео, шоколадный сироп'
                };
            case 'Классический молочный коктейль 👶':
                return {
                    description: 'Нежный классический молочный коктейль со сливками.',
                    ingredients: 'Молоко, ваниль, сливки'
                };
            default:
                return {
                    description: 'Освежающий молочный коктейль.',
                    ingredients: 'Свежие ингредиенты'
                };
        }
    }

    // Кофе
    if (categoryId === 5) {
        switch (name) {
            case 'Кофе Латте':
                return {
                    description: 'Нежный латте с молоком и ванилью.',
                    ingredients: 'Эспрессо, молоко, ваниль'
                };
            case 'Кофе Американо':
                return {
                    description: 'Классический американо с насыщенным вкусом.',
                    ingredients: 'Эспрессо, вода'
                };
            case 'Кофе Кокосовый латте':
                return {
                    description: 'Экзотический латте с кокосовым молоком.',
                    ingredients: 'Эспрессо, кокосовое молоко, ваниль'
                };
            case 'Кофе Карамельный капучино':
                return {
                    description: 'Сладкий капучино с карамельным сиропом.',
                    ingredients: 'Эспрессо, молоко, карамельный сироп'
                };
            case 'Ирландский Капучино':
                return {
                    description: 'Ароматный капучино с ирландским сиропом.',
                    ingredients: 'Эспрессо, молоко, ирландский сироп'
                };
            default:
                return {
                    description: 'Свежесваренный кофе.',
                    ingredients: 'Свежесваренный кофе'
                };
        }
    }

    return {
        description: 'Вкусное блюдо из свежих ингредиентов.',
        ingredients: 'Свежие ингредиенты'
    };
};

export const ProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const { addItem } = useCart();
  const { description, ingredients } = getProductDescription(product.name, product.categoryId);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl
    });
    setIsNotificationVisible(true);
  };

  return (
    <>
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
          <DialogContent  
              className={cn(
                'p-0 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl min-h-[500px] max-h-[500vh] bg-white overflow-hidden', 
                className,
              )}>
              <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-secondary">
                      <div className="flex justify-center items-center h-full">
                          <Image 
                              src={product.imageUrl} 
                              alt={product.name} 
                              width={300}
                              height={300}
                              className="w-[300px] h-[300px] object-contain"
                          />
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2 p-6 lg:p-8">
                      <div className="flex justify-between items-start mb-6">
                          <h2 className="text-2xl font-bold">{product.name}</h2>
                      </div>
                      <div className="space-y-6">
                          <div>
                              <h3 className="text-lg font-semibold mb-2">Описание</h3>
                              <p className="text-gray-600">
                                  {description}
                              </p>
                          </div>
                          <div>
                              <h3 className="text-lg font-semibold mb-2">Ингредиенты</h3>
                              <p className="text-gray-600">
                                  {ingredients}
                              </p>
                          </div>
                          <div className="flex items-center justify-between pt-6 border-t">
                              <div className="text-2xl font-bold">
                                  {product.price} BYN
                              </div>
                              <Button 
                                  className="flex items-center gap-2"
                                  onClick={handleAddToCart}
                              >
                                  <Plus size={20} />
                                  Добавить в корзину
                              </Button>
                          </div>
                      </div>
                  </div>
              </div>
          </DialogContent>
      </Dialog>
      <Notification
          message="Ваш товар добавлен в корзину"
          isVisible={isNotificationVisible}
          onClose={() => setIsNotificationVisible(false)}
      />
    </>
  );
}; 