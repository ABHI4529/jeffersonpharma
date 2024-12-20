"use client";

import ItemCard from "@/components/item-card";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {IoArrowBack, IoArrowForward} from "react-icons/io5";
import {useEffect, useRef, useState} from "react";
import {DatabaseService} from "@/core/database-service";
import {ProductModel} from "@/models/product.model";
import Autoplay from "embla-carousel-autoplay";
import {motion, useInView} from "framer-motion";

export default function HomeProductsSection() {
    const [api, setApi] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductModel[]>([]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const {fetchedProducts, lastVisible} = await DatabaseService().getLimitedProducts(
                6);

            setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const ref = useRef(null);
    const inView = useInView(ref, {once: true});

    return (
        <div className={"flex relative z-[9] flex-col px-[4%] md:px-[8%] pt-10 md:pt-20 pb-10 bg-[#f2f2f2]"}>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 100
                }}
                animate={{
                    opacity: inView ? 1 : 0,
                    y: inView ? 0 : 100
                }}
                ref={ref}
                className={"text-lg md:text-2xl font-bold"}>Explore Our Products
            </motion.h1>
            <motion.p
                initial={{
                    opacity: 0,
                    y: 100
                }}
                animate={{
                    opacity: inView ? 1 : 0,
                    y: inView ? 0 : 100
                }}
                ref={ref}
                className={"text-xs max-w-72 md:max-w-full md:text-sm text-muted-foreground"}>Go through a wide range of
                Jefferson Pharma India and contact us
                for custom order.
            </motion.p>
            <div className={"flex flex-col mt-8"}>
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }}
                          plugins={[
                              Autoplay({
                                  delay: 5000
                              })
                          ]}
                          setApi={(api) => setApi(api)}
                >
                    <CarouselContent>
                        {
                            products.map((product, index) => (
                                <CarouselItem className={"md:basis-1/3"}>
                                    <ItemCard key={index}
                                              route={"/products/details?id=" + product.id}
                                              label={product.drug}
                                              index={index}
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
                <div className={"flex gap-3 items-center justify-center mt-8"}>
                    <Button variant={"link"} onClick={() => {
                        if (api) {
                            api.scrollPrev();
                        }
                    }}>
                        <IoArrowBack/>
                    </Button>
                    <Button variant={"link"} onClick={() => {
                        if (api) {
                            api.scrollNext();
                        }
                    }}>
                        <IoArrowForward/>
                    </Button>
                </div>
            </div>
        </div>
    )
}