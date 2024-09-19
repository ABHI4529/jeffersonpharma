import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {WobbleCard} from "@/components/ui/wobble-gallery";


const services = [
    {
        label: "Pharmaceutical Export Solutions",
        description: "Our comprehensive pharmaceutical export solutions cater to clients worldwide, ensuring the efficient and secure delivery of medicines and healthcare products. We specialize in both branded and generic medications, offering tailored services to meet the unique requirements of each market.",
        icon: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        label: "Sourcing & Supply Chain Management",
        description: "We partner with leading manufacturers to source high-quality pharmaceuticals at competitive prices. Our streamlined supply chain ensures timely deliveries, from procurement to distribution, maintaining product integrity and quality at every step.",
        icon: "https://plus.unsplash.com/premium_photo-1672163163579-e5d4aedd26af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        label: "Regulatory Compliance Assistance",
        description: "Navigating the complex global regulatory landscape is key to successful pharmaceutical exports. Our expert team assists with compliance, helping you meet the regulatory standards of various countries, including documentation, certifications, and customs requirements.",
        icon: "https://plus.unsplash.com/premium_photo-1682129816388-22b6b6f489a4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        label: "Cold Chain & Specialty Logistics",
        description: "For temperature-sensitive pharmaceuticals, our cold chain logistics services ensure products remain within required temperature ranges during transport. From vaccines to biologics, we offer secure, controlled delivery services that prioritize product safety.",
        icon: "https://images.unsplash.com/photo-1723864442357-d67090b598eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        label: "Personalized Export Documentation",
        description: "Our personalized documentation services include preparing export licenses, certificates of origin, commercial invoices, and packing lists. We ensure that all paperwork is in order, reducing delays and ensuring smooth customs clearance.",
        icon : "https://plus.unsplash.com/premium_photo-1661313626999-90d230cabf8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        label : "Global Distribution Network",
        description: "With a robust global distribution network, we deliver pharmaceuticals to markets across North America, Europe, Asia, and beyond. Our strategic partnerships and in-depth logistics expertise make us a trusted partner for worldwide pharmaceutical exports.",
        icon : "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

export default function ServicesInfoSection() {
    return (
        <div
            className="min-h-screen w-full dark:bg-black bg-white dark:bg-dots-white/[0.2] bg-dot-black/[0.5] relative flex">
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f5f5f5] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className={"grid grid-cols-3 w-full gap-8 px-[8%] py-20 z-[99]"}>
                {
                    services.map((item, index) => (
                        <Card className={"group transition-all duration-300 hover:scale-[1.02] relative bg-[#f5f5f5] border border-gray-300 shadow-none"}>
                            <img src={item.icon} alt={"img"}
                                 className={"absolute rounded-md object-cover h-full w-full"}/>
                            <div className={"absolute transition-all group-hover:bg-white/70 group-hover:backdrop-blur bg-white/80 jo rounded-md object-cover h-full w-full"}/>
                            <CardHeader className={"absolute"}>
                                <CardTitle>
                                    {item.label}
                                </CardTitle>
                                <CardDescription>
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}