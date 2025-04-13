import { prisma } from "@/prisma/prisma-client";

export const getProduct = async (id: number) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });
  return product;
};

export const getCategory = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: { id: Number(id) },
    include: {
      products: {
        include: {
          items: true,
        },
      },
    },
  });
  return category;
};