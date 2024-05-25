import React from "react";
import { CiRead, CiTextAlignCenter, CiFileOn, CiPaperplane, CiMobile3, CiUser } from "react-icons/ci";

export const WhyInShort = () => {
    return (
        <div className="space-y-8 p-4 sm:p-8 bg-black text-white">
            <div className="space-y-8">
                <div className="text-2xl sm:text-3xl font-bold text-center">Why JobJolt</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 sm:p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex items-center">
                        <CiUser className='mr-4 text-xl' />
                        <div>
                            <div className="text-lg sm:text-xl font-semibold">Effortless Profile Creation</div>
                            <div className="font-light">Quickly set up your professional profile.</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex items-center">
                        <CiTextAlignCenter className="mr-4 text-xl" />
                        <div>
                            <div className="text-lg sm:text-xl font-semibold">Comprehensive Job Listings</div>
                            <div className="font-light">Access a wide range of job opportunities.</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex items-center">
                        <CiFileOn className='mr-4 text-xl' />
                        <div>
                            <div className="text-lg sm:text-xl font-semibold">Easy Application Process</div>
                            <div className="font-light">Apply to jobs with a few simple clicks.</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex items-center">
                        <CiPaperplane className='mr-4 text-xl' />
                        <div>
                            <div className="text-lg sm:text-xl font-semibold">Messaging among Users</div>
                            <div className="font-light">Communicate seamlessly with other users.</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex items-center">
                        <CiRead className='mr-4 text-xl' />
                        <div>
                            <div className="text-lg sm:text-xl font-semibold">Innovative Watchlist Feature</div>
                            <div className="font-light">Keep track of your favorite job postings.</div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 rounded-md shadow-md border-2 border-gray-600 hover:border-gray-300 flex items-center">
                        <CiMobile3 className='mr-4 text-xl' />
                        <div>
                            <div className="text-lg sm:text-xl font-semibold">Minimal and Easy User Interface</div>
                            <div className="font-light">Enjoy a clean and intuitive design.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
