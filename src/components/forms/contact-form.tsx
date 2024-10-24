"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendMail } from "@/utils/sendMail";
import { toast } from "sonner";
import React, {useState} from "react";
import {AiOutlineLoading} from "react-icons/ai";

export default function ContactForm() {
    const [loading, setLoading] = useState<boolean>(false);

    const schema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        message: z.string().min(10),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        // enable loader here
        setLoading(true);

        const mail = await sendMail({
            name: values.name,
            email: values.email,
            message: values.message
        })
        console.log(mail?.rejected.length);
        
        if (mail?.rejected.length === 0) {
            // disable loader here
            setLoading(false);
            toast.success("Thank you for contacting us",
                { description: "We will get back to you as soon as possible." });
        }else{
             // disable loader here
            setLoading(false);
            toast.error("Something went wrong",
                { description: "Please try again!" });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3 w-full"}>
                <FormField name={"name"} render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder={"Name"} {...field} />
                            <FormMessage />
                        </FormItem>
                    )
                } />
                <FormField name={"email"} render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder={"Email"} {...field} />
                            <FormMessage />
                        </FormItem>
                    )
                } />
                <FormField name={"message"} render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <Textarea placeholder={"Message"} {...field} />
                            <FormMessage />
                        </FormItem>
                    )
                } />
                <div className={"flex justify-end"}>
                    <Button disabled={loading} type={"submit"}>
                        {
                            loading ? <AiOutlineLoading className={"animate-spin"}/> : "Submit"
                        }
                    </Button>
                </div>
            </form>
        </Form>
    )
}