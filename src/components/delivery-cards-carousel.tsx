"use client";

import {Carousel, CarouselContent, CarouselItem} from "./ui/carousel";
import {IoArrowBack, IoArrowForward, IoCall, IoDocumentAttach, IoDocumentText, IoReceipt} from "react-icons/io5";
import {Button} from "@/components/ui/button";
import {IoIosCall} from "react-icons/io";
import {useState} from "react";


export default function DeliveryCardsCarousel() {
    const [api, setApi] = useState<any>();

    return (
        <div className={"flex flex-col gap-3 h-full"}>
            <div className={"flex flex-col h-full"}>
                <Carousel
                    opts={{
                        loop: true,
                    }}
                    setApi={setApi}>
                    <CarouselContent>
                        <CarouselItem>
                            <div
                                className={"relative flex h-[160px] gap-3 flex-col w-full bg-[#f8f8f8] p-5 rounded-md"}>
                                <p className={'absolute right-5 text-9xl text-primary/10'}>01</p>
                                <div className={"flex text-primary items-center gap-2"}>
                                    <IoDocumentAttach/>
                                    <p className={"text-sm font-medium"}>Submit a Request</p>
                                </div>
                                <p className={"text-xs text-muted-foreground"}>
                                    You can fill in a request for your
                                    medicine through the form
                                    provided. You can access the
                                    form by clicking on the 'Get Price'
                                    button.
                                </p>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div
                                className={"relative flex h-[160px] gap-3 flex-col w-full bg-[#f8f8f8] p-5 rounded-md"}>
                                <p className={'absolute right-5 text-9xl text-primary/10'}>02</p>
                                <div className={"flex text-primary items-center gap-2"}>
                                    <IoIosCall/>
                                    <p className={"text-sm font-medium"}>
                                        We'll Get in Touch
                                    </p>
                                </div>
                                <p className={"text-xs text-muted-foreground"}>
                                    Once we review your request,
                                    we'll send you an estimated price
                                    for the medicine within 2-5 days.
                                </p>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className={"relative flex h-[160px] gap-3 flex-col bg-[#f8f8f8] p-5 rounded-md"}>
                                <p className={'absolute right-5 text-9xl text-primary/10'}>03</p>
                                <div className={"flex text-primary items-center gap-2"}>
                                    <IoReceipt/>
                                    <p className={"text-sm font-medium"}>
                                        Confirmation & Payments
                                    </p>
                                </div>
                                <p className={"text-xs text-muted-foreground"}>
                                    You can fill in a request for your
                                    medicine through the form
                                    provided. You can access the
                                    form by clicking on the 'Get Price'
                                    button.
                                </p>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className={"flex gap-2 items-center justify-center"}>
                <Button size={"sm"} variant={"link"} onClick={() => {
                    if (api) {
                        api.scrollPrev();
                    }
                }}>
                    <IoArrowBack/>
                </Button>
                <Button size={"sm"} variant={"link"} onClick={() => {
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