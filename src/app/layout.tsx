import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
const NavBar = dynamic(()=> import ("@/components/navbar"), {ssr: false});
import PageFooter from "@/components/page-footer";
import {Inter} from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Jefferson Implex India",
    description: "Revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical solutions worldwide.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased`}
        >
        <header>
            <NavBar/>
        </header>
        {children}
        </body>
        <PageFooter/>
        </html>
    );
}
