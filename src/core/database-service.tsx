import {ProductModel} from "@/models/product.model";
import {
    addDoc,
    collection, deleteDoc, doc,
    DocumentData, getDoc,
    getDocs,
    limit,
    query,
    QueryConstraint,
    startAfter, updateDoc,
    where
} from "@firebase/firestore";
import {db} from "@/utils/firebase";
import {toast} from "sonner";
import {StorageService} from "@/core/storage-service";


export const DatabaseService = () => {
    return {
        createProductId: (brand: string, drug: string): string => {
            // Normalize strings: convert to lowercase, trim spaces, and replace spaces with hyphens
            const normalizedBrand = brand.toLowerCase().replace(/\s+/g, '-');
            const normalizedDrug = drug.toLowerCase().replace(/\s+/g, '-');

            // Get the strength and format the id
            const strength = ""; // You can replace this with the actual strength if you have that information.
            const id = `${normalizedBrand}-${strength}-${normalizedDrug}`;

            return id;
        },

        generateQuery: (input: string): string[] => {
            const query: string[] = [];
            for (let i = 1; i <= input.length; i++) {
                query.push(input.toLowerCase().substring(0, i));
            }
            return query;
        },
        createProduct: async (data: ProductModel) => {
            if (data != undefined) {
                await addDoc(
                    collection(db, "products"), data
                ).then((e) => {
                    console.log(e.id);
                })
            } else {
                toast.error(
                    "Something went wrong"
                )
            }
        },

        getProducts: async (pageSize: number = 10,
                            searchField?: string,
                            searchQuery?: string): Promise<ProductModel[]> => {
            let lastVisibleProduct: DocumentData | null = null;
            try {
                let productQueryConstraints: QueryConstraint[] = [limit(pageSize)];

                if (searchField && searchQuery) {
                    // Wrap searchQuery in an array if it's not already an array
                    productQueryConstraints.push(where(searchField, "array-contains-any", Array.isArray(searchQuery) ? searchQuery : [searchQuery]));
                }

                if (lastVisibleProduct) {
                    productQueryConstraints.push(startAfter(lastVisibleProduct));
                }

                const productQuery = query(collection(db, "products"), ...productQueryConstraints);
                const snapshot = await getDocs(productQuery);

                if (!snapshot.empty) {
                    lastVisibleProduct = snapshot.docs[snapshot.docs.length - 1];
                }

                return snapshot.docs.map((doc) => doc.data() as ProductModel);
            } catch (error) {
                console.error("Error getting products:", error);
                return [];
            }
        },
        getProductFromId: async(id: string): Promise<ProductModel> => {
            try{
                const q = query(collection(db, "products"), where("id", "==", id));
                const snapshot = await getDocs(q);
                return snapshot.docs[0].data() as ProductModel;
            }catch(error){
                console.log("Something went wrongL ", error);
                return {} as ProductModel;
            }
        },

        getDocIdFromId: async(id: string): Promise<string> => {
            try{
                const q = query(collection(db, "products"), where("id", "==", id));
                const snapshot = await getDocs(q);
                return snapshot.docs[0].id;
            }catch(error){
                console.log("Something went wrongL ", error);
                return "";
            }
        },

        getBlogFromId: async (id: string) => {
            try{
                const snapshot = doc(db, "blogs", id);
                return await getDoc(snapshot);
            }catch(error){
                console.log("Something went wrongL ", error);
            }
        },

        createBlog: async (data: any) => {
            if (data != undefined) {
                await addDoc(
                    collection(db, "blogs"), data
                ).then((e) => {
                    console.log(e.id);
                })
            } else {
                toast.error(
                    "Something went wrong"
                )
            }
        },

        getAllBlogs: async () =>{
            return await getDocs(collection(db, "blogs"));
        },

        editProduct: async (id: string, updatedData: Partial<ProductModel>) => {
            try {
                DatabaseService().getDocIdFromId(id).then(async (docId) => {
                    const productRef = doc(db, "products", docId);
                    await updateDoc(productRef, updatedData);
                    toast.success("Product updated successfully!");
                })
            } catch (error) {
                console.error("Error updating product:", error);
                toast.error("Error updating product.");
            }
        },

        // Function to edit a blog by id
        editBlog: async (id: string, updatedData: any) => {
            try {
                const blogRef = doc(db, "blogs", id);
                await updateDoc(blogRef, updatedData);
                toast.success("Blog updated successfully!");
            } catch (error) {
                console.error("Error updating blog:", error);
                toast.error("Error updating blog.");
            }
        },

        // Function to delete a blog by id
        deleteBlog: async (id: string, imageUrl: string) => {
            try {
                // Step 1: Delete the associated image.
                const storageService = StorageService();
                if (imageUrl) {
                    await storageService.deleteFile(imageUrl);
                    toast.success("Image deleted successfully!");
                }

                // Step 2: Delete the blog document from Firestore
                const blogRef = doc(db, "blogs", id);
                await deleteDoc(blogRef);
                toast.success("Blog deleted successfully!");
            } catch (error) {
                console.error("Error deleting blog:", error);
                toast.error("Error deleting blog.");
            }
        },

        // Function to delete a product by id
        deleteProduct: async (id: string) => {
            try {
                const productRef = doc(db, "products", id);
                await deleteDoc(productRef);
                toast.success("Product deleted successfully!");
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Error deleting product.");
            }
        },
    }
}