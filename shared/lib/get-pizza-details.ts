import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaType, PizzaSize, mapPizzaType } from '../constants/pizza';

/**
 * Функция для подсчета общей стомости пиццы и описание типа теста пиццы
 * 
 * ```@example 
 * calcTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)
 * ```
 * 
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * 
 * @returns number string   
 */

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
    const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;

    return { totalPrice, textDetaills };
};