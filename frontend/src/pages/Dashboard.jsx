import { WorkerBar } from "./WorkerBar"
import { Sidebar } from "@/components/Sidebar"
import JobList from "./Jobfeed"

export const Dashboard = () => {
  return <div>
    <div className="flex">
      <Sidebar />
      <div>
        <Welcome />
        <JobList />
      </div>
    </div>
  </div>
}

function Welcome() {
  return (
    <div className="bg-blue-50 text-gray-900 text-center py-4 antialiased border-blue-500 rounded-md">
      <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'cursive' }}>Hi there {localStorage.getItem("fname")}!</p>
      <p style={{ fontFamily: 'cursive' }}>Here are the Jobs you can apply for:</p>
    </div>
  );
}