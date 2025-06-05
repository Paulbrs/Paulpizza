'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Button } from '../ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/shared/context/auth-context';

interface Props {
    open: boolean;
    onClose: () => void;
}

const loginSchema = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

const registerSchema = z.object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { login, register } = useAuth();

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        reset: resetLogin
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
        reset: resetRegister
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onLogin = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);
            resetLogin();
            onClose();
        } catch (err) {
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const onRegister = async (data: RegisterFormData) => {
        try {
            setIsLoading(true);
            await register(data.email, data.password, data.name);
            resetRegister();
            onClose();
        } catch (err) {
            console.error('Register error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        resetLogin();
        resetRegister();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white border shadow-lg">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                        {isRegister ? 'Регистрация' : 'Вход в аккаунт'}
                    </h2>
                </div>

                {isRegister ? (
                    <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Имя
                            </label>
                            <input
                                {...registerRegister('name')}
                                type="text"
                                id="name"
                                className={cn(
                                    "w-full px-3 py-2 border rounded-md bg-white",
                                    registerErrors.name ? "border-red-500" : "border-gray-300"
                                )}
                                placeholder="Введите ваше имя"
                            />
                            {registerErrors.name && (
                                <p className="mt-1 text-sm text-red-500">{registerErrors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="register-email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                {...registerRegister('email')}
                                type="email"
                                id="register-email"
                                className={cn(
                                    "w-full px-3 py-2 border rounded-md bg-white",
                                    registerErrors.email ? "border-red-500" : "border-gray-300"
                                )}
                                placeholder="Введите ваш email"
                            />
                            {registerErrors.email && (
                                <p className="mt-1 text-sm text-red-500">{registerErrors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="register-password" className="block text-sm font-medium mb-1">
                                Пароль
                            </label>
                            <input
                                {...registerRegister('password')}
                                type="password"
                                id="register-password"
                                className={cn(
                                    "w-full px-3 py-2 border rounded-md bg-white",
                                    registerErrors.password ? "border-red-500" : "border-gray-300"
                                )}
                                placeholder="Введите ваш пароль"
                            />
                            {registerErrors.password && (
                                <p className="mt-1 text-sm text-red-500">{registerErrors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>

                        <div className="text-center text-sm text-gray-500">
                            Уже есть аккаунт?{' '}
                            <button
                                type="button"
                                className="text-primary hover:underline"
                                onClick={toggleMode}
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                {...registerLogin('email')}
                                type="email"
                                id="login-email"
                                className={cn(
                                    "w-full px-3 py-2 border rounded-md bg-white",
                                    loginErrors.email ? "border-red-500" : "border-gray-300"
                                )}
                                placeholder="Введите ваш email"
                            />
                            {loginErrors.email && (
                                <p className="mt-1 text-sm text-red-500">{loginErrors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="login-password" className="block text-sm font-medium mb-1">
                                Пароль
                            </label>
                            <input
                                {...registerLogin('password')}
                                type="password"
                                id="login-password"
                                className={cn(
                                    "w-full px-3 py-2 border rounded-md bg-white",
                                    loginErrors.password ? "border-red-500" : "border-gray-300"
                                )}
                                placeholder="Введите ваш пароль"
                            />
                            {loginErrors.password && (
                                <p className="mt-1 text-sm text-red-500">{loginErrors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Вход...' : 'Войти'}
                        </Button>

                        <div className="text-center text-sm text-gray-500">
                            Нет аккаунта?{' '}
                            <button
                                type="button"
                                className="text-primary hover:underline"
                                onClick={toggleMode}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}; 