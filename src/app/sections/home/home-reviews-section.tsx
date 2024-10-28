"use client";

import {useState, useRef, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {IoArrowBack, IoArrowForward} from "react-icons/io5";
import {CardItem, CardStack} from "@/components/ui/cards-stack";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DatabaseService} from "@/core/database-service";
import {AiOutlineLoading} from "react-icons/ai";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import ReviewCard from "@/components/review-card";
import { AnimatedText } from "@/components/animated-text";

export default function HomeReviewsSection() {
    const [api, setApi] = useState<any>();
    const [reviews, setReviews] = useState<any[]>();
    const cardStackRef = useRef<any>(null);

    async function getReviews() {
        const data = await DatabaseService().getAllReviews();
        setReviews(data.docs);
    }

    useEffect(() => {
        getReviews()
    }, []);


    return (
        <div className="relative md:flex-row flex-col px-[4%] bg-grid-black/[0.08] gap-10 justify-between md:px-[8%] pt-20 mb-10 flex">
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            
            <div className={"flex flex-col md:w-[60%] mt-20"}>
                <AnimatedText
                    split=""
                    className="text-lg z-[9] md:text-2xl font-bold"
                    text={"Reviews"}
                />
                <AnimatedText
                    split=" "
                    className="text-xs md:text-sm text-muted-foreground mr-1"
                    text={"Our clients are at the heart of everything we do. We understand that their trust and partnership are" + 
                    " essential to our success, driving us to innovate and deliver high-quality products that meet their" +
                    " needs. We are committed to listening to our clients, understanding their challenges, and" + 
                    " collaborating to find effective solutions. By prioritizing their feedback and insights, we strive to" +
                    " enhance patient outcomes and improve healthcare standards. Together, we are not just advancing" +
                    " medicine; we are fostering a community dedicated to better health and well-being for all."}
                />
            </div>
            <div className={"flex flex-col md:w-[50%]"}>
                {
                    reviews != undefined ?
                        <div className="flex flex-col h-full items-center justify-center">
                            <Carousel opts={{
                                loop: true
                            }} setApi={setApi}
                            plugins={[
                                Autoplay({
                                    delay: 5000
                                })
                            ]}
                            >
                                <CarouselContent>
                                    {reviews.map((review, index) => (
                                        <CarouselItem key={index}
                                                      className="w-full h-[350px] rounded-md">
                                            <ReviewCard
                                                review={review}
                                                index={index}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div> : <div className={"flex flex-col items-center justify-center h-full w-full"}>
                            <AiOutlineLoading className={"animated-spin"}/>
                        </div>
                }
                <div className="flex items-center z-[9] justify-center gap-3  mb-16">
                    <Button variant="link" onClick={() => api.scrollPrev()}>
                        <IoArrowBack/>
                    </Button>
                    <Button variant="link" onClick={() => api.scrollNext()}>
                        <IoArrowForward/>
                    </Button>
                </div>
            </div>
        </div>
    );
}
