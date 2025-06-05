'use client';

import {cn} from '@/shared/lib/utils'
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { Button } from '../ui/button';
import { ArrowRight, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '@/shared/context/cart-context';
import { AuthModal } from './auth-modal';
import { useAuth } from '@/shared/context/auth-context';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const { total } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if(searchParams.has('paid')) {
        toastMessage = ('Заказ успешно оплачен! Информация отправлена на Вашу почту.');
    }

    if (searchParams.has('verified')) {
      toastMessage = "Почта успешна подтверждена!";
    }

    if(toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, [])  

  return (
    <header className={cn('border-b', className)}>
        <Container className='flex items-center justify-between py-8 px-[2px] sm:px-6 lg:px-8'>
            {/* Левая часть*/}
            <Link href='/' className='sm:mr-0'>
            <div className='flex items-center gap-4'>
                <Image src="/logo.png" alt="logo" width={35} height={35}/>
                <div>
                  <h1 className='text-2xl uppercase font-black'>Paul Pizza</h1>
                  <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                </div>  
            </div>
            </Link>

            {/* {hasSearch && <div className='mx-10 flex-1'>
              <SearchInput />
            </div>
            } */}

            {/* Правая часть*/}
            <div className='flex items-center gap-2 sm:gap-3'>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {user?.email}
                  </span>
                  <Button 
                    variant='outline' 
                    className='flex items-center gap-1'
                    onClick={logout}
                  >
                    <LogOut size={16}/>Выйти
                  </Button>
                </div>
              ) : (
                <Button 
                  variant='outline' 
                  className='flex items-center gap-1'
                  onClick={() => setOpenAuthModal(true)}
                >
                  <User size={16}/>Войти
                </Button>
              )}

              <div>
                <Button className='group relative'>
                  <b>{total} BYN</b>
                  <span className='h-full w-[1px] bg-white/30 mx-3' />
                  <div className='h-full items-center gap-1 transition duration-300 group-hover:opacity-0' />
                    <ShoppingCart size={16} className='relative' strokeWidth={2} />
                </Button>
              </div>
             {/* добавляем отображение пользователя */}
              {/* <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

              <ProfileButton 
                onClickSignIn={() => setOpenAuthModal(true)}
              />

              {hasCart && <CartButton />} */}
            </div>
        </Container>

        <AuthModal 
          open={openAuthModal} 
          onClose={() => setOpenAuthModal(false)} 
        />
    </header>
  );
};