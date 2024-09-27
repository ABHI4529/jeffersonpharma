import {ProductModel} from "@/models/product.model";
import Sidebar from "@/components/admin-components/sidebar";

export default function DashboardHome(){
    return(
        <div className={"flex flex-col"}>
            <Sidebar/>
        </div>
    )
}