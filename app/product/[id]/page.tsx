'use client'

import { ProductModal } from '@/shared/components/shared/product-modal';
import { useParams } from 'next/navigation';

const getProductData = (id: number) => {
    const products = {
        1: {
            id: 1,
            name: 'Пицца Пепперони',
            price: 30,
            imageUrl: '/pizza1.png',
            categoryId: 1
        },
        2: {
            id: 2,
            name: 'Пицца Грибная',
            price: 32,
            imageUrl: '/pizza2.png',
            categoryId: 1
        },
        3: {
            id: 3,
            name: 'Пицца Халапеньё',
            price: 35,
            imageUrl: '/pizza3.png',
            categoryId: 1
        },
        4: {
            id: 4,
            name: 'Пицца 4 сезона',
            price: 29,
            imageUrl: '/pizza4.png',
            categoryId: 1
        },
        5: {
            id: 5,
            name: 'Омлет с ветчиной и грибами',
            price: 7,
            imageUrl: '/zavtrak1.png',
            categoryId: 2
        },
        6: {
            id: 6,
            name: 'Омлет с пепперони',
            price: 8,
            imageUrl: '/zavtrak2.png',
            categoryId: 2
        },
        7: {
            id: 7,
            name: 'Дэнвич ветчина и сыр',
            price: 7,
            imageUrl: '/zavtrak3.png',
            categoryId: 2
        },
        8: {
            id: 8,
            name: 'Додстер',
            price: 9,
            imageUrl: '/dodster.png',
            categoryId: 3
        },
        9: {
            id: 9,
            name: 'Острый Бургер 🌶️🌶️',
            price: 10,
            imageUrl: '/hot-burger.png',
            categoryId: 3
        },
        10: {
            id: 10,
            name: 'Картофель из печи с соусом 🌱',
            price: 5,
            imageUrl: '/potato.png',
            categoryId: 3
        },
        11: {
            id: 11,
            name: 'Куриные наггетсы',
            price: 8,
            imageUrl: '/chikens fingers.png',
            categoryId: 3
        },
        12: {
            id: 12,
            name: 'Банановый молочный коктейль',
            price: 8,
            imageUrl: '/banana.png',
            categoryId: 4
        },
        13: {
            id: 13,
            name: 'Карамельное яблоко молочный коктейль',
            price: 6,
            imageUrl: '/caramel.png',
            categoryId: 4
        },
        14: {
            id: 14,
            name: 'Молочный коктейль с печеньем Орео',
            price: 10,
            imageUrl: '/oreo.png',
            categoryId: 4
        },
        15: {
            id: 15,
            name: 'Классический молочный коктейль 👶',
            price: 7,
            imageUrl: '/moloko.png',
            categoryId: 4
        },
        16: {
            id: 16,
            name: 'Кофе Латте',
            price: 5,
            imageUrl: '/coffe.png',
            categoryId: 5
        },
        17: {
            id: 17,
            name: 'Кофе Американо',
            price: 6,
            imageUrl: '/coffee2.png',
            categoryId: 5
        },
        18: {
            id: 18,
            name: 'Кофе Кокосовый латте',
            price: 9,
            imageUrl: '/coffee0.png',
            categoryId: 5
        },
        19: {
            id: 19,
            name: 'Кофе Карамельный капучино',
            price: 8,
            imageUrl: '/coffee-caramel.png',
            categoryId: 5
        },
        20: {
            id: 20,
            name: 'Ирландский Капучино',
            price: 11,
            imageUrl: '/irish-coffee.png',
            categoryId: 5
        }
    };

    return products[id as keyof typeof products] || null;
};

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = getProductData(productId);

  if (!product) {
    return null;
  }

  return <ProductModal product={product} />;
} 