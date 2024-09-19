"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {IoSearch} from "react-icons/io5";
import {test_durgs} from "@/app/products/test_durgs";
import CardItem from "@/components/item-card";


export default function ProductsListing(){
    const searchBy = [
        {
            label : "Product Name",
            value : "product_name",
        },
        {
            label : "Product Content",
            value : "product_contents",
        },
        {
            label : "Brand",
            value : "brand",
        }
    ]

    return(
        <div className={"relative min-h-screen px-[8%] py-24 flex flex-col gap-3"}>
            <div className={"flex gap-3 border bg-[#e7e7e7]/50 border-gray-300 p-2 rounded-md"}>
                <Select>
                    <SelectTrigger className={"bg-white border-none h-11 rounded-[8px] w-[200px]"}>
                        <SelectValue placeholder={"Search By"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            searchBy.map((e, index)=>(
                                <SelectItem value={e.value}>
                                    {e.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Input placeholder={"Search...."} className={"bg-white"}/>
                <Button className={"h-11 rounded-[8px] gap-2"}>
                    <IoSearch/> Search
                </Button>
            </div>
            <div className={"grid gap-3 grid-cols-3 mt-8 h-full overflow-y-scroll"}>
                {
                    test_durgs.map((e, index)=>(
                        <CardItem
                            label={e.Drug}
                            scientificName={e.Brand}
                            description={"Description Here"}
                            img={"https://placehold.co/800x400/png"}
                        />
                    ))
                }
            </div>
        </div>
    )
}