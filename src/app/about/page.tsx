import NavBar from '@/components/navbar'
import PageFooter from '@/components/page-footer'
import React from 'react'

export default function AboutPage() {
    return (
        <div className={"flex flex-col"}>
            <NavBar index={4} />
            <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">

            </div>
            <PageFooter />
        </div>
    )
}
