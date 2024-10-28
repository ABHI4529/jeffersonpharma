"use client";

import { motion, useInView } from "framer-motion";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useRef } from "react";


interface props{
    review: any;
    index : number;
}

export default function ReviewCard({review, index} : props) {

    const ref = useRef(null);
    const inView = useInView(ref, {once: false});

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: inView ? 1 : 0,
                scale: inView ? 1 : 0.9,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
            className="shadow-l border border-neutral-300 rounded-md bg-white h-full"
        >
            <CardHeader>
                <div className={"flex gap-3 items-center"}>
                    <div className={"py-2 px-5 rounded-md bg-primary"}>
                        <p className={"text-white"}>{index + 1}</p>
                    </div>
                    <div className={"flex flex-col"}>
                        <CardTitle>{review.get("name")}</CardTitle>
                        <CardDescription>{review.get("designation")}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className={"text-xs md:text-sm"}>
                <p>{review.get("review").toString()}</p>
            </CardContent>
        </motion.div>
    );
}
