import {AuroraBackground} from "@/components/ui/aurora-background";
import {Bebas_Neue} from "next/font/google";
import React from "react";
import services_illustartion from "@/assets/services-illustration.png";

const bebasNeue = Bebas_Neue({subsets: ["latin"], weight: "400"})

export default function ServicesHeroSection() {
    return (
        <div
            className={"flex bg-[#f5f5f5] md:flex-row flex-col px-[8%] gap-3 justify-center py-28 items-center min-h-screen w-full"}>
            <div className={"flex flex-col gap-1 w-full"}>
                <h1 className={`text-xl md:text-3xl ${bebasNeue.className}`}>Our Services</h1>
                <h1 className={"text-xl md:text-4xl font-bold"}>
                    We handle just about everything!
                </h1>
                <h2 className={"text-sm md:text-md text-muted-foreground w-[90%]"}>
                    We are actively working towards delivering innovative solutions and supporting patients
                    across the healthcare continuum enabling a shift from illness to wellness. We are
                    continuously striving to stay ahead and contribute to the ongoing need for quality
                    healthcare.
                </h2>
            </div>
            <div className={"flex flex-col w-[100%] md:ml-20 mt-16"}>
                <img className={"w-full object-contain"} src={services_illustartion.src} alt={"services"}/>
            </div>
        </div>
    )
}