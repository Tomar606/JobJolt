import { HirerBar } from "@/components/HirerBar"
import { Sidebar } from "@/components/Sidebar"
import { useNavigate } from "react-router-dom"
import JobList from "@/components/Jobfeed"

export const HDashboard = () => {
  let navigate = useNavigate()
  const htoken = localStorage.getItem("htoken")
  if (!htoken) {
    window.alert("Please sign in as a hirer first")
    navigate("/")
  }
  return <div>
    <HirerBar />
    <div className="flex h-screen">
      <Sidebar className="h-full" />
      <div className="flex flex-col flex-grow bg-light-gray h-full overflow-y-auto">
        <Welcome />
        <div className="flex-grow p-4 bg-pastel-peach rounded-md">
          <JobList />
        </div>
      </div>
    </div>
  </div>
}

/*
<div className="flex h-screen">
            
            <Sidebar className="h-full" />
            <div className="flex flex-col flex-grow bg-light-gray h-full overflow-y-auto">
                <Welcome />
                <div className="flex-grow p-4 bg-pastel-peach rounded-md">
                    <JobList />
                </div>
            </div>
        </div>
*/




function Welcome() {
  return (
    <div className="bg-pastel-yellow text-charcoal-gray text-center py-4 antialiased rounded-md">
      <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
        Hi there {localStorage.getItem("hfname")}!
      </p>
      <p style={{ fontFamily: 'Arial, sans-serif' }}>
        Here are the Jobs that have been applied for:
      </p>
    </div>
  );
}