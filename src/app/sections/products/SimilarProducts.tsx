'use client'

import {Button} from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {DatabaseService} from "@/core/database-service";
import {ProductModel} from "@/models/product.model";
import {useEffect, useState} from "react";
import ItemCard from "@/components/item-card";
import {IoArrowBack, IoArrowForward} from "react-icons/io5";

export default function SimilarProducts({ingridient}: { ingridient: string }) {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [api, setApi] = useState<any>();

    const fetchProducts = async (ingredient: string) => {
        try {
            const {fetchedProducts, lastVisible} = await DatabaseService().getProducts(
                6,
                null,
                ingridient,
                ingredient
            );

            setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    useEffect(() => {
        fetchProducts(ingridient);
    }, []);

    return (
        <div className="relative md:min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
            <h3 className="text-xl font-semibold">Similar Products</h3>
            <div className={"flex flex-col mt-8"}>
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }}
                          setApi={(api) => setApi(api)}
                >
                    <CarouselContent>
                        {
                            products.map((product, index) => (
                                <CarouselItem className={"md:basis-1/3"}>
                                    <ItemCard key={index}
                                              route={"/products/details?id=" + product.id}
                                              label={product.drug}
                                              scientificName={product.brand}
                                              manufacturer={product.manufacturer}
                                              packSize={product.packSize}
                                              strength={product.strength}
                                              img={product.imgUrl}
                                    />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}
