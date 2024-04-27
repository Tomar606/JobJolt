import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const toSignin = () => {
        navigate("/signin");
    };

    const toChoose = () => {
        navigate("/choose");
    };

    const toWhyPage = () => {
        navigate("/whyjobjolt");
    };

    const toProfile = () => {
        navigate("/profile");
    };

    const logout = () => {
        window.alert("Successfully logged out.");
        localStorage.clear();
        window.location.reload(false);
    };

    const ProfileButtons = () => {
        const wtoken = localStorage.getItem("wtoken");
        const htoken = localStorage.getItem("htoken");
        if (wtoken) {
            return (
                <>
                    <button onClick={toProfile} className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                        Visit Profile
                    </button>
                    <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                        Logout
                    </button>
                </>
            );
        } else if (htoken) {
            return (
                <>
                    <button onClick={() => window.alert("Hirer profile page is still in the making")} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                        Visit Profile
                    </button>
                    <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                        Logout
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <button onClick={toSignin} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                        Log in
                    </button>
                    <button onClick={toChoose} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                        Sign up
                    </button>
                </>
            );
        }
    };

    const toAboutUs = () => {
        navigate("/aboutus");
    };

    return (
        <div className="flex justify-between items-center h-16 bg-black shadow-md px-5 border-white border-b">
            <div className="flex items-center space-x-6">
                <button onClick={() => navigate("/")} className="font-bold text-xl text-white hover:text-gray-200">
                    JobJolt v1.0
                </button>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                    Hire
                </button>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                    Work
                </button>
                <button onClick={toAboutUs} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                    About Us
                </button>
                <button onClick={toWhyPage} className="py-2 px-4 rounded-lg text-sm font-medium text-white hover:bg-gray-200 hover:text-black">
                    Why JobJolt
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <ProfileButtons />
            </div>
        </div>
    );
};

export default Navbar;