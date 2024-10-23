"use client";


import ContactForm from "@/components/forms/contact-form";
import {IoArrowBack, IoCaretBack} from "react-icons/io5";
import EnquireForm from "@/app/sections/forms/enquire-form";
import {ArrowUpRight} from "lucide-react";
import GetQuoteForm from "@/app/sections/forms/get-quote-form";
import React from "react";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {motion} from "framer-motion";


export default function ContactHeroSection() {


    return (
        <motion.div
            initial={{
                x: "100%",
                opacity: 0
            }}
            animate={{
                x: "0%",
                opacity: 1
            }}
            transition={{
                type : 'spring',
                duration: 0.8
            }}
            className={"flex flex-col py-[4%] md:flex-row md:justify-between gap-8 items-center min-h-screen px-[4%] md:px-[8%]"}>
            <div className={"flex flex-col gap-2 w-full"}>
                <div className={"flex flex-col"}>
                    <Link href={"/"} className={"flex gap-2 items-center text-xs md:text-sm text-primary"}>
                        <IoArrowBack/>
                        <p>Home</p>
                    </Link>
                    <h1 className={"text-xl md:text-5xl font-bold"}>Contact Us</h1>
                </div>
                <p className={"text-muted-foreground text-sm md:text-md"}>
                    We are always looking for ways to improve our products and services. Contact us and let us know how
                    we can help you.
                </p>
                <div className={"flex flex-col w-min md:w-auto md:flex-row gap-2 mt-4"}>
                    <div className={"px-4 py-1 bg-neutral-300 rounded-full text-xs"}>
                        <p>enquiry@jeffersonpharmaindia.com</p>
                    </div>
                    <div className={"px-4 py-1 bg-neutral-300 rounded-full text-xs"}>
                        <p>+91 – 9373283509 / 9270190596</p>
                    </div>
                </div>
                <div className={"flex gap-4 mt-8 w-min"}>
                    <Link href={"/enquire"} className={buttonVariants({className: "w-[150px] gap-2"})}>
                        Enquire Now
                        <ArrowUpRight/>
                    </Link>
                    <Link href={"/quote"}
                          className={buttonVariants({variant: "outline", className: "w-[150px] gap-2"})}>
                        Get Quote
                        <ArrowUpRight/>
                    </Link>
                </div>
            </div>
            <div className={"flex flex-col w-full md:border-l md:p-6"}>
                <ContactForm/>
            </div>
        </motion.div>
    )
}