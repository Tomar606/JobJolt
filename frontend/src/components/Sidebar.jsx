import { useNavigate } from "react-router-dom";
import {
    Card,
    Typography,
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

    return (
        <Card className="flex flex-col h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    JobJolt v1.0
                </Typography>
            </div>
            <List className="flex-grow">
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <button
                        style={{ width: "100%", textAlign: "left" }}
                        onClick={() => navigate("/profile")}
                    >
                        My Profile
                    </button>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Proposals
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
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
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <button
                        style={{ width: "100%", textAlign: "left" }}
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.alert("Successfully logged out.");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </ListItem>
            </List>
        </Card>
    );
};
