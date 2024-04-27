import { useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const wtoken = localStorage.getItem("wtoken");
    const navigate = useNavigate();

    const kickOut = () => {
        if (!wtoken) {
            window.alert("You need to log in first as a worker");
            navigate("/");
        }
    };

    useEffect(() => {
        kickOut();
    }, [wtoken]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar className="h-full" />
            
            {/* Main content area */}
            <div className="flex flex-col flex-grow bg-light-gray h-full overflow-y-auto">
                <Welcome />
                <div className="flex-grow p-4 bg-pastel-peach rounded-md">
                </div>
            </div>
        </div>
    );
};

function Welcome() {
    return (
        <div className="bg-pastel-yellow text-charcoal-gray text-center py-4 antialiased rounded-md">
            <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                Hi there {localStorage.getItem("wfname")}!
            </p>
        </div>
    );
}
