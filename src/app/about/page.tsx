import NavBar from '@/components/navbar'
import PageFooter from '@/components/page-footer'
import React from 'react'
import AboutSection from '../sections/about/about-section'
import AboutAddressSection from "@/app/sections/about/about-address-section";
import ContactSection from "@/app/sections/common/contact-section";
import AboutLicensesSection from "@/app/sections/about/about-licenses-section";

export default function AboutPage() {
    return (
        <div className={"flex flex-col"}>
            <NavBar index={4} />
            <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
                <AboutSection/>
            </div>
            <AboutAddressSection/>
            <AboutLicensesSection/>
            <ContactSection/>
            <PageFooter />
        </div>
    )
}
