"use client";

import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {DatabaseService} from "@/core/database-service";
import {AiOutlineLoading} from "react-icons/ai";
import {BsArrowUpRight} from "react-icons/bs";
import Sidebar from "@/components/admin-components/sidebar";


export default function AdminBlogs(){
    const [blogs, setBlogs] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    function getAllBlogs(){
        DatabaseService().getAllBlogs().then((data)=>{
            setBlogs(data.docs);
            setLoading(false);
        })
    }

    useEffect(()=>{
        getAllBlogs();
    }, [])

    return(
        <div className={"flex flex-col px-8 overflow-auto mb-8"}>
            <Sidebar/>
            <div className={"flex justify-between items-center pb-6 border-b border-b-neutral-100"}>
                <h1 className={"text-3xl font-bold"}>Blogs</h1>
                <div className={"flex gap-3"}>
                    <Button className={"rounded-xl h-11 gap-2"}
                            onClick={() => router.push("/admin/dashboard/admin-blogs/details")}>
                        Add New
                        <PlusIcon/>
                    </Button>
                </div>
            </div>
            {
                loading && blogs == undefined ? (
                    <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                        <AiOutlineLoading className={"animate-spin"}/>
                    </div>
                ) : (
                    <div className={"grid overflow-auto grid-cols-3 gap-3 mt-10"}>
                        {
                            blogs?.map((e)=>{
                                return (
                                    <div className={"relative rounded-[30px] h-[250px] md:h-[300px] flex flex-col"}>
                                        <img
                                            src={e.get("coverImage")}
                                            className={"absolute w-full h-full object-cover rounded-[30px]"}
                                            alt={"news"}/>
                                        <div
                                            className={"absolute justify-between border border-[#D2D2D2] rounded-[30px] flex p-6 flex-col bg-gradient-to-r from-white to-white/60 h-full w-full"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <h1 className={"text-lg md:text-xl font-bold"}>
                                                    {e.get("title")}
                                                </h1>
                                                <p className={"text-xs md:text-sm"}>
                                                    {e.get("description")}
                                                </p>
                                            </div>
                                            <Button size={'sm'} className={"gap-2 w-32 h-9 md:h-8 self-end"}
                                                onClick={()=>{
                                                    router.push("/admin/dashboard/admin-blogs/details?id="+e.id)
                                                }}
                                            >
                                                Edit
                                                <BsArrowUpRight/>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}