import { Sidebar } from "../components/Sidebar"
import Navbar from "@/components/Navbar"
import WProfilePage from "./WProfilePage"




export const WProfile = () => {

    return <div className="bg-black">
        <Navbar/>
        <div className="flex py-16">
        <Sidebar/>
        <WProfilePage/>
        </div>
    </div>
}