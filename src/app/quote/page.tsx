"use client";

import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {AutoComplete} from "@/components/ui/autocomplete";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button, buttonVariants} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IoArrowBack} from "react-icons/io5";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import ContactForm from "@/components/forms/contact-form";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {sendMail} from "@/utils/sendMail";
import {toast} from "sonner";
import {AiOutlineLoading} from "react-icons/ai";


export default function Enquire() {
    const [countries, setCountries] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    async function getCountries() {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await response.json();
        setCountries(data);
    }

    useEffect(() => {
        getCountries();
    }, []);

    // Define the Zod schema for the GetQuote form
    const schema = z.object({
        country: z.string().min(1, "Country is required"),
        name: z.string().min(2, "Name is required"),
        company: z.string().min(1, "Company is required"),
        product: z.string().min(1, "Product is required"),
        quantity: z.string(),
        phone: z
            .string()
            .regex(/^\+\d{1,3}\s\d{7,15}$/, "Phone must include country code and number"),
        email: z.string().email("Invalid email format"),
        message: z.string().min(10, "Message must be at least 10 characters"),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        setLoading(true);
        const mail = await sendMail({
            name: values.name,
            email: values.email,
            message: values.message,
            country: values.country,
            company: values.company,
            product: values.product,
            quantity: values.quantity,
            phone: values.phone
        })
        if (mail?.rejected.length === 0) {
            // disable loader here
            setLoading(false);
            toast.success("Thank you for contacting us",
                {description: "We will get back to you as soon as possible."});
        } else {
            setLoading(false);
            // disable loader here
            toast.error("Something went wrong",
                {description: "Please try again!"});
        }
    }

    return (
        <div className={"flex flex-col overflow-hidden"}>
            <motion.div
                initial={{
                    x: "100%",
                    opacity: 0
                }}
                animate={{
                    x: "0%",
                    opacity: 1
                }}
                transition={{
                    type: 'spring',
                    duration: 0.8
                }}
                className={"flex flex-col md:flex-row md:justify-between gap-8 items-center min-h-screen py-[4%] px-[4%] md:px-[8%]"}>
                <div className={"flex flex-col gap-2 w-full"}>
                    <div className={"flex flex-col"}>
                        <div onClick={() => router.back()}
                             className={"flex gap-2 cursor-pointer items-center text-xs md:text-sm text-primary"}>
                            <IoArrowBack/>
                            <p>Back</p>
                        </div>
                        <h1 className={"text-xl md:text-5xl font-bold"}>Get Quote</h1>
                    </div>
                    <p className={"text-muted-foreground md:text-md text-sm"}>
                        Our team will carefully review your details and respond within 24 to 72 hours. We appreciate
                        your
                        patience and look forward to assisting you.
                    </p>
                    <div className={"flex flex-col w-min md:w-auto md:flex-row gap-2 mt-4"}>
                        <div className={"px-4 py-1 bg-neutral-300 rounded-full text-xs"}>
                            <p>enquiry@jeffersonpharmaindia.com</p>
                        </div>
                        <div className={"px-4 py-1 bg-neutral-300 rounded-full text-xs"}>
                            <p>+91 – 9373283509 / 9270190596</p>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col w-full md:border-l md:p-6"}>
                    <div className={"flex flex-col"}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3"}>
                                {/* Country Field */}
                                <div className={"flex flex-col gap-3 px-1 md:overflow-auto pr-6 md:max-h-[60vh]"}>
                                    <FormField
                                        name={"country"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                {
                                                    countries != null ?
                                                        <AutoComplete
                                                            options={countries?.map((e, i) => ({
                                                                label: e.name.common,
                                                                value: e.name.common
                                                            }))} emptyMessage={"No results found"}
                                                            onValueChange={(value) => {
                                                                field.onChange(value.label)
                                                            }}/>
                                                        : <></>
                                                }
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Name Field */}
                                    <FormField
                                        name={"name"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <Input {...field} />
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Company Field */}
                                    <FormField
                                        name={"company"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Company</FormLabel>
                                                <Input {...field} />
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Product Field */}
                                    <FormField
                                        name={"product"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Product</FormLabel>
                                                <Input {...field} />
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Quantity Field */}
                                    <FormField
                                        name={"quantity"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Quantity</FormLabel>
                                                <Input {...field} type="number"/>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Phone Field */}
                                    <FormField
                                        name={"phone"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <Input {...field} placeholder="+123 4567890"/>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email Field */}
                                    <FormField
                                        name={"email"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <Input {...field} type="email"/>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Message Field */}
                                    <FormField
                                        name={"message"}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <Textarea {...field} placeholder="Add any additional details"/>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button disabled={loading} type={"submit"}>
                                    {
                                        loading ? <AiOutlineLoading className={"animate-spin"}/> : "Submit"
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}