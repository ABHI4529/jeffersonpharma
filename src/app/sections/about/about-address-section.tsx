import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


export default function AboutAddressSection() {
    return (
        <div className={"relative flex-col md:flex-row bg-grid-black/10 px-[4%] md:px-[8%] flex  gap-3 mb-20 py-20"}>
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <Card className={"w-full z-[9]"}>
                <CardHeader>
                    <CardTitle>
                        Registered Office
                    </CardTitle>
                    <CardDescription>
                        F-6, NDV Classic, Pension Nagar, Nagpur – 440013
                    </CardDescription>
                </CardHeader>
                <CardContent className={"h-[300px]"}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1683.8178666452145!2d79.06071949781186!3d21.180437705979173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1b80af09e5f%3A0xf6cea95b1c233178!2sNDV%20Classic%20Appt!5e1!3m2!1sen!2sin!4v1728371323478!5m2!1sen!2sin"
                        className={"w-full h-full rounded-md"} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </CardContent>
            </Card>
            <Card className={"w-full z-[9]"}>
                <CardHeader>
                    <CardTitle>
                        Office 2
                    </CardTitle>
                    <CardDescription>
                        S-2 Shivanjali Apartment, Friends Colony, Nagpur - 440013
                    </CardDescription>
                </CardHeader>
                <CardContent className={"h-[300px]"}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13466.985613921748!2d79.04436!3d21.177222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1b786da65f5%3A0xb6f0ececd94d9d9c!2sShivanjali!5e1!3m2!1sen!2sin!4v1728371369084!5m2!1sen!2sin"
                        className={"h-full w-full rounded-md"} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </CardContent>
            </Card>
            <Card className={"w-full z-[9]"}>
                <CardHeader>
                    <CardTitle>
                        Office 3
                    </CardTitle>
                    <CardDescription>
                        S-30, Ginger Square, Jaripatka, Nagpur - 440014
                    </CardDescription>
                </CardHeader>
                <CardContent className={"h-[300px]"}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d594.5981163943785!2d79.08872051739084!3d21.177184793413176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1233b3325cb%3A0x529bb4d3ad262a6!2sGinger%20Mall!5e1!3m2!1sen!2sin!4v1727773784640!5m2!1sen!2sin"
                        loading="lazy"
                        className={"w-full h-full rounded-md"}
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </CardContent>
            </Card>
        </div>
    )
}