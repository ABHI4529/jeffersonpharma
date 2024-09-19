"use client";

import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {RiArrowRightUpFill, RiArrowRightUpLine} from "react-icons/ri";
import {PiArrowURightUp} from "react-icons/pi";
import {ArrowUpRight} from "lucide-react";
import {IoArrowBack, IoArrowForward} from "react-icons/io5";
import {BsArrowUpRight} from "react-icons/bs";


export default function HomeBlogsSection() {
    const [api, setApi] = useState<any>();

    return (
        <div className={"px-[4%] md:px-[8%] pt-10 pb-20 flex flex-col"}>
            <h1 className={"text-lg md:text-2xl font-bold"}>Our Blogs</h1>
            <p className={"text-xs md:text-sm text-muted-foreground"}>
                Keep checking out our blogs for new updates.
            </p>

            <Carousel opts={{
                align: "start",
                loop: true,
            }} setApi={(api) => setApi(api)}
                      className={"mt-8"}
            >
                <CarouselContent>
                    {
                        Array.from({length: 6}).map((_, index) => (
                            <CarouselItem className={"md:basis-1/2"}>
                                <div className={"relative rounded-[30px] h-[250px] md:h-[300px] flex flex-col"}>
                                    <img
                                        src={"https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg"}
                                        className={"absolute w-full h-full object-cover rounded-[30px]"}
                                        alt={"news"}/>
                                    <div
                                        className={"absolute justify-between border border-[#D2D2D2] rounded-[30px] flex p-6 flex-col bg-gradient-to-r from-white to-white/60 h-full w-full"}>
                                        <div className={"flex flex-col gap-2"}>
                                            <h1 className={"text-lg md:text-xl font-bold"}>
                                                Blog 1
                                            </h1>
                                            <p className={"text-xs md:text-sm"}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique
                                                tristique pretium. Aliquam nec lectus at risus efficitur gravida id eu
                                                tellus. Quisque efficitur sagittis metus nec sollicitudin. Aenean
                                                condimentum eleifend massa dapibus ullamcorper. Morbi sit amet iaculis
                                                nunc,
                                                quis consectetur tortor.
                                            </p>
                                        </div>
                                        <Button size={'sm'} className={"gap-2 w-32 h-9 md:h-8 self-end"}>
                                            Read More
                                            <BsArrowUpRight/>
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
            <div className={"flex gap-3 items-center justify-center mt-8"}>
                <Button variant={"link"} onClick={() => {
                    if (api) {
                        api.scrollPrev();
                    }
                }}>
                    <IoArrowBack/>
                </Button>
                <Button variant={"link"} onClick={() => {
                    if (api) {
                        api.scrollNext();
                    }
                }}>
                    <IoArrowForward/>
                </Button>
            </div>
        </div>
    )
}