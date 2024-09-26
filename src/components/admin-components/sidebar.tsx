"use client";

import logo from "@/assets/logo.svg";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export default function SideBar(){
    const path = usePathname();

    const menu = [
        {
            label : "Products",
            route : "/admin/dashboard/products"
        },
        {
            label : "Blogs",
            route : "/admin/dashboard/blogs"
        }
    ]


    return(
        <div className={"flex items-center gap-20 w-full p-6"}>
            <div className={"flex gap-3 items-center p-3 bg-white rounded-xl"}>
                <img src={logo.src} alt={"img"} className={"h-[30px]"}/>
            </div>
            <div className={"flex gap-3"}>
                {
                    menu.map((e)=>{
                        return(
                            <div className={"flex flex-col gap-3"}>
                                <Link href={e.route} className={buttonVariants({variant : "link",
                                    className: cn(!path.includes(e.route) && "text-muted-foreground")
                                })}>{e.label}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}