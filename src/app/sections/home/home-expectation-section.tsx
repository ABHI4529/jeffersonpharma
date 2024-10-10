"use client";

import {sampleArcs, World} from "@/components/ui/globe";
import {IoAirplane, IoDocuments, IoGlobe, IoPlanet} from "react-icons/io5";
import {FaTruck} from "react-icons/fa";
import AnimatedCounter from "@/components/ui/animated-counter";

const  globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotate: false,
    initialPosition: { lat: 21.1458, lng: 79.0882 },
    autoRotateSpeed: 0
};

export default function HomeExpectationSection() {
    return (
        <div
            className={"relative flex bg-dot-black/[0.2] items-center justify-center flex-col py-20 overflow-hidden"}>
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <h1 className={"text-lg px-[4%] md:px-[8%] md:text-2xl font-bold z-[9]"}>
                A Company You Can Expect From
            </h1>
            <DesktopInfo/>
            <MobileInfo/>
            <div className={"relative flex w-full h-full flex-col"}>
                <div className={"absolute w-full bottom-[-350px] md:bottom-[-480px] h-[600px] md:h-[800px]"}>
                    <World data={sampleArcs} globeConfig={globeConfig}/>
                </div>
            </div>
        </div>
    )
}

const DesktopInfo = () => {
    return (
        <div className={"hidden z-[9] px-[4%] md:px-[8%] md:flex gap-12 flex-col h-[500px] w-[80%] mt-8"}>
            <div className={"flex justify-between w-full mt-8"}>
                <div className={"flex gap-3 items-center"}>
                    <IoGlobe className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={180}/>
                        <p>Countries Served</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <FaTruck className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={203385}/>
                        <p>Products Lines Supplied</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <IoDocuments className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={9}/>
                        <p>Compliance Certificates</p>
                    </div>
                </div>
            </div>
            <div className={"flex justify-between self-center w-[70%]"}>
                <div className={"flex gap-3 items-center"}>
                    <IoAirplane className={"text-6xl rotate-[-45deg] text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={100}/>
                        <p>Tons Of Medicines Shipped</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center w-[300px]"}>
                    <IoDocuments className={"text-6xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <AnimatedCounter from={0} to={100}/>
                        <p>Lakhs+ Patients / Dose Cycles Catered</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MobileInfo = () => {
    return (
        <div className={"md:hidden px-[4%] md:px-[8%] flex gap-12 flex-col h-[500px] w-full mt-8"}>
            <div className={"flex justify-between w-full z-[9]"}>
                <div className={"flex gap-3 items-center"}>
                    <IoGlobe className={"text-4xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>180</p>
                        <p className={"text-xs"}>Countries Served</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <FaTruck className={"text-4xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>203,385</p>
                        <p className={"text-xs"}>Products Lines Supplied</p>
                    </div>
                </div>
            </div>
            <div className={"flex justify-between w-full z-[9]"}>
                <div className={"flex gap-3 items-center"}>
                    <IoDocuments className={"text-4xl text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>9</p>
                        <p className={"text-xs"}>Compliance Certificates</p>
                    </div>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <IoAirplane className={"text-4xl rotate-[-45deg] text-primary"}/>
                    <div className={"flex flex-col"}>
                        <p className={"text-xl font-bold"}>100</p>
                        <p className={"text-xs"}>Tons Of Medicines Shipped</p>
                    </div>
                </div>
            </div>
            <div className={"flex self-center gap-3 items-center w-[200px]"}>
                <IoDocuments className={"text-4xl text-primary"}/>
                <div className={"flex flex-col"}>
                    <p className={"text-xl font-bold"}>100</p>
                    <p className={"text-xs"}>Lakhs+ Patients / Dose Cycles Catered</p>
                </div>
            </div>
        </div>
    )
}