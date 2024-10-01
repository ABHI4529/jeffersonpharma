import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import dgft from "@/assets/dgft.png";
import fdaMaha from "@/assets/FDA Maharashtra.png";
import jipl from "@/assets/JIPL - IEC_page-0001.jpg";
import ministry from "@/assets/ministry-for-corporate-affairs-jobs.jpg";

export default function AboutLicensesSection(){
    return(
        <div className={"flex flex-col px-[4%] md:px-[8%] pb-20"}>
            <div className={"grid grid-cols-1 md:grid-cols-3 items-center justify-center"}>
                <div className={"flex flex-col items-center justify-center w-full h-full"}>
                    <img src={dgft.src} className={"h-[200px] w-auto object-contain"} alt={"DGFT"}/>
                </div>
                <div className={"flex flex-col items-center justify-center w-full h-full"}>
                    <img src={fdaMaha.src} className={"h-[200px] w-auto object-contain mt-8"} alt={"DGFT"}/>
                </div>
                <div className={"flex flex-col items-center justify-center w-full h-full"}>
                    <img src={ministry.src} className={"h-[200px] w-auto object-contain"} alt={"DGFT"}/>
                </div>
            </div>
            <div className={"flex flex-col self-center mt-8 md:mt-20 items-center justify-center w-full h-full"}>
                <img src={jipl.src} className={"w-full md:h-[700px] md:w-auto object-contain"} alt={"DGFT"}/>
            </div>
        </div>
    )
}