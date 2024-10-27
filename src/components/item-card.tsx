"use client";

import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {motion, useInView} from "framer-motion";
import {useRef} from "react";

interface ItemCardProps {
    label?: string;
    scientificName?: string;
    packSize?: string;
    strength?: string;
    manufacturer?: string;
    img?: string;
    index : number;
    route?: string;
}

export default function CardItem({label, scientificName, strength, packSize, manufacturer, img, route, index}: ItemCardProps) {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true});

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 100,
                scale: 0.9
            }}
            animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 100,
                scale: inView ? 1 : 0.9
            }}
            transition={{
                duration: 0.4,
                delay: index * 0.1
            }}
            ref={ref}
            className={"border-[#d2d2d2] shadow bg-white rounded-[30px] p-6"}>
            <img src={img} className={"rounded-[22px] w-full h-[200px] object-cover"} alt={"product"}/>
            <div className={"py-3"}>
                <p className={"text-xs text-muted-foreground"}>{scientificName}</p>
                <h1 className={"text-md md:text-xl font-bold"}>{label}</h1>
                <div className={"flex flex-col"}>
                    <p className={"text-xs text-muted-foreground"}>Pack Size : {packSize}</p>
                    <p className={"text-xs text-muted-foreground"}>Strength : {strength}</p>
                    <p className={"text-xs text-muted-foreground"}>Manufacturer :  {manufacturer}</p>
                </div>
            </div>
            <Link href={route ?? "/"} className={buttonVariants({variant: "default", className: "w-full mt-4"})}>
                Know More
            </Link>
        </motion.div>
    )
}