import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAmP6YNPnD5ViXXedAzvErybvWK0_9H1vk",
    authDomain: "jefferson-pharma.firebaseapp.com",
    projectId: "jefferson-pharma",
    storageBucket: "jefferson-pharma.appspot.com",
    messagingSenderId: "941307282831",
    appId: "1:941307282831:web:b4ec7506a915faf721f7fa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
