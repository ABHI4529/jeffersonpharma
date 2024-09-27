"use client";

import {Button} from "@/components/ui/button";
import {IoIosArrowBack} from "react-icons/io";
import {IoSave, IoTrash} from "react-icons/io5";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ImagePicker from "@/components/ui/image-picker";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {BlockNoteView} from "@blocknote/mantine";
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner";
import {StorageService} from "@/core/storage-service";
import {DatabaseService} from "@/core/database-service";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {DocumentData, DocumentSnapshot} from "@firebase/firestore";
import {BlockNoteEditor} from "@blocknote/core";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";


export default function AdminBlogsDetails() {
    const [blog, setBlog] = useState<any>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [blogTitle, setBlogTitle] = useState<string>("");
    const [blogDescription, setBlogDescription] = useState<string>("");
    const [longDescription, setLongDescription] = useState();
    const [deletedImage, setDeletedImage] = useState<string>();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const router = useRouter();
    const editor = useMemo(() => {
        if (longDescription === "loading") {
            return undefined;
        }
        return BlockNoteEditor.create({initialContent: longDescription});
    }, [longDescription]);
    const params = useSearchParams();

    function saveBlog() {
        if (imageFile) {
            // If an image file is selected, delete the old image and upload the new one
            if (deletedImage) {
                toast.promise(
                    StorageService().deleteFile(deletedImage),
                    {
                        error: (e) => `Failed to delete old image: ${e}`,
                        success: (data) => {
                            uploadNewImageAndSave();
                            return "Image Uploaeded";
                        }
                    }
                );
            } else {
                // No previous image, just upload the new one
                uploadNewImageAndSave();
            }
        } else {
            // If no new image is selected, just update the blog content
            saveOrUpdateBlog(imageUrl);
        }
    }

    async function uploadNewImageAndSave() {
        toast.promise(
            StorageService().uploadFile(imageFile as File),
            {
                error: (e) => `Something went wrong ${e}`,
                success: (url) => {
                    saveOrUpdateBlog(url); // Pass the new image URL to update the blog
                    return "Image uploaded successfully";
                }
            }
        );
    }

    function saveOrUpdateBlog(imageUrl: string | undefined) {
        const data = {
            coverImage: imageUrl,
            title: blogTitle,
            description: blogDescription,
            content: editor!.document
        };

        if (blog) {
            // If blog exists, update it
            toast.promise(
                DatabaseService().editBlog(blog.id, data),
                {
                    error: "Something went wrong",
                    success: () => {
                        router.back();
                        return "Blog updated successfully";
                    }
                }
            );
        } else {
            // If it's a new blog, create it
            toast.promise(
                DatabaseService().createBlog(data),
                {
                    error: "Something went wrong",
                    success: () => {
                        router.back();
                        return "Blog created successfully";
                    }
                }
            );
        }
    }

    useEffect(() => {
        if (params.has("id")) {
            const id = params.get("id");
            if (id) {
                DatabaseService().getBlogFromId(id).then((blog: DocumentSnapshot<DocumentData> | undefined) => {
                    if (blog) {
                        setBlog(blog);
                        setBlogTitle(blog.get("title"));
                        setBlogDescription(blog.get("description"));
                        setImageUrl(blog.get("coverImage"));
                        setLongDescription(blog.get("content"));
                        setDeletedImage(blog.get("coverImage")); // Store the existing image URL
                    }
                });
            }
        }
    }, [params]);

    return (
        <div className={"flex relative bg-grid-black/10 h-screen flex-col"}>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/>
            <div className={"flex z-[9] justify-between bg-white px-8 items-center py-6 border-b border-b-neutral-100"}>
                <div className={"flex flex-col"}>
                    <Button
                        variant={"link"}
                        size={"sm"}
                        className={"w-min p-0"}
                        onClick={() => {
                            router.back();
                        }}
                    >
                        <IoIosArrowBack/>
                        Blogs
                    </Button>
                    <h1 className={"text-3xl font-bold"}>
                        {blog !== undefined ? "Edit Blog" : "Create Blog"}
                    </h1>
                </div>
                <div className={"flex gap-3"}>
                    {blog != undefined && (
                        <Button
                            variant={"destructive"}
                            className={"rounded-xl h-11 gap-2"}
                            onClick={async () => {
                                await DatabaseService().deleteBlog(blog.id, deletedImage!);
                                router.back();
                            }}
                        >
                            Delete Blog
                            <IoTrash/>
                        </Button>
                    )}
                    <Button className={"rounded-xl h-11 gap-2"} onClick={saveBlog}>
                        {blog !== undefined ? "Update Blog" : "Create Blog"}
                        <IoSave/>
                    </Button>
                </div>
            </div>
            <div className={"flex gap-6 z-[9] overflow-auto p-8"}>
                <Card className={"w-[40%] h-[80vh]"}>
                    <CardHeader>
                        <CardTitle>Cover Image</CardTitle>
                        <CardDescription>Image should be less than 2MB</CardDescription>
                    </CardHeader>
                    <CardContent className={"flex flex-col gap-3"}>
                        {blog && imageUrl != undefined ? (
                            <Popover>
                                <PopoverTrigger className={"w-full"}>
                                    <img src={imageUrl} className={"rounded-xl h-[200px] w-full"}
                                         alt={blogTitle}/>
                                </PopoverTrigger>
                                <PopoverContent className={"p-2"}>
                                    <Button variant={"destructive"} className={"w-full"} onClick={()=>{
                                        setDeletedImage(imageUrl);
                                        setImageUrl(undefined);
                                    }}>
                                        Delete Image
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <ImagePicker onDataSubmit={(data) => setImageFile(data)} />
                        )}
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Blog Title</Label>
                            <Input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className={"h-9"} />
                        </div>
                        <div className={"flex flex-col gap-1.5"}>
                            <Label>Small Description</Label>
                            <Textarea value={blogDescription} onChange={(e) => setBlogDescription(e.target.value)}
                                      className={"min-h-[100px]"} />
                        </div>
                    </CardContent>
                </Card>
                <Card className={"w-full h-[80vh]"}>
                    <CardHeader>
                        <CardTitle>Blog Details</CardTitle>
                        <CardDescription>
                            To add images in the blog you can first upload images to Google Drive and paste the link here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={"overflow-y-scroll h-[300px]"}>
                        <BlockNoteView theme={"light"} editor={editor}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
