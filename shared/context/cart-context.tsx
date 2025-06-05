'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-context';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    total: number;
    addItem: (item: CartItem) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const { user } = useAuth();

    // Загрузка корзины при монтировании или изменении пользователя
    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cart_${user.email}`);
            if (savedCart) {
                const { items: savedItems, total: savedTotal } = JSON.parse(savedCart);
                setItems(savedItems);
                setTotal(savedTotal);
            } else {
                setItems([]);
                setTotal(0);
            }
        } else {
            setItems([]);
            setTotal(0);
        }
    }, [user]);

    // Сохранение корзины при изменении
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify({ items, total }));
        }
    }, [items, total, user]);

    const addItem = (item: CartItem) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            let newItems;
            
            if (existingItem) {
                newItems = prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                newItems = [...prevItems, { ...item, quantity: 1 }];
            }

            const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setTotal(newTotal);
            return newItems;
        });
    };

    const clearCart = () => {
        setItems([]);
        setTotal(0);
        if (user) {
            localStorage.removeItem(`cart_${user.email}`);
        }
    };

    return (
        <CartContext.Provider value={{ items, total, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 