import JobList from "../components/Jobfeed";
import Navbar from "@/components/Navbar";
import {BackButton} from "@/components/WButtons";
export const FindWork = () => {


    return (
        <div className="bg-black">
            <Navbar />
            <div className="flex h-full py-14">
                {/* <Sidebar className="h-full" /> */}

                {/* Main content area */}
                <div className="flex flex-col flex-grow bg-light-gray h-full overflow-y-auto bg-black text-white">
                    <Welcome />
                    {/* <SearchBar /> */}
                    <BackButton/>
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
            <p className="text-lg font-semibold mb-2 text-indigo-400" style={{ fontFamily: 'Arial, sans-serif' }}>
                Hi there {localStorage.getItem("wfname")}!
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>
                Here are the Jobs you can apply for:
            </p>
        </div>
    );
}
