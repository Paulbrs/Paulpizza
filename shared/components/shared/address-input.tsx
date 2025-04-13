'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void
}
export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions 
      token="32ff6cb49e95299cb6e79637de46ddd7864d9e35" 
      onChange={(data) => onChange?.(data?.value)}
    /> 
  );
};