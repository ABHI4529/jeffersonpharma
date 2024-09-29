import NavBar from "@/components/navbar";
import PageFooter from "@/components/page-footer";
import BlogsListing from "../sections/blogs/blogs-listing";

export default function Blogs() {
    return (
        <div className={"flex flex-col"}>
            <NavBar index={3} />
            <BlogsListing />
            <PageFooter />
        </div>
    )
}

