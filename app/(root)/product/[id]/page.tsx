import { Container, ProductForm } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { getCategory, getProduct } from "@/shared/lib/product-utils";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const product = await prisma.product.findFirst({
        where: { id: Number(id) }, 
        include: {
            ingredients: true,
            items: true,
        },  
    });

    const categoryData = await getCategory(Number(id));
    const productData = await getProduct(Number(id));
    
    
    if(!product) {
        return notFound();
    }

    return (
    <Container className='flex flex-col my-10' >
        <ProductForm product={product}/>
    </Container>
    )
}

