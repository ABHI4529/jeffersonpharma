import home_deliver from "@/assets/home-deliver.png";
import home_coin from "@/assets/home-coint.png";
import home_contract from '@/assets/home_contract.png';
import Image from "next/image";

export default function HomeInfoSection() {
    return (
        <div className={"flex flex-col px-[4%] md:px-[8%] py-[8%] min-h-screen gap-20"}>
            <div className={"flex flex-col-reverse md:flex-row justify-between items-center gap-8"}>
                <div className={"flex flex-col w-full md:w-1/2"}>
                    <h1 className={"text-lg md:text-2xl font-bold"}>Services That We Deliver</h1>
                    <p className={"text-xs md:text-[16px] md:leading-5 text-muted-foreground"}>With over two decades of experience as a leading
                        pharmaceuticals distributor, we take pride in
                        taking care of the fine details so you don't have to. Our goal is to source, distribute and
                        deliver pharmaceutical products to everyone who needs them most, and all without any of the
                        unforeseen delays that you simply cannot afford. As a result, we've built a reputation as a
                        fast, flexible and fair provider who always has your best interests at heart.</p>
                </div>
                <div className={"flex justify-center md:justify-end w-full md:w-1/2 h-auto"}>
                    <img src={home_deliver.src} alt={"home deliver"} className={"w-auto h-[150px] md:h-full md:w-[80%] object-contain"}/>
                </div>
            </div>
            <div className={"flex flex-col md:flex-row justify-between items-center gap-8"}>
                <div className={"flex justify-center md:justify-start w-full md:w-1/2 h-auto"}>
                    <img src={home_coin.src} alt={"home deliver"} className={"w-auto h-[150px] md:h-full md:w-[50%] object-contain"}/>
                </div>
                <div className={"flex flex-col w-full md:w-1/2"}>
                    <h1 className={"text-lg md:text-2xl font-bold"}>Validated Cold Chain Shipment</h1>
                    <p className={"text-xs md:text-[16px] md:leading-5 text-muted-foreground"}>With over two decades of experience as a leading
                        With shifting of pharma industry from synthetic molecules to
                        biologic, proteins etc. temperature maintenance has become
                        as important as the drug itself! According to the WHO - Good
                        Distribution Practices, certain medicines need to be
                        manufactured transported and stored at very
                    </p>
                </div>
            </div>
            <div className={"flex flex-col-reverse md:flex-row justify-between items-center gap-8"}>
                <div className={"flex flex-col w-full md:w-1/2"}>
                    <h1 className={"text-lg md:text-2xl font-bold"}>Pharmaceutical Contract</h1>
                    <p className={"text-xs md:text-[16px] md:leading-5 text-muted-foreground"}>GNH Provides Contract Manufacturing services for: Generic
                        Medicines with following quality levels: US FDA / UK MHRA
                        approved facilities WHO GMP approved facilities WHO Pre
                        qualified approved facilities Vaccine manufacturing Neutral
                        Cable manufacturing A contract manufacturing company
                        serves as a business
                    </p>
                </div>
                <div className={"flex justify-center md:justify-end w-1-2 h-auto"}>
                    <img src={home_contract.src} alt={"home deliver"} className={"w-auto h-[150px] md:h-full md:w-[80%] object-contain"}/>
                </div>
            </div>
        </div>
    )
}