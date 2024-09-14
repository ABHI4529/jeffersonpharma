import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";

interface ItemCardProps {
    label?: string;
    scientificName?: string;
    description?: string;
    img?: string;
    route?: string;
}

export default function CardItem({label, scientificName, description, img, route}: ItemCardProps) {
    return (
        <Card className={"border-[#d2d2d2] shadow-none bg-white rounded-[30px] p-6"}>
            <img src={img} className={"rounded-[22px] w-full h-[200px] object-cover]"} alt={"product"}/>
            <div className={"py-6"}>
                <p className={"text-xs text-muted-foreground"}>{scientificName}</p>
                <h1 className={"text-md md:text-xl font-bold"}>{label}</h1>
                <p className={"text-xs md:text-[14px] text-muted-foreground mt-2"}>
                    {description}
                </p>
            </div>
            <Link href={route ?? "/"} className={buttonVariants({variant: "default", className: "w-full mt-4"})}>
                Know More
            </Link>
        </Card>
    )
}