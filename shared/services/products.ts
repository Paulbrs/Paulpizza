import { Product } from "@prisma/client"
import { AxiosInstance } from "./instance"
import { ApiRoutes } from './constants' 

export const search = async (query: string): Promise<Product[]> => {
    return (await AxiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data;
}