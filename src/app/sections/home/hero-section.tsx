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
            <div
                className={"absolute md:bg-gradient-to-t md:from-transparent bg-gradient-to-t from-white to-white/30 md:bg-transparent px-[4%] md:px-[8%] flex w-full md:w-[55%] h-full justify-center flex-col gap-2"}>
                <h1 className={`text-xl md:text-3xl ${bebasNeue.className}`}>JEFFERSON IMPLEX PVT. LTD.</h1>
                <div className={"flex flex-col gap-1"}>
                    <h1 className={"text-xl md:text-5xl font-bold md:whitespace-nowrap"}>
                        Ensuring <span className={"mx-1 text-primary"}>
                        Health
                    </span>
                    </h1>
                    <h1 className={"text-xl md:text-5xl font-bold md:whitespace-nowrap"}>
                        Across <span className={"text-primary"}>
                        Continents
                    </span>
                    </h1>
                </div>
                <h2 className={"text-sm md:text-md text-muted-foreground w-[90%]"}>
                    We at Jefferson Pharma take pride in being one of the fastest growing pharmaceutical suppliers and
                    believe that true hospitality extends beyond the realm of traditional service industries.
                </h2>
                <div className={"flex gap-3 mt-8 w-[90%]"}>
                    <Input placeholder={"Search Products"}
                           className={"bg-[#e7e7e7] border border-primary md:border-none h-11 rounded-sm"}/>
                    <Button className={"h-11 w-[150px]"}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}