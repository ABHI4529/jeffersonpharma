"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoSearch } from "react-icons/io5";
import CardItem from "@/components/item-card";
import { Toaster } from "@/components/ui/sonner";
import { ProductModel } from "@/models/product.model";
import { DatabaseService } from "@/core/database-service";

export default function ProductsListing() {
    const [searchField, setSearchField] = useState("product_name");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastVisibleProduct, setLastVisibleProduct] = useState<any>(null);

    const searchBy = [
        { label: "Brand Name", value: "brandQuery" },
        { label: "Product Content", value: "contentsQuery" },
        { label: "Drug", value: "drugQuery" }
    ];

    const fetchProducts = async (isNewSearch: boolean = false) => {
        setIsLoading(true);

        try {
            const { fetchedProducts, lastVisible } = await DatabaseService().getProducts(
                10,
                isNewSearch ? null : lastVisibleProduct,
                searchField,
                searchQuery
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
        fetchProducts(true);
    }, []);

    const handleSearch = () => {
        fetchProducts(true);
    };

    const loadMoreProducts = () => {
        if (!isLoading && hasMore) {
            fetchProducts();
        }
    };

    return (
        <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
            <div className="flex gap-3 border bg-[#e7e7e7]/50 border-gray-300 p-2 rounded-md">
                <Select onValueChange={(value) => setSearchField(value)}>
                    <SelectTrigger className="bg-white border-none h-11 rounded-[8px] w-[200px]">
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
                <Input
                    placeholder="Search...."
                    className="bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="h-11 rounded-[8px] gap-2" onClick={handleSearch}>
                    <IoSearch /> Search
                </Button>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mt-8 h-full overflow-y-scroll">
                {products.map((product, index) => (
                    <CardItem
                        key={index}
                        route={"/products/details?id=" + product.id}
                        label={product.drug}
                        scientificName={product.brand}
                        description={product.description || "Description here"}
                        img={product.imgUrl}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-4">
                    <Button variant={"outline"} className={"border-none w-[200px]"} onClick={loadMoreProducts} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}

            <Toaster />
        </div>
    );
}