"use client";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import Link from "next/link";


export default function NavBar(){
    const path = usePathname();

    const menu = [
        {
            label : "Home",
            route : "/"
        },
        {
            label : "Services",
            route : "/services"
        },
        {
            label : "Products",
            route : "/products"
        },
        {
            label : "Our Company",
            route : "/company"
        },
        {
            label : "About",
            route : "/about"
        }
    ]



    return (
        <nav className={"fixed z-[99] left-0 top-0 right-0 items-center flex justify-between px-[4%] py-6 bg-white/20 backdrop-blur-2xl"}>
            <div className={"flex w-[200px]"}>
                <Image src={logo} alt={"logo"} height={30}/>
            </div>
            <div className={"flex gap-6"}>
                {
                    menu.map((item) => (
                        <Link href={item.route} key={item.route} className="group cursor-pointer flex px-2 py-2 flex-col items-center justify-center">
                            <p className="text-sm font-medium">{item.label}</p>
                            <span className={cn(
                                "w-0 h-0.5 transition-all bg-primary rounded-full group-hover:w-4",
                                path.includes(item.route) ? "w-6" : ""
                            )}/>
                        </Link>
                    ))
                }
            </div>
            <div className={"w-[200px] flex justify-end"}>
                <Button className={"w-[150px]"}>
                    Contact us
                </Button>
            </div>
        </nav>
    )
}