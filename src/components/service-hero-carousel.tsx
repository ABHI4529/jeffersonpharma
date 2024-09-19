'use client';

import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import React from "react";
import { Button } from "./ui/button";
import {IoArrowBack, IoArrowForward} from "react-icons/io5";


const carousel = [
    "https://lh3.googleusercontent.com/p/AF1QipPiQ4AQ6vszpcL617On-4aN2ZTKWFC2zlP39mO2=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipOCLudpGHh6WHjTu6gSRXinBwiepQqoPDmrLA05=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipMyFyK7dFlAfBoPHpQ5m8TuwqRc63zguv5UQT0K=s1360-w1360-h1020"
]


export default function ServicesHeroCarousel() {
    return (
        <div className={"flex flex-col gap-3"}>
            <Carousel className={"h-full"}>
                <CarouselContent className={"h-full"}>
                    {carousel.map((url, index) => (
                        <CarouselItem className={"h-[470px]"}>
                            <img key={index} src={url} alt={'image'}
                                 className={"w-full rounded-xl h-full object-cover"}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className={'flex gap-3 justify-end'}>
                <Button variant={"outline"} className={"rounded-full text-gray-400 bg-white border border-gray-300"} size={"sm"}>
                    <IoArrowBack/>
                </Button>
                <Button variant={"outline"} className={"rounded-full text-gray-400 bg-white border border-gray-300"} size={"sm"}>
                    <IoArrowForward/>
                </Button>
            </div>
        </div>
    )
}