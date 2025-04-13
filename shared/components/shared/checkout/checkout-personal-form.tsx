import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title='2. Персональная информация' className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name='firstName' className='text-base'  placeholder='Имя'     />
        <FormInput name='lastName'  className='text-base'  placeholder='Фамилия' />
        <FormInput name='email'     className='text-base'  placeholder="example@mail.ru"  />
        <FormInput name='phone'     className='text-base'  placeholder='+375 (__) ___-__-__' />
      </div>  
    </WhiteBlock>
  );
};