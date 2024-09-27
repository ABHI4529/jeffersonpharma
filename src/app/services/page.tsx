import {AuroraBackground} from "@/components/ui/aurora-background";
import Head from "next/head";
import ServicesHeroSection from "@/app/sections/services/services-hero-section";
import ServicesInfoSection from "@/app/sections/services/services-info-section";
import NavBar from "@/components/navbar";
import PageFooter from "@/components/page-footer";

export const metadata = {
    title: "Jefferson Pharma Services",
    description: "Revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical solutions worldwide.",
};

export default function Services() {
    return (
        <div className={"flex flex-col min-h-screen"}>
            <NavBar index={1}/>
            <ServicesHeroSection/>
            <ServicesInfoSection/>
            <PageFooter/>
        </div>
    )
}