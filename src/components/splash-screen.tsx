"use client";

import {motion} from "framer-motion";
import logo from "@/assets/logo.png";


export default function SplashScreen(){
    return (
        <motion.div
            initial={{
                height: "100vh",
                opacity: 1,
            }}
            animate={{
                height: "0vw",
            }}
            transition={{
                duration: 0.8,
                ease: "easeInOut"
            }}
            className={"fixed flex items-center left-0 right-0 top-0 bottom-0 justify-center overflow-hidden w-screen bg-white z-[999]"}
        >
            <img src={logo.src} alt={"logo"} className={"w-[400px]"}/>
        </motion.div>
    )
}