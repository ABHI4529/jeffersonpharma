import ProductsListing from "@/app/sections/products/products-listing";


export const metadata = {
    title: "Jefferson Pharma Products",
    description: "Revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical solutions worldwide.",
};

export default function Products(){

    return(
        <div className={"flex flex-col"}>
            <ProductsListing/>
        </div>
    )
}