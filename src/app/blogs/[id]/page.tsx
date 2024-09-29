import BlogContent from "@/app/sections/blogs/BlogContent";
import NavBar from "@/components/navbar";
import PageFooter from "@/components/page-footer";
import { DatabaseService } from "@/core/database-service";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // fetch data
    const blog = await DatabaseService().getBlogFromId(params.id).then((res) => res?.data());

    return {
        title: `${blog?.title + " - Jefferson Pharma"}`,
        description: `${blog?.description}`,
    }
}


export default async function BlogPage({ params, searchParams }: Props) {
    const blogdata = await DatabaseService().getBlogFromId(params.id);
    const blog = blogdata?.data();

    return (
        <div className={"flex flex-col"}>
            <NavBar index={3} />
            <div className="relative min-h-screen px-[4%] md:px-[8%] py-24 flex flex-col gap-3">
                <div className="mt-8 mb-6">
                    <h1 className="text-3xl font-bold mb-2">{blog?.title}</h1>
                    <p className="text-gray-500 text-sm">Published on <time dateTime="2022-04-05">April 5, 2022</time></p>
                    <p className="mt-4 text-gray-700">{blog?.description}</p>
                </div>

                <img src={blog?.coverImage} alt="Featured image" className="w-full h-auto max-h-[75vh] object-contain mb-8" />

                <BlogContent content={blog?.content} />
            </div>
            <PageFooter />
        </div>
    )
}
