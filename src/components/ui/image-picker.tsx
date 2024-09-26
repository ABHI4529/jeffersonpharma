"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import {useState} from "react";

export default function ImagePicker({onDataSubmit}: { onDataSubmit: (data: any) => void }) {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageDataURL = reader.result as string;
            setSelectedImage(imageDataURL);
            onDataSubmit(file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className={"relative duration-200 border border-neutral-200 rounded-md flex items-center justify-center p-0 h-[220px] " +
                " hover:bg-primary/20"}>
            <input
                className={"absolute opacity-0 h-[100%] w-[100%]"}
                type={"file"}
                onChange={handleImageChange}
            />
            {selectedImage ? (
                <img src={selectedImage} alt={"Selected Image"} className={"object-cover rounded-md w-full h-full"}/>
            ) : (
                <div className={"flex flex-col gap-3 justify-center items-center text-xs text-muted-foreground"}>
                    <PlusIcon/>
                    <p>Image should be less than 2MB</p>
                </div>
            )}
        </div>
    );
}