import ProfileSection from "@/components/profileSection"
import { Sidebar } from "../components/Sidebar"
import { WorkerBar } from "./WorkerBar"



export const Profile = () => {

    return <div>
        <WorkerBar/>
        <div className="flex">
        <Sidebar/>
        <ProfileSection/>
        </div>
    </div>
}