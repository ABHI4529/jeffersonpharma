"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoSearch } from "react-icons/io5";
import CardItem from "@/components/item-card";
import { Toaster } from "@/components/ui/sonner";
import { ProductModel } from "@/models/product.model";
import { DatabaseService } from "@/core/database-service";

export default function ProductsListing() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchField, setSearchField] = useState(searchParams.get("type") || "drugQuery");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastVisibleProduct, setLastVisibleProduct] = useState<any>(null);

    const searchBy = [
        { label: "Brand Name", value: "brandQuery" },
        { label: "Drug", value: "drugQuery" }
    ];

    const fetchProducts = async (isNewSearch: boolean = false) => {
        setIsLoading(true);

        try {
            const { fetchedProducts, lastVisible } = await DatabaseService().getProducts(
                10,
                isNewSearch ? null : lastVisibleProduct,
                searchField,
                searchQuery.toLowerCase()
            );

            if (isNewSearch) {
                setProducts(fetchedProducts);
            } else {
                setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
            }

            setLastVisibleProduct(lastVisible);
            setHasMore(fetchedProducts.length === 10);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const type = searchParams.get("type");
        const q = searchParams.get("q");
        if (type) setSearchField(type);
        if (q) setSearchQuery(q);
        fetchProducts(true);
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set("type", searchField);
        params.set("q", searchQuery);
        router.push(`/products?${params.toString()}`);
    };

    const loadMoreProducts = () => {
        if (!isLoading && hasMore) {
            fetchProducts();
        }
    };

    return (
        <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
            <div className="flex md:flex-row flex-col gap-3 border bg-[#e7e7e7]/50 border-gray-300 p-2 rounded-md">
                <Select value={searchField} onValueChange={(value) => setSearchField(value)}>
                    <SelectTrigger className="bg-white border-none h-11 rounded-[8px] w-full md:w-[200px]">
                        <SelectValue placeholder="Search By" />
                    </SelectTrigger>
                    <SelectContent>
                        {searchBy.map((e) => (
                            <SelectItem key={e.value} value={e.value}>
                                {e.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className={"flex gap-3 w-full"}>
                    <Input
                        placeholder="Search...."
                        className="bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button className="h-11 rounded-[8px] w-[120px] gap-2" onClick={handleSearch}>
                        <IoSearch /> Search
                    </Button>
                </div>
            </div>

            {
                products.length != 0 ?(
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mt-8 h-full overflow-y-scroll">
                        {products.map((product, index) => (
                            <CardItem
                                key={index}
                                route={"/products/details?id=" + product.id}
                                label={product.drug}
                                scientificName={product.brand}
                                manufacturer={product.manufacturer}
                                packSize={product.packSize}
                                strength={product.strength}
                                img={product.imgUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="h-[50vh] flex w-full items-center justify-center">
                        <p className={"text-muted-foreground"}>No Products Found</p>
                    </div>
                )
            }

            {hasMore && (
                <div className="flex justify-center mt-4">
                    <Button variant={"outline"} className={"border-none w-[200px]"} onClick={loadMoreProducts}
                            disabled={isLoading}>
                        {isLoading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}

            <Toaster/>
        </div>
    );
}