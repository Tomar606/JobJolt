import React from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path if needed
import Footer from "@/components/footer";
import { WhyUs } from "@/components/WhyUs";

export const WhyJobJolt = () => {
    return (
        <div className="bg-black text-white py-14">
            {/* Add the Navbar at the top */}
            <Navbar />

            {/* Rest of the WhyJobJolt page */}
            <br />
            <WhyUs/>
            {/* Container around the footer for separate layout */}
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}
