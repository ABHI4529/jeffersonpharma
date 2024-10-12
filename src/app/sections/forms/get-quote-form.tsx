"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AutoComplete } from "@/components/ui/autocomplete";
import { useEffect, useState } from "react";

export default function GetQuoteForm({ children }: { children: React.ReactNode }) {
    const [countries, setCountries] = useState<any[]>();

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
        quantity: z.number().positive("Quantity must be a positive number"),
        phone: z
            .string()
            .regex(/^\+\d{1,3}\s\d{7,15}$/, "Phone must include country code and number"),
        email: z.string().email("Invalid email format"),
        message: z.string().min(10, "Message must be at least 10 characters"),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    function onSubmit(values: z.infer<typeof schema>) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger className={buttonVariants({ className: "gap-2", variant: "outline" })}>
                {children}
            </DialogTrigger>
            <DialogContent className={"z-[999]"}>
                <DialogHeader>
                    <DialogTitle>Get a Quote</DialogTitle>
                    <DialogDescription>
                        Fill the form below to request a quote for the product
                    </DialogDescription>
                </DialogHeader>
                <div className={"flex flex-col"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3"}>
                            {/* Country Field */}
                            <div className={"flex flex-col gap-3 px-1 overflow-auto max-h-[400px]"}>
                                <FormField
                                    name={"country"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            {countries ? (
                                                <AutoComplete
                                                    options={countries.map((e) => ({
                                                        label: e.name.common,
                                                        value: e.name.common,
                                                    }))}
                                                    emptyMessage={"No results found"}
                                                    {...field}
                                                />
                                            ) : (
                                                <></>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Name Field */}
                                <FormField
                                    name={"name"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <Input {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Company Field */}
                                <FormField
                                    name={"company"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company</FormLabel>
                                            <Input {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Product Field */}
                                <FormField
                                    name={"product"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product</FormLabel>
                                            <Input {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Quantity Field */}
                                <FormField
                                    name={"quantity"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <Input {...field} type="number" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Field */}
                                <FormField
                                    name={"phone"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <Input {...field} placeholder="+123 4567890" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    name={"email"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} type="email" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Message Field */}
                                <FormField
                                    name={"message"}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <Textarea {...field} placeholder="Add any additional details" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type={"submit"}>Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
