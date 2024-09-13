"use client";

import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import carousel_1 from "@/assets/carousel_1.png";
import carousel_2 from "@/assets/carousel_2.png";
const carousels = [carousel_1, carousel_2];

export default function HomeHeroCarousel(){
    return (
        <Carousel className="absolute w-full h-full"
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
    )
}