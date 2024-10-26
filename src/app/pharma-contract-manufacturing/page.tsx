import NavBar from "@/components/navbar";


export default function PharmaContractManufacturingPage() {
    return (
        <div className={"flex flex-col py-20 px-[8%] min-h-screen"}>
            <NavBar index={1}/>
            <div className={"flex h-full w-full gap-8 items-center justify-center mt-24"}>
                <div className={"flex flex-col w-full"}>
                    <h1 className={"text-xl font-bold"}>Pharma Contract Manufacturing</h1>
                    <p className={"text-muted-foreground text-sm"}>
                        At Jefferson Pharma India, we offer top-tier pharmaceutical contract manufacturing services
                        designed
                        to
                        meet the unique needs of the industry. Our state-of-the-art manufacturing facilities are
                        equipped to
                        handle a
                        diverse range of pharmaceutical products, including solid dosages, liquid formulations, and
                        specialized
                        medications.
                    </p>
                </div>
                <div className={"flex flex-col w-full"}>
                    <img
                        src={"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className={"w-full object-cover"}
                        alt={"product"}/>
                </div>
            </div>
            <div className={"flex h-full w-full gap-8 items-center justify-center mt-32"}>
                <div className={"flex flex-col w-full"}>
                    <img
                        src={"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className={"w-full object-cover"}
                        alt={"product"}/>
                </div>
                <div className={"flex flex-col w-full"}>
                    <p className={"text-muted-foreground text-sm"}>
                        As a leading contract manufacturer, we prioritize quality, compliance, and efficiency, ensuring
                        that your products
                        meet the highest industry standards. Our experienced team collaborates closely with you to
                        streamline the
                        production process, reduce costs, and accelerate time-to-market. <br/><br/>
                        With our comprehensive services, including formulation development, packaging, and regulatory
                        support, we are
                        your trusted partner in navigating the complexities of pharmaceutical manufacturing.
                    </p>
                </div>
            </div>
        </div>
    )
}