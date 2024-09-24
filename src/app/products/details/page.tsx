"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {ProductModel} from "@/models/product.model";
import {DatabaseService} from "@/core/database-service";
import {AiOutlineLoading} from "react-icons/ai";
import {Lens} from "@/components/ui/lens";
import Image from "next/image";

export default function ProductDetails() {
    const [product, setProduct] = useState<ProductModel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [hovering, setHovering] = useState(false);

    const params = useSearchParams();

    function getProducts() {
        const productId = params.get("id");

        if (productId) {
            DatabaseService().getProductFromId(productId).then((product) => {
                setProduct(product);
                setLoading(false);
            })
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className={"relative px-[4%] pt-28 md:px-[8%] flex flex-col min-h-screen bg-grid-black/10"}>
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {
                loading || product === undefined ? (
                    <div
                        className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex border border-gray-300 rounded-md shadow-2xl bg-white p-6"}>
                        <AiOutlineLoading className={"animate-spin"}/>
                    </div>
                ) : <div className={"flex gap-8 z-[9] w-full"}>
                    <div className={"flex flex-col w-[40%] "}>
                        <Lens hovering={hovering} setHovering={setHovering}>
                            <img
                                src={product?.imgUrl}
                                alt="image"
                                className="rounded-2xl w-full"
                            />
                        </Lens>
                    </div>
                    <div className={"flex flex-col mt-6 w-[60%]"}>
                        <p className={"text-[#2472cc]"}>{product.drug}</p>
                        <h1 className={"text-4xl font-bold"}>{product.brand}</h1>
                        <p className={"text-sm text-muted-foreground mt-2"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}