"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoArrowBack, IoArrowForward, IoSearch } from "react-icons/io5";
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
    const [isLoading, setIsLoading] = useState(true);
    const [lastVisibleProduct, setLastVisibleProduct] = useState<any>(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const pageSize = 12;

    const searchBy = [
        { label: "Brand Name", value: "brandQuery" },
        { label: "Drug", value: "drugQuery" }
    ];

    const fetchProducts = async (isNewSearch: boolean = false) => {
        setIsLoading(true);

        try {
            const { fetchedProducts, lastVisible, totalProducts } = await DatabaseService().getProducts(
                pageSize,
                isNewSearch ? null : lastVisibleProduct,
                searchField,
                searchQuery.trim().toLowerCase()
            );

            setTotalProducts(totalProducts);
            setTotalPages(Math.ceil(totalProducts / pageSize));
            setProducts(fetchedProducts);
            setLastVisibleProduct(lastVisible);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
            setTotalProducts(0);
            setTotalPages(1);
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
        if (isSearching) return;
        setIsSearching(true);

        const params = new URLSearchParams();
        if (searchField) params.set("type", searchField);
        if (searchQuery.trim()) params.set("q", searchQuery.trim());

        router.push(`/products?${params.toString()}`);
        setCurrentPage(1);
        setLastVisibleProduct(null);

        fetchProducts(true).finally(() => setIsSearching(false));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handlePageChange = async (nextPage: boolean) => {
        if (isLoading) return;

        setCurrentPage((prevPage) => nextPage ? prevPage + 1 : prevPage - 1);
        await fetchProducts(false);

        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
            {/* Search Section */}
            <div className="flex md:flex-row flex-col gap-3 border bg-[#e7e7e7]/50 border-gray-300 p-2 rounded-md">
                <Select
                    value={searchField}
                    onValueChange={(value) => setSearchField(value)}
                    disabled={isLoading || isSearching}
                >
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
                <div className="flex gap-3 w-full">
                    <Input
                        placeholder="Search...."
                        className="bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading || isSearching}
                    />
                    <Button
                        className="h-11 rounded-[8px] w-[120px] gap-2"
                        onClick={handleSearch}
                        disabled={isLoading || isSearching}
                    >
                        <IoSearch /> Search
                    </Button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            )}

            {/* Products Grid */}
            {!isLoading && products.length > 0 && (
                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mt-8 h-full">
                    {products.map((product, index) => (
                        <CardItem
                            index={index}
                            key={`${product.id}-${index}`}
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
            )}

            {/* No Results State */}
            {!isLoading && products.length === 0 && (
                <div className="h-[50vh] flex w-full items-center justify-center">
                    <p className="text-muted-foreground">No Products Found</p>
                </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && products.length > 0 && (
                <div className="flex items-center gap-3 justify-center mt-4">
                    <Button
                        variant="outline"
                        className="ml-4"
                        size="sm"
                        disabled={currentPage === 1 || isLoading}
                        onClick={() => handlePageChange(false)}
                    >
                        <IoArrowBack/>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={products.length < pageSize || currentPage === totalPages || isLoading}
                        onClick={() => handlePageChange(true)}
                    >
                        <IoArrowForward/>
                    </Button>
                </div>
            )}

            <Toaster/>
        </div>
    );
}