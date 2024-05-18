import React from "react";
import { CiRead, CiTextAlignCenter, CiFileOn, CiPaperplane, CiMobile3, CiUser } from "react-icons/ci";
export const WhyInShort = () => {
    return (
        <div className="mx-auto space-y-8">
            <div className="p-8 bg-black text-white relative">
                <div className="space-y-8">
                    <div className="text-3xl font-bold">Why JobJolt</div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex">
                            <CiUser className='mr-2' />Effortless Profile Creation
                        </div>
                        <div className="p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex">
                            <CiTextAlignCenter className="mr-2" /> Comprehensive Job Listings
                        </div>
                        <div className="p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex">
                            <CiFileOn className='mr-2' />Easy Application Process
                        </div>
                        <div className="p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex">
                            <CiPaperplane className='mr-2' />Messaging among Users
                        </div>
                        <div className="p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex">
                            <CiRead className='mr-2' />Innovative Watchlist Feature
                        </div>
                        <div className="p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex">
                            <CiMobile3 className='mr-2' />Minimal and Easy User Interface
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
