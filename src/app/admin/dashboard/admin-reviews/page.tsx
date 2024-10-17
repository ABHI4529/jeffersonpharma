"use client";

import Sidebar from "@/components/admin-components/sidebar";
import {useRouter} from "next/navigation";
import AdminReviewCreation from "@/app/admin/dashboard/admin-reviews/create/admin-reviews-creations";
import {useEffect, useState} from "react";
import {ReviewModel} from "@/models/review.model";
import {DatabaseService} from "@/core/database-service";
import {Popover} from "@/components/ui/popover";
import {PopoverTrigger} from "@/components/ui/popover";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {IoTrash} from "react-icons/io5";


export default function AdminReviewsPage() {
    const router = useRouter();
    const [reviews, setReviews] = useState<any[]>();

    async function getReviews() {
        const data = await DatabaseService().getAllReviews();
        setReviews(data.docs);
    }

    useEffect(() => {
        getReviews();
    }, [])

    return (
        <div className={"flex flex-col px-8"}>
            <Sidebar/>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between items-center pb-6 border-b border-b-neutral-100"}>
                    <h1 className={"text-3xl font-bold"}>Reviews</h1>
                    <div className={"flex gap-3"}>
                        <AdminReviewCreation onSuccess={()=>{
                            getReviews();
                        }}/>
                    </div>
                </div>
            </div>
            {
                reviews != undefined ?
                    <div className={"grid grid-cols-3 gap-3 mt-4"}>
                        {
                            reviews.map((item) => {
                                return (
                                    <Card className={"flex flex-col items-start justify-start"}>
                                        <CardHeader className={"relative flex w-full flex-col items-start"}>
                                            <CardTitle>
                                                {item.get("name")}
                                            </CardTitle>
                                            <CardDescription>
                                                {item.get("designation")}
                                            </CardDescription>
                                            <Button className={"absolute right-2 top-0"} variant={"ghost"} size={"sm"}
                                                onClick={async ()=>{
                                                    DatabaseService().deleteReview(item.id).then((value)=>{
                                                        getReviews();
                                                    })
                                                }}
                                            >
                                                <IoTrash/>
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            {item.get("review")}
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </div>
                    : <div className={"flex flex-col items-center justify-center p-8"}>
                        <p className={"text-muted-foreground"}>Loading...</p>
                    </div>
            }
        </div>
    )
}