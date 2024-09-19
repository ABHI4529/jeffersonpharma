import {AuroraBackground} from "@/components/ui/aurora-background";
import Head from "next/head";
import ServicesHeroSection from "@/app/sections/services/services-hero-section";
import ServicesInfoSection from "@/app/sections/services/services-info-section";

export const metadata = {
    title: "Jefferson Pharma Services",
    description: "Revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical solutions worldwide.",
};

export default function Services() {
    return (
        <div className={"flex flex-col min-h-screen"}>
            <ServicesHeroSection/>
            <ServicesInfoSection/>
        </div>
    )
}