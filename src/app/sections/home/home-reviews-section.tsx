"use client";

import {useState, useRef, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { CardItem, CardStack } from "@/components/ui/cards-stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {DatabaseService} from "@/core/database-service";
import {AiOutlineLoading} from "react-icons/ai";

export default function HomeReviewsSection() {
    const [api, setApi] = useState<any>();
    const [reviews, setReviews] = useState<any[]>();
    const cardStackRef = useRef<any>(null);

    async function getReviews() {
        const data = await DatabaseService().getAllReviews();
        setReviews(data.docs);
    }

    useEffect(()=>{
        getReviews()
    }, [])

    return (
        <div className="relative px-[4%] bg-grid-black/[0.08] md:px-[8%] pt-20 mb-10 flex flex-col">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <h1 className="text-lg z-[9] md:text-2xl font-bold">Reviews</h1>
            <p className="text-xs z-[9] md:text-sm text-muted-foreground">
                Listen to what our clients say about us.
            </p>
            {
                reviews != undefined ?
                    <div className="flex flex-col h-[230px] w-full items-center mt-20 justify-center">
                        <CardStack ref={cardStackRef} api={setApi}>
                            {reviews.map((review, index) => (
                                <CardItem key={index}
                                          className="bg-white z-[9] w-full md:w-[600px] h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md">
                                    <Card className="border-none shadow-none bg-transparent">
                                        <CardHeader>
                                            <div className={'flex gap-3 items-center'}>
                                                <div className={"py-2 px-5 rounded-md bg-primary"}>
                                                    <p className={"text-white"}>{index + 1}</p>
                                                </div>
                                                <div className={"flex flex-col"}>
                                                    <CardTitle>{review.get("name")}</CardTitle>
                                                    <CardDescription>{review.get("designation")}</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className={"text-xs md:text-sm"}>
                                            <p>{review.get("review").toString().substring(0, 250)}...</p>
                                        </CardContent>
                                    </Card>
                                </CardItem>
                            ))}
                        </CardStack>
                    </div> : <div className={"flex flex-col items-center justify-center h-full w-full"}>
                        <AiOutlineLoading className={"animated-spin"}/>
                    </div>
            }
            <div className="flex items-center z-[9] justify-center gap-3  mb-16">
                <Button variant="link" onClick={() => cardStackRef?.current.prevCard()}>
                    <IoArrowBack/>
                </Button>
                <Button variant="link" onClick={() => cardStackRef?.current.nextCard()}>
                    <IoArrowForward/>
                </Button>
            </div>
        </div>
    );
}