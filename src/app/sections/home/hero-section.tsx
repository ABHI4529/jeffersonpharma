import React from 'react';

import {Bebas_Neue} from "next/font/google";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import HomeHeroCarousel from "@/components/home-hero-carousel";

const bebasNeue = Bebas_Neue({subsets: ["latin"], weight: "400"})

export default function HeroSection() {


    return (
        <div className="relative items-center justify-center w-full h-screen overflow-hidden">
           <HomeHeroCarousel/>
            <div className={"absolute px-[4%] flex w-full md:w-[55%] h-full justify-center flex-col gap-1"}>
                <h1 className={`text-xl md:text-3xl ${bebasNeue.className}`}>JEFFERSON IMPLEX PVT. LTD.</h1>
                <h1 className={"text-xl md:text-4xl font-bold"}>
                    Empowering Global Healthcare with World-Class Pharmaceuticals
                </h1>
                <h2 className={"text-sm md:text-md text-muted-foreground w-[90%]"}>
                    we are revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical
                    solutions worldwide. With a commitment to excellence, innovation, and reliability, we export a wide
                    range of pharmaceutical products that meet the most stringent global standards.
                </h2>
                <div className={"flex gap-3 mt-8 w-[90%]"}>
                    <Input placeholder={"Search Products"} className={"bg-[#e7e7e7] border-none h-11 rounded-sm"}/>
                    <Button className={"h-11 w-[150px]"}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}