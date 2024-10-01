import type {Metadata} from "next";
import "./globals.css";
const NavBar = dynamic(()=> import ("@/components/navbar"), {ssr: false});
import PageFooter from "@/components/page-footer";
import {Inter} from "next/font/google";
import dynamic from "next/dynamic";
import React from "react";
import icon from "@/assets/ico.png";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Jefferson Implex India",
    description: "Revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical solutions worldwide.",
    icons: {
        icon: icon.src,
    }
};

export default function Layout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased`}
        >
        <div className={"flex flex-col"}>
            {children}
        </div>
        </body>
        </html>
    );
}
