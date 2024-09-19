import home_deliver from "@/assets/home-deliver.png";
import home_coin from "@/assets/home-coint.png";
import home_contract from '@/assets/home-contract.png';
import Image from "next/image";

export default function HomeInfoSection() {
    return (
        <div className={"flex flex-col px-[4%] md:px-[8%] py-[8%] min-h-screen gap-20"}>
            <div className={"flex flex-col-reverse md:flex-row justify-between items-center gap-8"}>
                <div className={"flex flex-col w-full gap-2 md:w-1/2"}>
                    <h1 className={"text-lg md:text-2xl font-bold"}>Services That We Deliver</h1>
                    <p className={"text-xs md:text-[16px] md:leading-5 text-muted-foreground"}>
                        With the help of our highly experienced team of varied individual, carrying years of experience
                        in the field of Procurement, Logistics, Drug Study and Sales. We are able to provide end to end
                        pharmaceutical solutions to the ones in need. Contract Manufacturing, Patient Supply, Laboratory
                        / Clinic Supply, Parallel Export
                    </p>
                </div>
                <div className={"flex justify-center md:justify-end w-full md:w-1/2 h-auto"}>
                    <img src={home_deliver.src} alt={"home deliver"}
                         className={"w-auto h-[150px] md:h-full md:w-[80%] object-contain"}/>
                </div>
            </div>
            <div className={"flex flex-col-reverse md:flex-row justify-between items-center gap-8"}>
                <div className={"flex justify-center md:justify-end w-1-2 h-auto"}>
                    <img src={home_contract.src} alt={"home deliver"}
                         className={"w-auto h-[150px] md:h-full md:w-[80%] object-contain"}/>
                </div>
                <div className={"flex flex-col gap-2 w-full md:w-1/2"}>
                    <h1 className={"text-lg md:text-2xl font-bold"}>SEVA</h1>
                    <p className={"text-xs md:text-[16px] md:leading-5 text-muted-foreground"}>
                        Since our inception, promoting Indian-manufactured goods and upholding the tradition of SEVA
                        (selfless service) has been our core mission. During the COVID-19 pandemic, our team played a
                        key role in addressing challenges faced by NGOs working on the front lines, ensuring timely
                        delivery of essential medicines and supplies. We remain committed to serving both the community
                        and the nation through our work.
                    </p>
                </div>
            </div>
        </div>
    )
}