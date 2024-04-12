import { WorkerBar } from "../components/WorkerBar"
import { useEffect } from "react";
import { WorkerBar } from "./WorkerBar";
import { Sidebar } from "@/components/Sidebar";
import JobList from "./Jobfeed";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const kickOut = () => {
        if (!token) {
            window.alert("Access denied. You need to log in first.");
            navigate("/");
        }
    };

    useEffect(() => {
        kickOut();
    }, [token]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar className="h-full" />
            
            {/* Main content area */}
            <div className="flex flex-col flex-grow bg-light-gray h-full overflow-y-auto">
                <Welcome />
                <div className="flex-grow p-4 bg-pastel-peach rounded-md">
                    <JobList />
                </div>
            </div>
        </div>
    );
};

function Welcome() {
    return (
        <div className="bg-pastel-yellow text-charcoal-gray text-center py-4 antialiased rounded-md">
            <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                Hi there {localStorage.getItem("fname")}!
            </p>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>
                Here are the Jobs you can apply for:
            </p>
        </div>
    );
}
