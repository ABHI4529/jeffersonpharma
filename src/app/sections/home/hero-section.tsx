import React from 'react';

import {Bebas_Neue} from "next/font/google";
import {Input} from "@/components/ui/input";
import {Button, buttonVariants} from "@/components/ui/button";
import HomeHeroCarousel from "@/components/home-hero-carousel";
import Link from "next/link";
import HomeProductSearch from "@/components/home-product-search";

const bebasNeue = Bebas_Neue({subsets: ["latin"], weight: "400"})

export default function HeroSection() {
    return (
        <div className="relative items-center justify-center w-full h-screen overflow-hidden">
            <HomeHeroCarousel/>
            <div
                className={"absolute md:bg-gradient-to-t md:from-transparent bg-gradient-to-t from-white to-white/30 md:bg-transparent px-[4%] md:px-[8%] flex w-full md:w-[55%] h-full justify-center flex-col gap-2"}>
                <div className={"flex flex-col gap-1 mt-4"}>
                    <h1 className={"text-2xl md:text-5xl font-bold md:whitespace-nowrap"}>
                        Ensuring <span className={"mx-1 text-primary"}>
                        Health
                    </span>
                    </h1>
                    <h1 className={"text-2xl md:text-5xl font-bold md:whitespace-nowrap"}>
                        Across <span className={"text-primary"}>
                        Continents
                    </span>
                    </h1>
                </div>
                <h2 className={"text-sm md:text-md text-muted-foreground w-[100%]"}>
                    Welcome to Jefferson Pharma India, your trusted <strong>pharmaceutical export company in India</strong>. With a
                    strong commitment to quality and excellence, we specialize in delivering a diverse range of
                    <strong> pharmaceutical products</strong> to clients worldwide.<br/><br/>
                    We understand the importance of reliability and innovation in today’s market. Our experienced team
                    ensures that every product adheres to the highest industry standards, empowering your business with
                    the solutions it needs to succeed.<br/><br/>
                    Join us in advancing healthcare globally—experience the Jefferson Pharma difference today.
                </h2>
                <HomeProductSearch/>
            </div>
        </div>
    );
}