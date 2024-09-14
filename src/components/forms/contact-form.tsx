"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import { Input } from "../ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function ContactForm(){
    const schema = z.object({
        name : z.string().min(2),
        email : z.string().email(),
        message : z.string().min(10),
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    function onSubmit(values: z.infer<typeof schema>){
        
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3 w-full"}>
                <FormField name={"name"} render={
                    ({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input  placeholder={"Name"} {...field}/>
                            <FormMessage />
                        </FormItem>
                    )
                }/>
                <FormField name={"email"} render={
                    ({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder={"Email"} {...field}/>
                            <FormMessage />
                        </FormItem>
                    )
                }/>
                <FormField name={"message"} render={
                    ({field}) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <Textarea placeholder={"Message"} {...field}/>
                            <FormMessage />
                        </FormItem>
                    )
                }/>
                <div className={"flex justify-end"}>
                    <Button type={"submit"} className={"w-[100px]"}>
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}