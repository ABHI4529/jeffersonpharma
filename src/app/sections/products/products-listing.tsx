"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoSearch } from "react-icons/io5";
import CardItem from "@/components/item-card";
import { Toaster } from "@/components/ui/sonner";
import { ProductModel } from "@/models/product.model";
import {DatabaseService} from "@/core/database-service";
import {sampleProducts} from "@/assets/sample-products"; // Assuming this contains the Firestore query logic

export default function ProductsListing() {
    const [searchField, setSearchField] = useState("product_name"); // Default search by Product Name
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // For pagination control
    const [page, setPage] = useState(1);

    const searchBy = [
        { label: "Brand Name", value: "brandQuery" },
        { label: "Product Content", value: "contentsQuery" },
        { label: "Drug", value: "drugQuery" }
    ];

    // Fetch products on initial load and when page changes (for pagination)
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);

            try {
                const fetchedProducts = await DatabaseService().getProducts(10); // Call the function to fetch 20 products at a time
                setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);

                if (fetchedProducts.length < 10) {
                    setHasMore(false); // No more products to load
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [page]);

    // Handle search
    const handleSearch = async () => {
        setIsLoading(true);
        setProducts([]); // Clear previous results
        setPage(1); // Reset pagination

        try {
            const searchResults = await DatabaseService().getProducts(10, searchField, searchQuery); // Modify your getProducts function to accept search parameters
            setProducts(searchResults);
            setHasMore(searchResults.length === 10); // Check if we have more results
        } catch (error) {
            console.error("Error searching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load more products (pagination)
    const loadMoreProducts = () => {
        if (!isLoading && hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment page to fetch the next set of products
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

            {/* Product grid */}
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mt-8 h-full overflow-y-scroll">
                {products.map((product, index) => (
                    <CardItem
                        key={index}
                        route={"/products/details?id=" + product.id}
                        label={product.drug}
                        scientificName={product.brand}
                        description={product.description || "Description here"}
                        img={product.imgUrl} // Replace with real product image if available
                    />
                ))}
            </div>

            {/* Pagination: Load More button */}
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
