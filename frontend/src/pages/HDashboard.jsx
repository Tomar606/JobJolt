import { HirerBar } from "@/components/HirerBar"
import { Sidebar } from "@/components/Sidebar"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


export const HDashboard = () => {
  let navigate = useNavigate()
  const htoken = localStorage.getItem("htoken")
  if (!htoken) {
    window.alert("Please sign in as a hirer first")
    navigate("/")
  }
  return <div>
    <HirerBar />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hirer Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/hirer/new-job">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Post a New Job
          </button>
        </Link>
        <Link to="/hirer/posted-jobs">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Posted Jobs
          </button>
        </Link>
        <Link to="/hirer/applications">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Applications
          </button>
        </Link>
        <Link to="/hirer/watchlist">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Watchlist
          </button>
        </Link>
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