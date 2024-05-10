import { Sidebar } from "@/components/Sidebar";
import JobList from "../components/Jobfeed";
import { SearchBar } from "@/components/SearchBar";
import { WorkerBar } from "@/components/WorkerBar";

export const FindWork = () => {

    return (
        <div>
            <WorkerBar/>
          <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar className="h-full" />
            
            {/* Main content area */}
            <div className="flex flex-col flex-grow bg-light-gray h-full overflow-y-auto">
                <Welcome />
                <SearchBar/>
                <div className="flex-grow p-4 bg-pastel-peach rounded-md">
                    <JobList />
                </div>
            </div>
        </div> 
        </div>
    )
}

function Welcome() {
  return (
      <div className="bg-pastel-yellow text-charcoal-gray text-center py-4 antialiased rounded-md">
          <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              Hi there {localStorage.getItem("wfname")}!
          </p>
          <p style={{ fontFamily: 'Arial, sans-serif' }}>
              Here are the Jobs you can apply for:
          </p>
      </div>
  );
}
