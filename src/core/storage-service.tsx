import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { v4 as uuidv4 } from 'uuid';

export const StorageService = () => {
    return {
        uploadFile: async (file: File) => {
            const randomFileName = uuidv4() + '.' + file.name.split('.').pop(); // Keep the file extension
            const imageRef = ref(storage, randomFileName);
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