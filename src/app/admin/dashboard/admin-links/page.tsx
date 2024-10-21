import Sidebar from "@/components/admin-components/sidebar";
import AdminReviewCreation from "@/app/admin/dashboard/admin-reviews/create/admin-reviews-creations";
import CreateLink from "@/app/admin/dashboard/admin-links/create/page";


export default function AdminLinks() {
    return (
        <div className={"flex flex-col px-8"}>
            <Sidebar/>
            <div className={"flex flex-col gap-3"}>
                <div className={"flex justify-between items-center pb-6 border-b border-b-neutral-100"}>
                    <h1 className={"text-3xl font-bold"}>Generate Links</h1>
                    <CreateLink/>
                </div>
            </div>
        </div>
    )
}