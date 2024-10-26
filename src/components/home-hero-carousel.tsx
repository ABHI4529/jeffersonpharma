"use client";

import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import carousel_1 from "@/assets/carousel_1.png";
import carousel_2 from "@/assets/carousel_2.png";
import mobile_1 from "@/assets/mobile_carousel_1.jpg";
import mobile_2 from "@/assets/mobile_carousel_2.jpg";
const carousels = [carousel_1,];
const mobile = [mobile_1];

export default function HomeHeroCarousel(){
    return (
        <div className={"absolute w-full h-full"}>
            <Carousel className="absolute hidden md:block w-full h-full"
                      opts={{
                          loop: true,
                          axis: "y",
                      }}
                      plugins={[
                          Autoplay({
                              delay: 5000   
                          })
                      ]}
            >
                <CarouselContent>
                    {carousels.map((url, index) => (
                        <CarouselItem key={index} className="w-full h-screen">
                            <img
                                src={url.src}
                                alt={`Carousel image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Carousel className="absolute md:hidden w-full h-full"
                      opts={{
                          loop: true,
                          axis: "y",
                      }}
                      plugins={[
                          Autoplay({
                              delay: 5000
                          })
                      ]}
            >
                <CarouselContent>
                    {mobile.map((url, index) => (
                        <CarouselItem key={index} className="w-full h-screen">
                            <img
                                src={url.src}
                                alt={`Carousel image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}