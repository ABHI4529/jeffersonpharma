"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import ImagePicker from "@/components/ui/image-picker";
import { ProductModel } from "@/models/product.model";
import { useEffect, useState } from "react";
import { DatabaseService } from "@/core/database-service";
import { StorageService } from "@/core/storage-service";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IoSave, IoTrash } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export default function AdminProductDetailsPage() {
    const [product, setProduct] = useState<ProductModel | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [productName, setProductName] = useState<string>("");
    const [brandName, setBrandName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [manufacturer, setManufacturer] = useState<string>("");
    const [strength, setStrength] = useState<string>("");
    const [formType, setFormType] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [packSize, setPackSize] = useState<string>("");
    const [storageHandling, setStorageHandling] = useState<string>("");
    const [deletedImage, setDeletedImage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>();

    const router = useRouter();
    const params = useSearchParams();

    // Fetch the product if ID exists
    useEffect(() => {
        if (params.has("id")) {
            const productId = params.get("id");
            if (productId) {
                DatabaseService()
                    .getProductFromId(productId)
                    .then((product) => {
                        if (product) {
                            setProduct(product);
                            setProductName(product.drug);
                            setBrandName(product.brand);
                            setDescription(product.description);
                            setManufacturer(product.manufacturer);
                            setStrength(product.strength);
                            setFormType(product.type);
                            setStatus(product.status);
                            setPackSize(product.packSize);
                            setStorageHandling(product.storageHandling);
                            setImageUrl(product.imgUrl);
                        }
                    });
            }
        }
    }, [params]);

    // Save or Update Product
    async function saveProduct() {
        try {
            let imageUrl = product?.imgUrl;

            // If there's a new image, upload it
            if (imageFile) {
                if (deletedImage) {
                    // Delete the old image if marked for deletion
                    await StorageService().deleteFile(deletedImage);
                    setDeletedImage(null); // Clear the deleted image state
                }

                // Upload the new image
                imageUrl = await StorageService().uploadFile(imageFile);
            }

            const newProductData: ProductModel = {
                drug: productName,
                brand: brandName,
                description,
                manufacturer,
                strength,
                type: formType,
                status,
                packSize,
                storageHandling,
                imgUrl: imageUrl!,
                id: product ? product.id : DatabaseService().createProductId(brandName, productName),
                avlStrength: "",
                avlPackSize: "",
                packaging: "",
                disease: "",
                thirdParty: "",
                productContents: "",
                brandQuery: DatabaseService().generateQuery(brandName),
                drugQuery: DatabaseService().generateQuery(productName),
                contentsQuery: DatabaseService().generateQuery(description),
            };

            if (product) {
                // Update the existing product
                await DatabaseService().editProduct(product.id, newProductData);
                toast.success("Product updated successfully!");
            } else {
                // Add a new product
                await DatabaseService().createProduct(newProductData);
                toast.success("Product created successfully!");
            }

            router.back(); // Navigate back after saving
        } catch (error: any) {
            toast.error("Something went wrong: " + error.message);
        }
    }

    // Delete Product
    async function deleteProduct() {
        if (!product) return;

        try {
            await DatabaseService().deleteProduct(product.id);

            // If the product has an image, delete it from storage
            if (product.imgUrl) {
                await StorageService().deleteFile(product.imgUrl);
            }

            toast.success("Product deleted successfully!");
            router.back(); // Navigate back after deletion
        } catch (error: any) {
            toast.error("Error deleting product: " + error.message);
        }
    }

    return (
        <div className={"flex relative bg-grid-black/10 h-screen flex-col"}>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className={"flex z-[9] justify-between bg-white px-8 items-center py-6 border-b border-b-neutral-100"}>
                <div className={"flex flex-col"}>
                    <Button
                        variant={"link"}
                        size={"sm"}
                        className={"w-min p-0"}
                        onClick={() => {
                            router.back();
                        }}
                    >
                        <IoIosArrowBack />
                        Products
                    </Button>
                    <h1 className={"text-3xl font-bold"}>
                        {product !== undefined ? "Edit Product" : "Create Product"}
                    </h1>
                </div>
                <div className={"flex gap-3"}>
                    {product && (
                        <Button variant={"destructive"} className={"rounded-xl h-11 gap-2"} onClick={deleteProduct}>
                            Delete Product
                            <IoTrash />
                        </Button>
                    )}
                    <Button className={"rounded-xl h-11 gap-2"} onClick={saveProduct}>
                        {product !== undefined ? "Update Product" : "Create Product"}
                        <IoSave />
                    </Button>
                </div>
            </div>
            <div className={"flex flex-col h-[80vh] w-full overflow-y-scroll items-center gap-3 pt-6 pb-16 px-8"}>
                <div className={"flex z-[9] flex-col w-[30vw] gap-3 p-6 bg-white rounded-2xl shadow-2xl"}>
                    {imageUrl ? (
                        <Popover>
                            <PopoverTrigger className={"w-full"}>
                                <img className={"w-full rounded-xl h-[200px]"} src={imageUrl} alt={"image"}/>
                            </PopoverTrigger>
                            <PopoverContent className={"p-2"}>
                                <Button variant={"destructive"} className={"w-full"} onClick={()=>{
                                    setDeletedImage(imageUrl);
                                    setImageUrl(undefined);
                                }}>
                                    Delete
                                </Button>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <ImagePicker
                            onDataSubmit={(data) => {
                                setImageFile(data);
                            }}
                        />
                    )}
                    <div className={"flex flex-col gap-3 mt-4"}>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Drug Name</Label>
                            <Input value={productName} onChange={(e) => setProductName(e.target.value)} className={"h-9 border"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Brand Name</Label>
                            <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} className={"h-9 border"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Description / Disclaimer</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={"h-9 border"}
                            />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Manufacturer</Label>
                            <Input
                                value={manufacturer}
                                onChange={(e) => setManufacturer(e.target.value)}
                                className={"h-9 border"}
                            />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Strength</Label>
                            <Input value={strength} onChange={(e) => setStrength(e.target.value)} className={"h-9 border"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Type / Form</Label>
                            <Input value={formType} onChange={(e) => setFormType(e.target.value)} className={"h-9 border"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Status</Label>
                            <Input value={status} onChange={(e) => setStatus(e.target.value)} className={"h-9 border"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Pack Size</Label>
                            <Input value={packSize} onChange={(e) => setPackSize(e.target.value)} className={"h-9 border"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Storage & Handling</Label>
                            <Input
                                value={storageHandling}
                                onChange={(e) => setStorageHandling(e.target.value)}
                                className={"h-9 border"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
