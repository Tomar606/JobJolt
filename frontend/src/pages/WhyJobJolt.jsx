import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { WhyUs } from "@/components/WhyUs";

export const WhyJobJolt = () => {
    return (
        <div className="bg-black text-white py-14">
            <Navbar />

            <br />
            <WhyUs/>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}
