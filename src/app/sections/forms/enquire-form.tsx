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
import {AutoComplete} from "@/components/ui/autocomplete";
import {useEffect, useState} from "react";


export default function EnquireForm({children}: {children: React.ReactNode}) {
    const [countries, setCountries] = useState<any[]>();

    async function getCountries(){
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await response.json();
        setCountries(data);
        console.log(data);
    }

    useEffect(()=>{
        getCountries();

    }, [])

    const schema = z.object({
        country: z.string().min(1, "Country is required"),
        name: z.string().min(2, "Name is required"),
        company: z.string().min(1, "Company is required"),
        phone: z.string().regex(/^\+\d{1,3}\s\d{7,15}$/, "Phone must include country code and number"),
        email: z.string().email("Invalid email format"),
        message: z.string().min(10, "Message must be at least 10 characters"),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    function onSubmit(values : z.infer<typeof schema>){
        console.log(values)
    }

    return(
        <Dialog>
            <DialogTrigger className={buttonVariants({className: "gap-2"})}>
                {
                    children
                }
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
                                        {
                                            countries != null ?
                                            <AutoComplete options={countries?.map((e, i)=>({label: e.name.common, value: e.name.common}))} emptyMessage={"No results found"} {...field}/>
                                            : <></>
                                        }
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
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