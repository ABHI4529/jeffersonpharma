import HeroSection from "@/app/sections/home/hero-section";
import HomeInfoSection from "@/app/sections/home/home-info-section";
import HomeProductsSection from "@/app/sections/home/home-products-section";
import HomeNewsSection from "@/app/sections/home/home-news-section";


export default function Home() {
    return (
        <div className={"flex flex-col"}>
            <HeroSection/>
            <HomeInfoSection/>
            <HomeProductsSection/>
            <HomeNewsSection/>
        </div>
    );
}
