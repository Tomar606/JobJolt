import { Sidebar } from "../components/Sidebar"
import { WorkerBar } from "../components/WorkerBar"
import ProfilePage from "./ProfilePage"



export const Profile = () => {

    return <div>
        <WorkerBar/>
        <div className="flex">
        <Sidebar/>
        <ProfilePage/>
        </div>
    </div>
}