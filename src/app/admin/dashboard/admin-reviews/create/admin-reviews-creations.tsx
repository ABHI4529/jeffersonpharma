import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {PlusIcon} from "@radix-ui/react-icons";
import {Button, buttonVariants} from "@/components/ui/button";
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ReviewModel} from "@/models/review.model";
import {DatabaseService} from "@/core/database-service";
import {useState} from "react";

interface props{
    onSuccess : () => void
}

export default function AdminReviewCreation({onSuccess} : props){
    const [open, setOpen] = useState<boolean>(false);


    const formSchema = z.object({
        name : z.string().min(2),
        designation : z.string().min(2),
        review : z.string().min(10)
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values : z.infer<typeof formSchema>){
        const review : ReviewModel = {
            name : values.name,
            designation : values.designation,
            review : values.review
        };

        await DatabaseService().createReview(review).then(()=>{
            setOpen(false);
            onSuccess();
        });
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants({className: "rounded-xl h-11 gap-2"})}>
                Add New
                <PlusIcon/>
            </DialogTrigger>
            <DialogContent className={"z-[99] border-none"}>
                <DialogHeader>
                    <DialogTitle>
                        Create Review
                    </DialogTitle>
                    <DialogDescription>
                        Complete all the details below to add a review
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3"}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        placeholder="Name"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <Input
                                        placeholder="Name"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="review"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review</FormLabel>
                                    <Textarea
                                        placeholder="Review"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className={"flex justify-end"}>
                            <Button type="submit" className={"w-[150px] mt-4"}>Create</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}