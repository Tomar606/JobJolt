import React from 'react';
import Navbar from "@/components/Navbar";
import WProfilePage from "./WProfilePage";
import Sidebar from "@/components/Sidebar"

export const WProfile = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar/>
                <WProfilePage />
            </div>
        </div>
    );
};
