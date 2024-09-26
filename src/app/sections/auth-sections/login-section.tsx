"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FutureButton from "@/components/ui/future-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginSection() {
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const router = useRouter();

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    // Simulate login action as a Promise
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        console.log("Form submitted with data:", data);

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                if(data.email === "admin@gmail.com" && data.password === "123456"){
                    router.push("/admin/dashboard");
                }else{
                    toast.error("Invalid credentials");
                }
                resolve();
            }, 2000);
        });
    };

    return (
        <Card className={"z-[9] w-[500px] self-center bg-white border border-gray-300 shadow-2xl"}>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Please continue with the provided credentials</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
                        <FormField
                            name={"email"}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <Input className={"bg-[#e7e7e7]"} {...field} />
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            name={"password"}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            type={showPassword ? "password" : "text"}
                                            className={"bg-[#e7e7e7]"}
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <div className={"flex justify-end"}>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword(!showPassword);
                                }}
                                variant={"link"}
                                className={"p-0 h-5"}
                                size={"sm"}
                            >
                                {showPassword ? "Show password" : "Hide password"}
                            </Button>
                        </div>

                        {/* FutureButton to handle login submission with loading state */}
                        <FutureButton
                            className={"w-full"}
                            onClick={() => form.handleSubmit(onSubmit)()} // Trigger the form submission on click
                        >
                            Login
                        </FutureButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
