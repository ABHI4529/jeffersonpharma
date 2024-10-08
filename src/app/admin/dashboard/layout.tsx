

import {Inter} from "next/font/google";
import type {Metadata} from "next";
import {Toaster} from "@/components/ui/sonner";
import Sidebar from "@/components/admin-components/sidebar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Jefferson Dashboard",
    description: "Generated by AYD",
};

export default function DashboardRootLayout({
                                                children,
                                            }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className={inter.className + " overflow-hidden"}>
        <div className={'flex flex-col w-full h-screen'}>
            <div className={"flex flex-col w-full h-full"}>
                {children}
            </div>
        </div>
        <Toaster richColors/>
        </section>
    );
}