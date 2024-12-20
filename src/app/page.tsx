import HeroSection from "@/app/sections/home/hero-section";
import HomeInfoSection from "@/app/sections/home/home-info-section";
import HomeProductsSection from "@/app/sections/home/home-products-section";
import ContactSection from "@/app/sections/common/contact-section";
import HomeReviewsSection from "@/app/sections/home/home-reviews-section";
import HomeBlogsSection from "@/app/sections/home/home-blogs-section";
import dynamic from "next/dynamic";
import NavBar from "@/components/navbar";
import PageFooter from "@/components/page-footer";
import HomeVissionSection from "@/app/sections/home/home-vission-section";
import SplashScreen from "@/components/splash-screen";

const HomeExpectationSection = dynamic(() => import ("@/app/sections/home/home-expectation-section"), {ssr: false});


export default function Home() {
    return (
        <div className={"flex flex-col"}>
            <NavBar index={0}/>
            <HeroSection/>
            <HomeVissionSection/>
            <HomeExpectationSection/>
            <HomeProductsSection/>
            <HomeReviewsSection/>
            <HomeBlogsSection/>
            <ContactSection/>
            <PageFooter/>
        </div>
    );
}
