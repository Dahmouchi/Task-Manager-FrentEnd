import React, { useEffect, useState } from "react";
import { ArrowDownToDotIcon, BarChart3, Box, LayoutDashboard, PackagePlus, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import axios from "axios";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Retrieve the auth token from local storage
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No auth token found in local storage.");
          return;
        }

        // Send the token in the Authorization header
        const res = await axios.get("http://localhost:9091/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });

        if (res.status === 200) {
          console.log(res.data);
          setUser(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <svg
            fill="none"
            className="w-6 h-6 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>

          <div>Loading ...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar user={user}>
        <SidebarItem
          icon={<LayoutDashboard />}
          active
          text="Home"
          link="/dashboard"
        />
        <SidebarItem
          icon={<Box />}
          active
          text="Projects"
          link="/dashboard/projects"
        />
        <SidebarItem
          icon={<PackagePlus />}
          active
          text="Add Project"
          link="/dashboard/addProject"
        />
        <SidebarItem
          icon={<BarChart3 />}
          text="Tasks"
          link="/dashboard/tasks"
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings />}
          text="Settings"
          link="/dashboard/settings"
        />
      </Sidebar>
      <div className="relative flex flex-1 flex-col bg-slate-100">
        <main className="">
          <div className="mx-auto max-w-screen-2xl p-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
