import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
              token,
          },
        ],
      },
      include: {
          items: {
              orderBy: {
                createAt: 'desc',
              },
              include: {
                productItem: {
                  include: {
                    product: true,
                  },
                },
                ingredients: true,
              },
          },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину'}, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
      let token = req.cookies.get('cartToken')?.value;

    if(!token) {
      token = crypto.randomUUID();
    }
    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;
    
    const findCartItems = await prisma.cartItem.findMany({ 
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      }, 
      include: {
        ingredients: true, // Загружаем ингредиенты для сравнения
      }
    });
    
    let existingCartItem: (typeof findCartItems)[number] | null = null;
    
    for (const cartItem of findCartItems) {
      const cartItemIngredientIds = cartItem.ingredients.map((ing) => ing.id).sort();
      const newIngredientIds = (data.ingredients || []).sort();
    
      if (JSON.stringify(cartItemIngredientIds) === JSON.stringify(newIngredientIds)) {
        existingCartItem = cartItem;
        break; // Если нашли совпадение, выходим из цикла
      }
    }
    
    if (existingCartItem) {
      // Если товар с этими ингредиентами найден, увеличиваем количество
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
    } else {
      // Если такого сочетания нет, создаем новый товар в корзине
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })) || [],
          },
        }
      });
    }    

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token, {
      maxAge: 60 * 60 * 24 * 7, 
    });
    return resp;
  } catch (error) {
    console.log(error);
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину'}, { status: 500 });
  }
}