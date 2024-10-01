"use client";

import {Button, buttonVariants} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {ArrowUpRight} from "lucide-react";
import {className} from "postcss-selector-parser";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";


export default function EnquireForm(){
    const schema = z.object({
        name : z.string().min(2, {
            message: "Full Name is Required"
        }),
        email : z.string().email(),
        message : z.string().min(10, {
            message: "Message should be at least more than 10 letters"
        }),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    function onSubmit(values : z.infer<typeof schema>){
        console.log(values)
    }

    return(
        <Dialog>
            <DialogTrigger className={buttonVariants({className: "gap-2"})}>
                Enquire Now
                <ArrowUpRight/>
            </DialogTrigger>
            <DialogContent className={"z-[999]"}>
                <DialogHeader>
                    <DialogTitle>
                        Enquire Us
                    </DialogTitle>
                    <DialogDescription>
                        Fill the form below to get in touch with us
                    </DialogDescription>
                </DialogHeader>
                <div className={"flex flex-col"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3"}>
                            <FormField
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <Input {...field}/>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={"email"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field}/>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={"message"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <Textarea {...field}/>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Button type={"submit"}>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}