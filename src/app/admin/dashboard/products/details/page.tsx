"use client";

import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {IoIosArrowBack} from "react-icons/io";
import {useRouter, useSearchParams} from "next/navigation";
import ImagePicker from "@/components/ui/image-picker";
import {ProductModel} from "@/models/product.model";
import {useEffect, useState} from "react";
import {DatabaseService} from "@/core/database-service";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {IoSave} from "react-icons/io5";
import {Textarea} from "@/components/ui/textarea";

interface props {
    product: ProductModel
}

export default function AdminProductDetailsPage() {
    const [product, setProduct] = useState<ProductModel>();
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        if (params.has("id")) {
            const productId = params.get("id");
            if (productId) {
                DatabaseService().getProductFromId(productId).then((product) => {
                    setProduct(product);
                })
            }
        }
    }, [])

    return (
        <div className={"flex relative bg-grid-black/10 h-screen flex-col"}>
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className={"flex z-[9] justify-between bg-white px-8 items-center pb-6 border-b border-b-neutral-100"}>
                <div className={"flex flex-col"}>
                    <Button
                        variant={"link"}
                        size={"sm"}
                        className={"w-min p-0"}
                        onClick={() => {
                            router.back();
                        }}
                    >
                        <IoIosArrowBack/>
                        Products
                    </Button>
                    <h1 className={"text-3xl font-bold"}>
                        {
                            product !== undefined ?
                                "Edit Product" : "Create Product"
                        }
                    </h1>
                </div>
                <div className={"flex gap-3"}>
                    <Button className={"rounded-xl h-11 gap-2"}>
                        {
                            product !== undefined ?
                                "Update Product" : "Create Product"
                        }
                        <IoSave/>
                    </Button>
                </div>
            </div>
            <div
                className={"flex flex-col h-[75vh] w-full overflow-y-scroll items-center gap-3 pt-6 pb-16 px-8"}>
                <div className={"flex z-[9] flex-col w-[30vw] gap-3 p-6 bg-white rounded-2xl shadow-2xl"}>
                    {
                        product !== undefined ?
                            <img className={"w-full rounded-xl"} src={product.imgUrl} alt={"image"}/>
                            : <ImagePicker
                                onDataSubmit={(data) => {
                                    console.log(data);
                                }}
                            />
                    }
                    <div className={"flex flex-col gap-3 mt-4"}>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Drug Name</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Brand Name</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Description / Disclaimer</Label>
                            <Textarea className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Manufacturer</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Strength</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Type / Form</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Status</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Pack Size</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Storage & Handeling</Label>
                            <Input className={"h-9 border"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}