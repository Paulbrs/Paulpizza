import { z } from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, { message: 'Имя должно быть длиной не менее 2 символов.' }).max(30, { message: 'Имя должно быть длиной не более 30 символов.' }),
    lastName: z.string().min(2, { message: 'Фамилия должна быть длиной не менее 2 символов.' }).max(30, { message: 'Фамилия должна быть длиной не более 30 символов' }),
    email: z.string().email({ message: 'Неверный адрес электронной почты' }).min(2, { message: 'Адрес электронной почты должен быть длиной не менее 2 символов' }).max(30, { message: 'Адрес электронной почты должен быть длиной не более 30 символов' }),
    phone: z.string().regex(/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, { message: 'Неправильный формат телефонного номера' }),
    address: z.string().min(4, { message: 'Address must be at least 4 characters long' }).max(100, { message: 'Address must be at most 100 characters long' }),
    comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;