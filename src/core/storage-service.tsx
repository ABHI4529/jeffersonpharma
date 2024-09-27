import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebase";

export const StorageService = () => {
    return {
        uploadFile: async (file: File) => {
            const imageRef = ref(storage, file.name);
            const promise = await uploadBytes(imageRef, file);
            return getDownloadURL(promise.ref);
        },


        deleteFile: async (url: string) => {
            const imageRef = ref(storage, url);
            try {
                await deleteObject(imageRef);
                return "";
            } catch (error) {
                console.warn(`Failed to delete file at ${url}:`, error);
                return "";
            }
        }
    }
}