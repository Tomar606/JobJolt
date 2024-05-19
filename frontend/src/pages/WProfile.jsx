import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import WProfilePage from './WProfilePage';

export const WProfile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden bg-black">
        <Sidebar className="justify-self-end" />
        <WProfilePage />
      </div>
    </div>
  );
};

