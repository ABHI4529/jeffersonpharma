"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {ProductModel} from "@/models/product.model";
import {DatabaseService} from "@/core/database-service";
import {AiOutlineLoading} from "react-icons/ai";
import {Lens} from "@/components/ui/lens";
import Image from "next/image";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import PageFooter from "@/components/page-footer";
import SimilarProducts from "@/app/sections/products/SimilarProducts";

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
        <div className={"flex flex-col"}>
            <Navbar index={2}/>
            <div className={"relative px-[4%] py-28 md:px-[8%] flex flex-col min-h-screen bg-grid-black/10"}>
                <div
                    className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                {
                    loading || product === undefined ? (
                        <div
                            className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex border border-gray-300 rounded-md shadow-2xl bg-white p-6"}>
                            <AiOutlineLoading className={"animate-spin"}/>
                        </div>
                    ) : <motion.div
                        initial={{
                            y: 50,
                            scale: 0.7,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            scale: 1,
                            opacity: 1
                        }}
                        className={"flex bg-white p-7 rounded-2xl shadow-2xl self-center flex-col gap-6 z-[9] w-full md:w-[35vw]"}>
                        <div className={"flex flex-col"}>
                            <Lens hovering={hovering} setHovering={setHovering}>
                                <img
                                    src={product?.imgUrl}
                                    alt="image"
                                    className="rounded-2xl w-full h-[250px]"
                                />
                            </Lens>
                        </div>
                        <div className={cn("flex flex-col w-full")}>
                            <p className={"text-xs md:text-sm text-[#2472cc]"}>{product.drug}</p>
                            <h1 className={"text-xl md:text-4xl font-bold"}>{product.brand}</h1>
                            <div
                                className={"flex rounded-xl p-3 flex-col mt-5 shadow-inner bg-[#fcfcfc] border border-gray-300"}>
                                <Table>
                                    <TableBody>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Brand Name / Trade Name
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                {product.brand}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Active Ingredient
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                {product.drug}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Power / Strength
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                {product.strength}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Type / Form
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                {product.type}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Status
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                Status
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Manufacturer
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                {product.manufacturer}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className={"hover:bg-transparent"}>
                                            <TableCell>
                                                Pack Size
                                            </TableCell>
                                            <TableCell className={"text-end"}>
                                                {product.packSize}
                                            </TableCell>
                                        </TableRow><TableRow className={"hover:bg-transparent"}>
                                        <TableCell>
                                            Storage & Handeling
                                        </TableCell>
                                        <TableCell className={"text-end"}>
                                            storage
                                        </TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </motion.div>
                }
            </div>
            <SimilarProducts ingridient={product?.drug || ""} />
            <PageFooter />
        </div>
    )
}