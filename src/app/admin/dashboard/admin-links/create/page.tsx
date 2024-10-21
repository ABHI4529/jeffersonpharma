"use client";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button, buttonVariants} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {useState} from "react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

export default function CreateLink() {
    const linkSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        contact: z.string().min(1, "Contact is required"),
        paymentLink: z.string().url(),
        message: z.string().min(1, "Message is required"),
        activeTill: z.date()
    });

    const form = useForm<z.infer<typeof linkSchema>>({
        resolver: zodResolver(linkSchema),
    });

    return (
        <Sheet>
            <SheetTrigger className={buttonVariants({className: "rounded-xl h-11 gap-2"})}>
                Create Link
                <PlusIcon/>
            </SheetTrigger>
            <SheetContent className={"z-[99] bg-white"}>
                <SheetHeader className={"mb-8"}>
                    <SheetTitle>
                        Generate Link
                    </SheetTitle>
                    <SheetDescription>
                        Complete all the details below to generate a link
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form className={"flex flex-col gap-3"}>
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email ID</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"contact"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Contact No.</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"activeTill"}
                            render={({field}) => (
                                <FormItem className={"flex flex-col"}>
                                    <FormLabel>Active Till</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className={"rounded-sm justify-start"}>
                                                    {field.value ? field.value.toLocaleDateString() : ""}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className={"z-[99999]"}>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}