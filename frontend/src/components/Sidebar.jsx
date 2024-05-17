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
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export const Sidebar = () => {
  const navigate = useNavigate();

  const sidebarItemStyle =
    "flex items-center gap-x-4 p-3 rounded-lg transition duration-300 ease-in-out transform hover:bg-gray-800 cursor-pointer";

  return (
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
            <ShoppingBagIcon className="h-5 w-5 text-white" />
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
  );
};
