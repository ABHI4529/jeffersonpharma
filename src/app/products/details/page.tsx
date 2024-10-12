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
import {motion} from "framer-motion";
import Navbar from "@/components/navbar";
import PageFooter from "@/components/page-footer";
import SimilarProducts from "@/app/sections/products/SimilarProducts";
import msme from "@/assets/MSME Logo.jpg";
import ministry from "@/assets/ministry-for-corporate-affairs-jobs.jpg";
import fda from "@/assets/FDA Maharashtra.png";
import DeliveryCardsCarousel from "@/components/delivery-cards-carousel";

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
                    ) : <div className={"flex md:flex-row flex-col justify-between gap-5"}>
                        <div className={"flex flex-col gap-5 w-full md:w-[350px]"}>
                            <div
                                className={"flex flex-col shadow-md bg-white h-min z-[9] rounded-md"}>
                                <Lens hovering={hovering} setHovering={setHovering}>
                                    <img
                                        src={product?.imgUrl}
                                        alt="image"
                                        className="rounded-2xl w-full object-cover h-[250px]"
                                    />
                                </Lens>
                            </div>
                            <div
                                className={"hidden md:flex flex-col p-6 gap-3 shadow-md bg-white h-full z-[9] rounded-md"}>
                                <p className={"text-md font-bold"}>
                                    Delivery Process
                                </p>
                                <div className={"h-full w-full"}>
                                    <DeliveryCardsCarousel/>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col shadow-md p-6 gap-2 bg-white rounded-md z-[9] w-full"}>
                            <p className={"text-xs md:text-sm text-[#2472cc]"}>{product.drug}</p>
                            <h1 className={"text-xl md:text-4xl font-bold"}>{product.brand}</h1>
                            <p className={"text-sm text-muted-foreground"}>
                                {product.description}
                            </p>
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
                        <div
                            className={"flex md:hidden flex-col p-6 gap-3 shadow-md bg-white h-full z-[9] rounded-md"}>
                            <p className={"text-md font-bold"}>
                                Delivery Process
                            </p>
                            <div className={"h-full w-full"}>
                                <DeliveryCardsCarousel/>
                            </div>
                        </div>
                        <div className={"flex flex-col bg-white w-full md:w-[80%] shadow-md z-[9] rounded-md gap-3 p-6"}>
                            <p className={"font-bold text-md"}>About Jefferson Pharma India.</p>
                            <p className={"text-muted-foreground text-xs h-full"}>
                                We at Jefferson Pharma India believe that true hospitality extends beyond the realm of
                                traditional service industries and take pride in being one of the fastest growing
                                pharmaceutical suppliers. Jefferson Pharma India is driven by a profound commitment to
                                transforming the pharmaceutical supply chain. Our mission is to ensure that medications
                                reach those who need them the most, regardless of their location or circumstance.

                                We recognize the challenges faced by healthcare providers, patients, and communities in
                                accessing vital pharmaceutical products. By leveraging innovative solutions and
                                strategic partnerships, we aim to streamline the supply chain, reduce barriers, and
                                enhance the availability of medications. Our vision is to help create a world where
                                everyone has access to the medicines they require, empowering individuals and
                                communities to lead healthier lives. Together, we can bridge the gap in pharmaceutical
                                distribution and make a meaningful impact on global health. Join us on this journey to
                                redefine the future of pharmaceutical accessibility.
                            </p>
                            <div className={"flex gap-6 items-center"}>
                                <img src={msme.src} alt={"msme"} className={"h-11"}/>
                                <img src={ministry.src} alt={"msme"} className={"h-11"}/>
                                <img src={fda.src} alt={"msme"} className={"h-11"}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <SimilarProducts ingridient={product?.drug || ""}/>
            <PageFooter/>
        </div>
    )
}