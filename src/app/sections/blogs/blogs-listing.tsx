"use client"
import { Button } from '@/components/ui/button';
import { DatabaseService } from '@/core/database-service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs';

export default function BlogsListing() {
    const [Blogs, setBlogs] = useState<any[]>([]);
    const router = useRouter();

    function getAllBlogs() {
        DatabaseService().getAllBlogs().then((data) => {
            setBlogs(data.docs);
        })
    }

    useEffect(() => {
        getAllBlogs();
    }, [])

    return (
        <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
            <h1 className='text-2xl font-semibold'>Latest News</h1>
            <div className="blogs-container w-full flex flex-wrap gap-8 mt-8">
                {Blogs?.map((e) => {
                    return (
                        <div className={"relative rounded-[30px] h-[250px] md:h-[300px] w-full md:w-auto md:min-w-96 flex flex-col"}>
                            <img
                                src={e.get("coverImage")}
                                className={"absolute w-full h-full object-cover rounded-[30px]"}
                                alt={"news"} />
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
                                    onClick={() => {
                                        router.push("/blogs/" + e.id)
                                    }}
                                >
                                    Read More
                                    <BsArrowUpRight />
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
