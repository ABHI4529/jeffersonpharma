import Link from "next/link";

export default function HomeVissionSection() {
    return (
        <div className="flex flex-col px-4 md:px-[8%] py-[8%] gap-20">
            <div
                className="flex gap-3 md:flex-row flex-col justify-between [border-image:linear-gradient(to_right,transparent,rgb(115_115_115),transparent)_1] border-y">
                <div
                    className="flex flex-col py-10 px-8 gap-3 justify-center items-center w-full [border-image:linear-gradient(to_right,transparent,rgb(115_115_115)_100%)_1] border-b md:border-r">
                    <h1 className={"font-bold text-xl"}>Mission</h1>
                    <p className={"text-center text-sm text-muted-foreground"}>
                        At Jefferson Pharma India, our mission is to improve global health by providing high-quality
                        medications and <strong>healthcare solutions</strong>. We strive to make essential medicines accessible to all,
                        ensuring that quality healthcare is within reach for everyone.
                    </p>
                </div>
                <div
                    className="flex justify-center px-8 py-10 items-center flex-col gap-3 w-full [border-image:linear-gradient(to_right,transparent,rgb(115_115_115)_100%)_1] border-b md:border-r">
                    <h1 className={"font-bold text-xl"}>Vision</h1>
                    <p className={"text-center text-sm text-muted-foreground"}>
                        We envision a world where everyone has access to the medications they need. By fostering
                        partnerships with <strong>pharmaceutical manufacturers</strong> and healthcare providers, we aim to bridge the
                        gap in <strong>pharmaceutical distribution</strong>, ensuring timely delivery and reliability.
                    </p>
                </div>
                <div className="flex flex-col py-10 items-center justify-center gap-3 w-full">
                    <h1 className={"font-bold text-xl"}>Quality Assurance</h1>
                    <p className={"text-center text-sm text-muted-foreground"}>
                        Quality is at the heart of our operations. We adhere to strict international standards and
                        regulations, ensuring that all products meet the highest safety and efficacy criteria. Our team
                        is dedicated to continuous improvement and innovation in our processes. <br/>
                        <Link href={"/"} className={"hover:underline text-primary"}>Learn more here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}