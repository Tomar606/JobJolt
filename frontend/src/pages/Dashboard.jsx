import { WorkerBar } from "./WorkerBar"
import { Sidebar } from "@/components/Sidebar"
import JobList from "./Jobfeed"

export const Dashboard = () => {
  return <div>
    <WorkerBar />
    <Welcome />
    <div className="flex">
      <Sidebar />
      <JobList />
    </div>
  </div>
}

function Welcome() {
  return <div className="bg-gray-200 text-gray-800 text-center py-4 text-lg font-semibold antialiased">
    Hi there {localStorage.getItem("fname")} <br />
    Here are the Jobs you can apply for:
  </div>
}