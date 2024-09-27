import ProductsListing from "@/app/sections/products/products-listing";
import NavBar from "@/components/navbar";
import PageFooter from "@/components/page-footer";


export const metadata = {
    title: "Jefferson Pharma Products",
    description: "Revolutionizing healthcare by providing access to high-quality, affordable pharmaceutical solutions worldwide.",
};

export default function Products(){

    return(
        <div className={"flex flex-col"}>
            <NavBar index={2}/>
            <ProductsListing/>
            <PageFooter/>
        </div>
    )
}