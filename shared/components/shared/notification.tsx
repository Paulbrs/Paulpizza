'use client'

import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    className?: string;
}

export const Notification: React.FC<Props> = ({ message, isVisible, onClose, className }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                'fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300',
                isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
                className
            )}
        >
            <Check size={20} />
            <span>{message}</span>
        </div>
    );
}; 