'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface UserData {
    email: string;
    password: string;
    name?: string;
}

interface DisplayUser {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: DisplayUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<DisplayUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Загрузка данных из localStorage при монтировании
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const register = async (email: string, password: string, name?: string) => {
        try {
            // Получаем список зарегистрированных пользователей
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Проверяем, не зарегистрирован ли уже пользователь с таким email
            if (users.some((u: UserData) => u.email === email)) {
                throw new Error('Пользователь с таким email уже зарегистрирован');
            }

            // Создаем нового пользователя
            const newUser: UserData = { email, password, name };
            
            // Добавляем в список пользователей
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Автоматически входим в систему
            const displayUser: DisplayUser = { email, name };
            localStorage.setItem('user', JSON.stringify(displayUser));
            setUser(displayUser);
            setIsAuthenticated(true);
            
            toast.success('Регистрация успешна! Вы вошли в систему.');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Ошибка при регистрации');
            }
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            // Получаем список зарегистрированных пользователей
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Ищем пользователя
            const foundUser = users.find((u: UserData) => u.email === email && u.password === password);
            
            if (!foundUser) {
                throw new Error('Неверный email или пароль');
            }

            // Сохраняем данные пользователя (без пароля)
            const displayUser: DisplayUser = { email: foundUser.email, name: foundUser.name };
            localStorage.setItem('user', JSON.stringify(displayUser));
            
            // Обновляем состояние
            setUser(displayUser);
            setIsAuthenticated(true);
            
            toast.success('Вы успешно вошли в систему!');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Ошибка при входе');
            }
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Вы успешно вышли из системы');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 