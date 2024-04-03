import Feed from "@/components/Jobfeed"
import { WorkerBar } from "./WorkerBar"

export const Dashboard = () => {
  return <div>
    <WorkerBar/>
    <Feed/>
  </div>
}