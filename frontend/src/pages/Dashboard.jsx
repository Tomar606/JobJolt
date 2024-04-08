import { WorkerBar } from "./WorkerBar"
import { Sidebar } from "@/components/Sidebar"

export const Dashboard = () => {
  return <div>
    <WorkerBar/>
    <div style={{display:"flex"}}>
    <Sidebar/><Feed/>
    </div>
    </div>
}