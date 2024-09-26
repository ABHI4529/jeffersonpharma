import LoginSection from "@/app/sections/auth-sections/login-section";


export default function Login(){
    return(
        <div className={"h-full w-full flex flex-col min-h-screen"}>
            <div className={"relative px-[4%] items-center justify-center py-28 md:px-[8%] flex flex-col min-h-screen bg-grid-black/10"}>
                <div
                    className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
                <LoginSection/>
            </div>
        </div>
    )
}