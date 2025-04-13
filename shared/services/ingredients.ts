import { Ingredient } from "@prisma/client"
import { AxiosInstance } from "./instance"
import { ApiRoutes } from './constants' 

export const getAll = async (): Promise<Ingredient[]> => {
    return (await AxiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}