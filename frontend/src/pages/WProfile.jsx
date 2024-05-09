import { Sidebar } from "../components/Sidebar"
import Navbar from "@/components/Navbar"
import WProfilePage from "./WProfilePage"




export const WProfile = () => {

    return <div>
        <Navbar/>
        <div className="flex max-w-full">
        <Sidebar/>
        <WProfilePage/>
        </div>
    </div>
}