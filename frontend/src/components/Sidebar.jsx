import React from "react";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarItemStyle =
    "flex items-center gap-x-4 p-3 rounded-lg transition duration-300 ease-in-out transform hover:bg-gray-800 cursor-pointer";

  return (
    <div className="pt-16">
    <Card className="flex flex-col h-full w-full max-w-[20rem] p-4 shadow-xl bg-black text-white">
      <List className="flex-grow">
        <ListItem
          className={sidebarItemStyle}
          onClick={() => navigate("/dashboard")}
        >
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Dashboard</span>
        </ListItem>
        <ListItem className={sidebarItemStyle}>
          <ListItemPrefix>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
  <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
  <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
</svg>
          </ListItemPrefix>
          <span className="text-white">Notifications</span>
        </ListItem>
        <ListItem className={sidebarItemStyle}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Inbox</span>
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className={sidebarItemStyle}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Settings</span>
        </ListItem>
        <ListItem
          className={sidebarItemStyle}
          onClick={() => {
            localStorage.clear();
            toast.info("Successfully logged out!", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Flip,
            });
            navigate("/");
          }}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
          <span className="text-white">Logout</span>
        </ListItem>
      </List>
    </Card>
    </div>
  );
};

export default Sidebar;