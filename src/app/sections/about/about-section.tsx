import { Button } from "@/components/ui/button";
import {Bebas_Neue} from "next/font/google";
import React from "react";
import {ArrowUpRight} from "lucide-react";
import EnquireForm from "@/app/sections/forms/enquire-form";
import GetQuoteForm from "@/app/sections/forms/get-quote-form";

const bebasNeue = Bebas_Neue({subsets: ["latin"], weight: "400"})

export default function AboutSection() {
    return (
        <div className={"flex flex-col h-full w-full"}>
            <div className={"flex flex-col-reverse md:flex-row gap-6 h-full items-center"}>
                <div className={"flex flex-col gap-1 mt-18 w-full"}>
                    <h1 className={`text-xl md:text-4xl ${bebasNeue.className}`}>JEFFERSON IMPLEX PVT. LTD.</h1>
                    <p className={"text-sm"}>
                        We at Jefferson Pharma India believe that true hospitality extends beyond the realm of
                        traditional
                        service industries and take pride in being one of the fastest growing pharmaceutical suppliers.
                        Jefferson Pharma India is driven by a profound commitment to transforming the pharmaceutical
                        supply
                        chain. Our mission is to ensure that medications reach those who need them the most, regardless
                        of
                        their location or circumstance.
                    </p>
                    <p className={"text-sm"}>
                        We recognize the challenges faced by healthcare providers, patients, and communities in
                        accessing
                        vital pharmaceutical products. By leveraging innovative solutions and strategic partnerships, we
                        aim
                        to streamline the supply chain, reduce barriers, and enhance the availability of medications.
                        Our vision is to help create a world where everyone has access to the medicines they require,
                        empowering individuals and communities to lead healthier lives. Together, we can bridge the gap
                        in
                        pharmaceutical distribution and make a meaningful impact on global health.
                        Join us on this journey to redefine the future of pharmaceutical accessibility.
                    </p>
                    <div className={"flex gap-8 mt-8 w-min"}>
                        <EnquireForm>
                            Enquire Now
                            <ArrowUpRight/>
                        </EnquireForm>
                        <GetQuoteForm>
                            Get Quote
                            <ArrowUpRight/>
                        </GetQuoteForm>
                    </div>
                </div>
                <div className={"flex flex-col h-[200px] md:h-[80vh] w-full"}>
                    <img src={"https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"}
                         className={"h-full w-full object-cover"} alt={""}/>
                </div>
            </div>
        </div>
    )
}