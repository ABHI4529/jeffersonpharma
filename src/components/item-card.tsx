import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";

interface ItemCardProps {
    label?: string;
    scientificName?: string;
    packSize?: string;
    strength?: string;
    manufacturer?: string;
    img?: string;
    route?: string;
}

export default function CardItem({label, scientificName, strength, packSize, manufacturer, img, route}: ItemCardProps) {
    return (
        <Card className={"border-[#d2d2d2] shadow-none bg-white rounded-[30px] p-6"}>
            <img src={img} className={"rounded-[22px] w-full h-[200px] object-cover"} alt={"product"}/>
            <div className={"py-3"}>
                <p className={"text-xs text-muted-foreground"}>{scientificName}</p>
                <h1 className={"text-md md:text-xl font-bold"}>{label}</h1>
                <div className={"flex flex-col"}>
                    <p className={"text-xs text-muted-foreground"}>Pack Size : {packSize}</p>
                    <p className={"text-xs text-muted-foreground"}>Strength : {strength}</p>
                    <p className={"text-xs text-muted-foreground"}>Manufacturer :  {manufacturer}</p>
                </div>
            </div>
            <Link href={route ?? "/"} className={buttonVariants({variant: "default", className: "w-full mt-4"})}>
                Know More
            </Link>
        </Card>
    )
}