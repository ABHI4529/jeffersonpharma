"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { CardItem, CardStack } from "@/components/ui/cards-stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeReviewsSection() {
    const [api, setApi] = useState<any>();
    const cardStackRef = useRef<any>(null);

    const reviews = [
        {
            name: "Abhinav Gadekar",
            title: "CEO (CoPower Technologies)",
            content: "Loved the service and the way they completed all my orders on time, with quality and priority."
        },
        {
            name: "Jane Doe",
            title: "CTO (Tech Innovators)",
            content: "Exceptional service! They consistently delivered high-quality work that exceeded our expectations."
        },
        {
            name: "John Smith",
            title: "Founder (StartUp Success)",
            content: "Their attention to detail and commitment to deadlines made our project a resounding success."
        }
    ];

    return (
        <div className="relative px-[4%] bg-grid-black/[0.08] md:px-[8%] pt-20 mb-10 flex flex-col">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <h1 className="text-lg z-[9] md:text-2xl font-bold">Reviews</h1>
            <p className="text-xs z-[9] md:text-sm text-muted-foreground">
                Listen to what our clients say about us.
            </p>
            <div className="flex flex-col h-[230px] w-full items-center mt-20 justify-center">
                <CardStack ref={cardStackRef} api={setApi}>
                    {reviews.map((review, index) => (
                        <CardItem key={index} className="bg-white z-[9] w-full md:w-[600px] h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md">
                            <Card className="border-none shadow-none bg-transparent">
                                <CardHeader>
                                    <div className={'flex gap-3 items-center'}>
                                        <div className={"py-2 px-5 rounded-md bg-primary"}>
                                            <p className={"text-white"}>{index + 1}</p>
                                        </div>
                                        <div className={"flex flex-col"}>
                                            <CardTitle>{review.name}</CardTitle>
                                            <CardDescription>{review.title}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className={"text-sm"}>
                                    <p>{review.content}</p>
                                </CardContent>
                            </Card>
                        </CardItem>
                    ))}
                </CardStack>
            </div>
            <div className="flex items-center z-[9] justify-center gap-3  mb-8">
                <Button variant="link" onClick={() => cardStackRef?.current.prevCard()}>
                    <IoArrowBack />
                </Button>
                <Button variant="link" onClick={() => cardStackRef?.current.nextCard()}>
                    <IoArrowForward />
                </Button>
            </div>
        </div>
    );
}