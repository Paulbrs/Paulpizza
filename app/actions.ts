'use server';

import second from 'resend';
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components';
import { PrismaClientRustPanicError } from '@prisma/client/runtime/library';

export async function createOrder(data: CheckoutFormValues) {
    try {
      const cookieStore = cookies();
      const cartToken = (await cookieStore).get('cartToken')?.value;

      if(!cartToken) {
        throw new Error('Cart token not found')
      }

      // Находим корзину по токену
      const userCart = await prisma.cart.findFirst({
        include: {
          user: true,
          items: {
            include: {
              ingredients: true,
              productItem: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
        where: {
          token: cartToken,
        },
      });

      // Если корзина не найдена - ошибка
      if(!userCart) {
        throw new Error('Cart is empty');
      }

      // Если корзина пустая - ошибка
      if(userCart?.totalAmount === 0) {
        throw new Error('Cart is empty');
      }

      // Создаём заказ
      const order = await prisma.order.create({
        data: {
          token: cartToken,
          fullName: data.firstName + ' ' + data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          comment: data.comment,
          totalAmount: userCart.totalAmount,
          status: OrderStatus.PENDING,
          items: JSON.stringify(userCart.items),
        },
      });

      // Очищаем totalAmount корзины
      await prisma.cart.update({
        where: {
          id: userCart.id,
        },
        data: {
          totalAmount: 0,
        },
      });

      await prisma.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      //  создание ссылки оплаты
      const paymentData = await createPayment({
        amount: order.totalAmount,
        description: 'Оплата заказа #' + order.id,
        orderId: order.id,
      });

      if(!paymentData) {
        throw new Error('Payment data not found');
      }

      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentId: paymentData.id,
        }
      })

      // Перенаправление 
      const paymentUrl = paymentData.confirmation.confirmation_url;


      // Отправляем письмо
      await sendEmail(
        data.email, 'Paul Pizza / Оплатите заказ #' + order.id, 
        PayOrderTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          paymentUrl,
        }),
      );

      return paymentUrl;
    } catch (err) {
      console.log('{CreateOrder} Server error', err);
    }
}