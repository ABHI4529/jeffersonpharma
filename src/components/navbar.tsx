"use client";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {IoMenu} from "react-icons/io5";
import {useEffect, useState} from "react";


export default function NavBar() {
    const path = usePathname();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
            label: "Our Company",
            route: "/company"
        },
        {
            label: "About",
            route: "/about"
        }
    ]


    return (
        <nav
            className={cn(
                "fixed z-[99] left-0 top-0 right-0 duration-500 transition-all items-center flex justify-between px-[4%] md:px-[8%] py-6",
                isScrolled ? "backdrop-blur-2xl bg-white/50" : ""
            )}
        >
            <div className={"flex w-[200px]"}>
                <Image src={logo} alt={"logo"} height={30}/>
            </div>
            <div className={"hidden md:flex md:flex-row gap-6"}>
                {
                    menu.map((item) => (
                        <Link href={item.route} key={item.route}
                              className="group cursor-pointer flex px-2 py-2 flex-col items-center justify-center">
                            <p className="text-sm font-medium">{item.label}</p>
                            <span className={cn(
                                "w-0 h-0.5 transition-all bg-primary rounded-full group-hover:w-4",
                                path.includes(item.route) ? "w-6" : ""
                            )}/>
                        </Link>
                    ))
                }
            </div>
            <div className={"w-[200px] hidden md:flex justify-end"}>
                <Button className={"w-[150px]"}>
                    Contact us
                </Button>
            </div>
            <div className={"flex md:hidden"}>
                <Sheet>
                    <SheetTrigger>
                        <Button variant={"ghost"} className={"bg-neutral-600/10 text-primary shadow-none"}>
                            <IoMenu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className={"z-[999] bg-white/50 backdrop-blur-2xl"}>
                        {
                            menu.map((item) => (
                                <Link href={item.route} key={item.route}
                                      className="group cursor-pointer flex px-2 py-2 flex-col items-center justify-center">
                                    <p className="text-sm font-medium">{item.label}</p>
                                    <span className={cn(
                                        "w-0 h-0.5 transition-all bg-primary rounded-full group-hover:w-4",
                                        path.includes(item.route) ? "w-6" : ""
                                    )}/>
                                </Link>
                            ))
                        }
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}