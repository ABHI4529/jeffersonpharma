"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import animation from "@/assets/animation.svg";

export default function HomeVisionSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="relative overflow-hidden flex flex-col px-4 md:px-[8%] py-[8%] gap-20">
            <img className={"absolute left-0 right-0 top-0 object-cover h-[600px] w-[200%]"} src={animation.src} alt={"animation"}/>
            <motion.div
                initial={{
                    left: "0%",
                }}

                animate={{
                    left: isInView ? "100%" : "0%",
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                }}
                className="absolute w-full h-full left-0 right-0 top-0 bg-white">

            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                transition={{duration: 0.8, delay: 0.5}}
                className="flex z-[9] gap-3 md:flex-row flex-col justify-between [border-image:linear-gradient(to_right,transparent,rgb(115_115_115),transparent)_1] border-y"
            >
                <motion.div
                    initial={{opacity: 0}}
                    animate={isInView ? {opacity: 1} : {opacity: 0}}
                    transition={{duration: 0.8, delay: 0.7}}
                    className="flex flex-col py-10 px-8 gap-3 justify-center items-center w-full [border-image:linear-gradient(to_right,transparent,rgb(115_115_115)_100%)_1] border-b md:border-b-0 md:border-r"
                >
                    <h1 className="font-bold text-xl text-gray-900">Mission</h1>
                    <p className="text-center text-sm text-gray-800">
                        At Jefferson Pharma India, our mission is to improve global health by providing high-quality
                        medications and <strong>healthcare solutions</strong>. We strive to make essential medicines
                        accessible to all,
                        ensuring that quality healthcare is within reach for everyone.
                    </p>
                </motion.div>
                <motion.div
                    initial={{opacity: 0}}
                    animate={isInView ? {opacity: 1} : {opacity: 0}}
                    transition={{duration: 0.8, delay: 0.9}}
                    className="flex justify-center px-8 py-10 items-center flex-col gap-3 w-full [border-image:linear-gradient(to_right,transparent,rgb(115_115_115)_100%)_1] border-b md:border-b-0 md:border-r"
                >
                    <h1 className="font-bold text-xl text-gray-900">Vision</h1>
                    <p className="text-center text-sm text-gray-800">
                        We envision a world where everyone has access to the medications they need. By fostering
                        partnerships with <strong>pharmaceutical manufacturers</strong> and healthcare providers, we aim
                        to bridge the
                        gap in <strong>pharmaceutical distribution</strong>, ensuring timely delivery and reliability.
                    </p>
                </motion.div>
                <motion.div
                    initial={{opacity: 0}}
                    animate={isInView ? {opacity: 1} : {opacity: 0}}
                    transition={{duration: 0.8, delay: 1.1}}
                    className="flex flex-col py-10 items-center justify-center gap-3 w-full"
                >
                    <h1 className="font-bold text-xl text-gray-900">Quality Assurance</h1>
                    <p className="text-center text-sm text-gray-800">
                        Quality is at the heart of our operations. We adhere to strict international standards and
                        regulations, ensuring that all products meet the highest safety and efficacy criteria. Our team
                        is dedicated to continuous improvement and innovation in our processes. <br/>
                        <Link href="/" className="hover:underline text-primary">Learn more here</Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}