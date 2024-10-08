"use client";

import {Input} from "@/components/ui/input";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import React, {useState} from "react";


export default function HomeProductSearch(){
    const [searchParams, setSearchParams] = useState<string>("");

    return (
        <div className={"flex gap-3 mt-8 w-[90%]"}>
            <Input placeholder={"Search Products"}
                   onChange={(value)=>setSearchParams(value.target.value)}
                   className={"bg-[#e7e7e7] border border-primary md:border-none h-11 rounded-sm"}/>
            <Link href={`/products?type=drugQuery&q=${searchParams}`} className={buttonVariants({
                className: "h-11 w-[150px]"
            })}>
                Search
            </Link>
        </div>
    )
}