import { Container, Filters, Title, TopBar, Footer} from "@/shared/components/shared"; 
import { ProductCard } from "@/shared/components/shared/product-card";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";

export default function Home() {
    return (
    <>
        <Container className='mt-5 sm:mt-8 lg:mt-10'>
            <Title text='Все пиццы' size='lg' className="font-extrabold text-xl sm:text-2xl lg:text-3xl"/>
        </Container>

        <TopBar />

        <Container className='mt-5 sm:mt-8 lg:mt-10 pb-8 sm:pb-10 lg:pb-14'>
            <div className='flex flex-col lg:flex-row gap-5 sm:gap-8 lg:gap-[70px]'>
                {/* Фильтрация */}
                <div className="w-full lg:w-[250px]">
                    <Filters />
                </div>

                {/* Список товаров */}
                <div className="flex-1">
                    <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
                        <ProductsGroupList
                            categoryId={1}
                            title='Пиццы' 
                            items={[
                                {
                                    id: 1,
                                    name: 'Пицца Пепперони',
                                    price: 30,
                                    imageUrl: '/pizza1.png',
                                    items: [{ price: 30 }],
                                    ingredients: ['2', '3', '7'], // моцарелла, чеснок, томаты
                                },
                                {
                                    id: 2,
                                    name: 'Пицца Грибная',
                                    price: 320,
                                    imageUrl: '/pizza2.png',
                                    items: [{ price: 32 }],
                                    ingredients: ['1', '2', '3'], // сырный соус, моцарелла, чеснок
                                },
                                {
                                    id: 3,
                                    name: 'Пицца Халапеньё',
                                    price: 35,
                                    imageUrl: '/pizza3.png',
                                    items: [{ price: 35 }],
                                    ingredients: ['2', '6', '7', '8', '3'], // моцарелла, халапеньё, томаты, жгучий перец, чеснок
                                },
                                {
                                    id: 4,
                                    name: 'Пицца 4 сезона',
                                    price: 29,
                                    imageUrl: '/pizza4.png',
                                    items: [{ price: 29 }],
                                    ingredients: ['2', '7', '5', '4', '10'], // моцарелла, томаты, красный лук, солёные огурчики, сыр Пармезан
                                },
                            ]}
                        />
                         <ProductsGroupList
                            title='Завтрак'
                            categoryId={2} 
                            items={[
                                {
                                    id: 5,
                                    name: 'Омлет с ветчиной и грибами',
                                    price: 7,
                                    imageUrl: '/zavtrak1.png',
                                    items: [{ price: 7 }],
                                    ingredients: ['2'], // моцарелла
                                },
                                {
                                    id: 6,
                                    name: 'Омлет с пепперони',
                                    price: 8,
                                    imageUrl: '/zavtrak2.png',
                                    items: [{ price: 8 }],
                                    ingredients: ['2', '7'], // моцарелла, томаты
                                },
                                {
                                    id: 7,
                                    name: 'Дэнвич ветчина и сыр',
                                    price: 7,
                                    imageUrl: '/zavtrak3.png',
                                    items: [{ price: 7 }],
                                    ingredients: ['7', '4'], // томаты, солёные огурчики
                                },
                            ]}
                        />
                        <ProductsGroupList
                            title='Закуски'
                            categoryId={3} 
                            items={[
                                 {
                                    id: 8,
                                    name: 'Додстер',
                                    price: 9,
                                    imageUrl:'/dodster.png',
                                    categoryId: 2,
                                    items: [{ price: 9 }],
                                    ingredients: ['2', '7', '3'], // моцарелла, томаты, чеснок
                                },
                                {
                                    id: 9,
                                    name: 'Острый Бургер 🌶️🌶️',
                                    price: 10,
                                    imageUrl: '/hot-burger.png',
                                    items: [{ price: 10 }],
                                    ingredients: ['6', '8', '3'], // халапеньё, жгучий перец, чеснок
                                },
                                {
                                    id: 10,
                                    name: 'Картофель из печи с соусом 🌱',
                                    price: 5,
                                    imageUrl: '/potato.png',
                                    items: [{ price: 5 }],
                                    ingredients: ['1', '3'], // сырный соус, чеснок
                                },
                                {
                                    id: 11,
                                    name: 'Куриные наггетсы',
                                    price: 8,
                                    imageUrl: '/chikens fingers.png',
                                    items: [{ price: 8 }],
                                    ingredients: ['3'], // чеснок
                                },
                            ]}
                        />
                        <ProductsGroupList
                            title='Коктейли'
                            categoryId={4} 
                            items={[
                                 {
                                    id: 12,
                                    name: 'Банановый молочный коктейль',
                                    price: 8,
                                    imageUrl: '/banana.png',
                                    categoryId: 2,
                                    items: [{ price: 8 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 13,
                                    name: 'Карамельное яблоко молочный коктейль',
                                    price: 6,
                                    imageUrl: '/caramel.png',
                                    items: [{ price: 6 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 14,
                                    name: 'Молочный коктейль с печеньем Орео',
                                    price: 10,
                                    imageUrl: '/oreo.png',
                                    items: [{ price: 10 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 15,
                                    name: 'Классический молочный коктейль 👶',
                                    price: 7,
                                    imageUrl: '/moloko.png',
                                    items: [{ price: 7 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                            ]}
                        />
                        <ProductsGroupList
                            title='Кофе'
                            categoryId={5} 
                            items={[
                                 {
                                    id: 16,
                                    name: 'Кофе Латте',
                                    price: 5,
                                    imageUrl: '/coffe.png',
                                    items: [{ price: 5 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 17,
                                    name: 'Кофе Американо',
                                    price: 6,
                                    imageUrl: '/coffee2.png',
                                    items: [{ price: 6 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 18,
                                    name: 'Кофе Кокосовый латте',
                                    price: 9,
                                    imageUrl: '/coffee0.png',
                                    items: [{ price: 9 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 19,
                                    name: 'Кофе Карамельный капучино',
                                    price: 10,
                                    imageUrl: '/coffee-caramel.png',
                                    items: [{ price: 10 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },
                                {
                                    id: 20,
                                    name: 'Ирландский Капучино',
                                    price: 11,
                                    imageUrl: '/irish-coffee.png',
                                    items: [{ price: 11 }],
                                    ingredients: [], // нет ингредиентов из списка
                                },   
                            ]}
                        />
                    </div>
                </div> 
            </div>  
        </Container>

        <Footer />
    </>
    );
}