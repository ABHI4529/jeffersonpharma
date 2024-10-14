import logo from "@/assets/logo.png";
import Link from "next/link";

export default function PageFooter() {
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
            label: "Blogs",
            route: "/blogs"
        },
        {
            label: "About",
            route: "/about"
        }
    ]

    return (
        <div className={"flex flex-col md:flex-row justify-between bg-[#f2f2f2]/40 border-t border-[#f2f2f2] gap-3 px-[4%] md:px-[8%] py-[2%] w-full"}>
            <div className={"flex mt-8 md:mt-0 flex-col gap-2 mr-8"}>
                <img src={logo.src} alt={"logo"} className={"h-14 w-min"}/>
                <p className={"text-xs"}>
                    Copyright © 2024 Jefferson Pharma India Pvt. Ltd <br/>
                    All rights reserved
                </p>
            </div>
            <div className={"flex mt-8 md:mt-0 gap-4 md:gap-20 text-sm"}>
                <div className={"flex flex-col  rounded-md gap-2"}>
                    <h1 className={"font-bold"}>Pages</h1>
                    <div className={"flex flex-col gap-2"}>
                        {
                            menu.map((item, index) => (
                                <Link href={""} className={"text-sm text-muted-foreground"}>
                                    {item.label}
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className={"flex flex-col text-sm gap-2"}>
                    <h1 className={"font-bold"}>Socials</h1>
                    <Link href={""} className={"flex text-muted-foreground gap-1 items-center"}>
                        Instagram
                    </Link>
                    <Link href={""} className={"flex gap-1 items-center text-muted-foreground"}>
                        LinkedIn
                    </Link>
                    <Link href={""} className={"flex text-muted-foreground gap-1 items-center"}>
                        FaceBook
                    </Link>
                    <Link href={""} className={"flex gap-1 items-center text-muted-foreground"}>
                        WhatsApp
                    </Link>
                </div>
                <div className={"flex flex-col text-sm gap-2"}>
                    <h1 className={"font-bold"}>Privacy</h1>
                    <Link href={""} className={"flex text-muted-foreground gap-1 items-center"}>
                        Privacy Policy
                    </Link>
                    <Link href={""} className={"flex gap-1 items-center text-muted-foreground"}>
                        Terms & Conditions
                    </Link>
                </div>
            </div>
        </div>
    )
}