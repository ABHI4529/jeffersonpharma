"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ProductModel } from "@/models/product.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatabaseService } from "@/core/database-service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminProductsPage() {
    const [searchField, setSearchField] = useState("product_name"); // Default search by Product Name
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // For pagination control
    const [page, setPage] = useState(1);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Immutable array for search options
    const searchBy = Object.freeze([
        { label: "Brand Name", value: "brandQuery" },
        { label: "Product Content", value: "contentsQuery" },
        { label: "Drug", value: "drugQuery" }
    ]);

    // Pure function to fetch products
    const fetchProducts = async (page: number) => {
        setIsLoading(true);
        try {
            const fetchedProducts = await DatabaseService().getProducts(10); // Fetch 10 products at a time
            setProducts(prevProducts => [...prevProducts, ...fetchedProducts]); // Immutable update
            if (fetchedProducts.length < 10) {
                setHasMore(false); // No more products to load
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Pure function to handle search
    const handleSearch = async (query: string, field = searchField) => {
        setIsLoading(true);
        setProducts([]); // Clear previous results immutably
        setPage(1); // Reset pagination
        try {
            const searchResults = await DatabaseService().getProducts(15, field, query);
            setProducts(searchResults); // Immutable update
            setHasMore(searchResults.length === 15);
        } catch (error) {
            console.error("Error searching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Effect to handle URL changes or page reload (reacting to query params)
    useEffect(() => {
        const query = searchParams.get("q");
        const type = searchParams.get("type") || "product_name"; // Default to "product_name" if type is missing

        setSearchField(type);
        if (query) {
            setSearchQuery(query); // Update searchQuery state immutably
            handleSearch(query, type);    // Trigger search based on query param
        } else {
            fetchProducts(page); // Fetch initial products if no query param
        }
    }, [page, searchParams]); // React to both page and searchParams

    // Trigger URL change and search when Enter is pressed
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            router.push(`/admin/dashboard/products?type=${searchField}&q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Trigger URL change and search when button is clicked
    const handleSearchClick = () => {
        router.push(`/admin/dashboard/products?type=${searchField}&q=${encodeURIComponent(searchQuery)}`);
    };

    // Pagination for loading more products
    const loadMoreProducts = () => {
        if (!isLoading && hasMore) {
            setPage(prevPage => prevPage + 1); // Increment page immutably
        }
    };

    return (
        <div className={"flex flex-col px-8"}>
            <div className={"flex justify-between items-center pb-6 border-b border-b-neutral-100"}>
                <h1 className={"text-3xl font-bold"}>Products</h1>
                <div className={"flex gap-3"}>
                    <Select value={searchField} onValueChange={(value) => setSearchField(value)}>
                        <SelectTrigger className="bg-neutral-200 border-none h-11 rounded-xl w-[200px]">
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
                        placeholder={"Search..."}
                        className={"bg-neutral-200 w-[400px] rounded-xl"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Immutable update
                        onKeyDown={handleSearchKeyDown} // Trigger search on Enter key
                    />
                    <Button className={"rounded-xl h-11 gap-2"} onClick={handleSearchClick}>
                        Search
                    </Button>
                    <Button className={"rounded-xl h-11 gap-2"} onClick={() => router.push("/admin/dashboard/products/details")}>
                        Add New
                        <PlusIcon />
                    </Button>
                </div>
            </div>
            <div className={"flex flex-col gap-3 h-[70vh]"}>
                <Table>
                    <TableHeader className={"sticky top-0 bg-white shadow"}>
                        <TableHead>Drug</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Manufacturer</TableHead>
                        <TableHead>Strength</TableHead>
                        <TableHead>Pack Size</TableHead>
                    </TableHeader>
                    <TableBody>
                        {products.map((item) => (
                            <TableRow key={item.id} onClick={() => router.push(`/admin/dashboard/products/details?id=${item.id}`)}>
                                <TableCell>{item.drug}</TableCell>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.manufacturer}</TableCell>
                                <TableCell>{item.strength}</TableCell>
                                <TableCell>{item.packSize}</TableCell>
                            </TableRow>
                        ))}
                        {hasMore && (
                            <TableRow className={"absolute w-full"}>
                                <div className="flex justify-center w-full my-2">
                                    <Button variant={"outline"} size={"sm"} className={"border-none w-[200px]"} onClick={loadMoreProducts} disabled={isLoading}>
                                        {isLoading ? "Loading..." : "Load More"}
                                    </Button>
                                </div>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
