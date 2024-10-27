"use client";

import {sampleArcs, World} from "@/components/ui/globe";
import {IoAirplane, IoDocuments, IoGlobe, IoPlanet} from "react-icons/io5";
import {FaTruck} from "react-icons/fa";
import AnimatedCounter from "@/components/ui/animated-counter";
import {useEffect, useRef, useState} from "react";
import globe from "@/assets/globe.svg";
import {GiMedicines} from "react-icons/gi";
import {motion, useInView} from "framer-motion";

export default function HomeExpectationSection() {
    const [supportsWebGL, setSupportsWebGL] = useState<any>(false);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
        setSupportsWebGL(gl);
    }, []);

    const ref = useRef(null);
    const inView = useInView(ref, {once: true});


    return (
        <div
            className={"relative flex bg-dot-black/[0.2] bg-[#f6f6f6] items-center justify-center flex-col py-20 overflow-hidden"}>
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <motion.h1
                initial={{
                    y: "50px",
                    opacity: 0
                }}
                animate={{
                    y: inView ? 0 : "50px",
                    opacity: inView ? 1 : 0
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring"
                }}
                ref={ref}
                className={"text-lg px-[4%] md:px-[8%] md:text-2xl font-bold z-[9]"}>
                A Company You Can Expect From
            </motion.h1>
            <DesktopInfo/>
            <MobileInfo/>
        </div>
    )
}

const DesktopInfo = () => {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true});

    return (
        <div className={"hidden z-[9] px-[4%] md:px-[8%] md:flex gap-12 flex-col w-[80%] mt-8"}>
            <div className={"flex justify-between w-full mt-8"}>
                <motion.div
                    initial={{
                        y: "50px",
                        opacity: 0
                    }}
                    animate={{
                        y: inView ? 0 : "50px",
                        opacity: inView ? 1 : 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        type: "spring"
                    }}
                    ref={ref}
                    className={"flex gap-3 items-center"}>
                    <IoGlobe className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={90}/>
                        <p>Countries Served</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        y: "50px",
                        opacity: 0
                    }}
                    animate={{
                        y: inView ? 0 : "50px",
                        opacity: inView ? 1 : 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.4,
                        type: "spring"
                    }}
                    ref={ref}
                    className={"flex gap-3 items-center"}>
                    <GiMedicines className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={180000}/>
                        <p>Products in Portfolio</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        y: "50px",
                        opacity: 0
                    }}
                    animate={{
                        y: inView ? 0 : "50px",
                        opacity: inView ? 1 : 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 0.8,
                        type: "spring"
                    }}
                    ref={ref}
                    className={"flex gap-3 items-center"}>
                    <IoDocuments className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={6}/>
                        <p>Compliance Certificates</p>
                    </div>
                </motion.div>
            </div>
            <div className={"flex justify-between self-center w-[70%]"}>
                <motion.div
                    initial={{
                        y: "50px",
                        opacity: 0
                    }}
                    animate={{
                        y: inView ? 0 : "50px",
                        opacity: inView ? 1 : 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 1,
                        type: "spring"
                    }}
                    ref={ref}
                    className={"flex gap-3 items-center"}>
                    <IoAirplane className={"text-6xl rotate-[-45deg] text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={60}/>
                        <p>Tons Of Medicines Shipped</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        y: "50px",
                        opacity: 0
                    }}
                    animate={{
                        y: inView ? 0 : "50px",
                        opacity: inView ? 1 : 0
                    }}
                    transition={{
                        type: "spring",
                        duration: 0.5,
                        delay: 1.2
                    }}
                    ref={ref}
                    className={"flex gap-3 items-center w-[300px]"}>
                    <IoDocuments className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={300}/>
                        <p>Affiliation Manufacturers</p>
                    </div>
                </motion.div>
            </div>
            <div className={"flex items-center justify-center w-full"}>
                <motion.div
                    initial={{
                        y: "50px",
                        opacity: 0
                    }}
                    animate={{
                        y: inView ? 0 : "50px",
                        opacity: inView ? 1 : 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: 1.4,
                        type: "spring"
                    }}
                    ref={ref}
                    className={"flex gap-3 items-center w-[300px] md:ml-12"}>
                    <FaTruck className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={2000}/>
                        <p>Completed Deliveries</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

const MobileInfo = () => {
    return (
        <div className={"md:hidden px-[4%] md:px-[8%] flex gap-12 flex-col md:h-[500px] w-full mt-8"}>
            <div className={"flex justify-between w-full z-[9]"}>
                <div className={"flex gap-3 items-center"}>
                    <IoGlobe className={"text-4xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>180</p>
                        <p className={"text-xs"}>Countries Served</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <FaTruck className={"text-4xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>203,385</p>
                        <p className={"text-xs"}>Products Lines Supplied</p>
                    </div>
                </div>
            </div>
            <div className={"flex justify-between w-full z-[9]"}>
                <div className={"flex gap-3 items-center"}>
                    <IoDocuments className={"text-4xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>9</p>
                        <p className={"text-xs"}>Compliance Certificates</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <IoAirplane className={"text-4xl rotate-[-45deg] text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>100</p>
                        <p className={"text-xs"}>Tons Of Medicines Shipped</p>
                    </div>
                </div>
            </div>
            <div className={"flex self-center gap-3 items-center w-[200px]"}>
                <IoDocuments className={"text-4xl text-primary"}/>
                <div className={"flex flex-col"}>
                    <p className={"text-xl font-bold"}>100</p>
                    <p className={"text-xs"}>Lakhs+ Patients / Dose Cycles Catered</p>
                </div>
            </div>
        </div>
    )
}