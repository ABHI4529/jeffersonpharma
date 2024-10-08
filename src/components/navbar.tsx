"use client";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import EnquireForm from "@/app/sections/forms/enquire-form";

interface props {
    index: number;
}


export default function NavBar({ index }: props) {
    const path = usePathname();
    const [selected, setSelected] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                setIsScrolled(window.scrollY >= 10);
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const menu = [
        {
            label: "Home",
            route: "/"
        },
        {
            label: "Services",
            route: "/services"
        },
        {
            label: "Products",
            route: "/products"
        },
        {
            label: "News",
            route: "/blogs"
        },
        {
            label: "About",
            route: "/about"
        }
    ]


    return (
        <div
            className={cn(
                "fixed z-[99] left-0 top-0 right-0 duration-500 transition-all items-center flex justify-between px-[4%] md:px-[8%] py-6",
                isScrolled ? "backdrop-blur-2xl bg-white/50" : ""
            )}
        >
            <div className={"flex w-[200px]"}>
                <Image src={logo} alt={"logo"} height={30} />
            </div>
            <div className={"hidden md:flex md:flex-row gap-6"}>
                {
                    menu.map((item, i) => (
                        <Link href={item.route} key={item.route}
                            className="group cursor-pointer flex px-2 py-2 flex-col items-center justify-center">
                            <p className="text-sm font-medium">{item.label}</p>
                            <span className={cn(
                                "w-0 h-0.5 transition-all bg-primary rounded-full group-hover:w-4",
                                index === i ? "w-6" : ""
                            )} />
                        </Link>
                    ))
                }
            </div>
            <div className={"w-[200px] hidden md:flex justify-end"}>
                <EnquireForm>
                    Contact Us
                </EnquireForm>
            </div>
            <div className={"flex md:hidden"}>
                <Sheet>
                    <SheetTrigger className="bg-neutral-600/10 p-2 rounded text-primary shadow-none">
                        <IoMenu />
                    </SheetTrigger>
                    <SheetContent className={"z-[999] bg-white backdrop-blur-2xl"}>
                        {
                            menu.map((item, i) => (
                                <Link href={item.route} key={item.route}
                                      className="group cursor-pointer flex px-2 py-2 flex-col items-center justify-center">
                                    <p className="text-sm font-medium">{item.label}</p>
                                    <span className={cn(
                                        "w-0 h-0.5 transition-all bg-primary rounded-full group-hover:w-4",
                                        index === i ? "w-6" : ""
                                    )} />
                                </Link>
                            ))
                        }
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}