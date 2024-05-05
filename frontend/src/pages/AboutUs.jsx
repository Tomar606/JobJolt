import React from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path if needed
import Footer from "@/components/footer";
import { Us } from "@/components/Us";

export const AboutUs = () => {
    return (
        <div className="bg-black text-white">
            {/* Add the Navbar at the top */}
            <Navbar />
            

            {/* Content of the About Us page */}
            <Us/>
            {/* Footer in a separate wrapper */}
            <div className="bg-white">
                <Footer />
            </div>
        </div>
    );
};
