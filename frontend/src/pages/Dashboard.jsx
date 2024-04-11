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
    <div>
      <div className="flex">
        <Sidebar />
        <div>
          <Welcome />
          <JobList />
        </div>
      </div>
    </div>
  );
};

function Welcome() {
  return (
    <div className="bg-blue-50 text-gray-900 text-center py-4 antialiased border-blue-500 rounded-md">
      <p className="text-lg font-semibold mb-2" style={{ fontFamily: 'cursive' }}>Hi there {localStorage.getItem("fname")}!</p>
      <p style={{ fontFamily: 'cursive' }}>Here are the Jobs you can apply for:</p>
    </div>
  );
}
