import type {Metadata} from "next";

import NavBar from "@/components/navbar";
import PageFooter from "@/components/page-footer";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Jefferson Implex India / Services",
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
        <NavBar/>
        {children}
        </body>
        <PageFooter/>
        </html>
    );
}
