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
import Sidebar from "@/components/admin-components/sidebar";
import {IoShare} from "react-icons/io5";

export default function AdminProductsPage() {
    const [searchField, setSearchField] = useState("product_name");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastVisibleProduct, setLastVisibleProduct] = useState<any>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const searchBy = Object.freeze([
        { label: "Brand Name", value: "brandQuery" },
        { label: "Product Content", value: "contentsQuery" },
        { label: "Drug", value: "drugQuery" }
    ]);

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
                setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
            }

            setLastVisibleProduct(lastVisible);
            setHasMore(fetchedProducts.length === 10);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        router.push(`/admin/dashboard/admin-products?type=${searchField}&q=${encodeURIComponent(searchQuery)}`);
    };

    useEffect(() => {
        const query = searchParams.get("q");
        const type = searchParams.get("type") || "product_name";

        setSearchField(type);
        setSearchQuery(query || "");

        if (query) {
            fetchProducts(true);
        } else {
            fetchProducts(true);
        }
    }, [searchParams]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const loadMoreProducts = () => {
        if (!isLoading && hasMore) {
            fetchProducts();
        }
    };

    return (
        <div className={"flex flex-col px-8"}>
            <Sidebar/>
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <Button className={"rounded-xl h-11 gap-2"} onClick={handleSearch}>
                        Search
                    </Button>
                    <Button className={"rounded-xl h-11 gap-2"}>
                        <IoShare/>
                        Export
                    </Button>
                    <Button className={"rounded-xl h-11 gap-2"} onClick={() => router.push("/admin/dashboard/admin-products/details")}>
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
                        {products.map((item, index) => (
                            <TableRow key={item.id || index} onClick={() => router.push(`/admin/dashboard/admin-products/details?id=${item.id}`)}>
                                <TableCell>{item.drug}</TableCell>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.manufacturer}</TableCell>
                                <TableCell>{item.strength}</TableCell>
                                <TableCell>{item.packSize}</TableCell>
                            </TableRow>
                        ))}
                        {hasMore && (
                            <TableRow className="absolute flex justify-center w-full my-2">
                                <Button variant={"outline"} size={"sm"} className={"border-none w-[200px]"} onClick={loadMoreProducts} disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Load More"}
                                </Button>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}