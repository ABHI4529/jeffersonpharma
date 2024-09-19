import HeroSection from "@/app/sections/home/hero-section";
import HomeInfoSection from "@/app/sections/home/home-info-section";
import HomeProductsSection from "@/app/sections/home/home-products-section";
import ContactSection from "@/app/sections/common/contact-section";
import HomeReviewsSection from "@/app/sections/home/home-reviews-section";
import HomeBlogsSection from "@/app/sections/home/home-blogs-section";


export default function Home() {
    return (
        <div className={"flex flex-col"}>
            <HeroSection/>
            <HomeInfoSection/>
            <HomeProductsSection/>
            <HomeReviewsSection/>
            <HomeBlogsSection/>
            <div id={"contact"}/>
            <ContactSection/>
        </div>
    );
}
