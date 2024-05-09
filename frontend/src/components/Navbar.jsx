import React from "react"
import { Flip, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
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
        toast.info('Successfully logged out!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip
        });
        localStorage.clear();
        window.location.reload(false);
    };

    const ProfileButtons = () => {
        const wtoken = localStorage.getItem("wtoken");
        const htoken = localStorage.getItem("htoken");
        if (wtoken) {
            return (
                <>
                    <button onClick={toProfile} className="py-2 px-4 rounded-full text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                        Visit Profile
                    </button>
                    <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                        Logout
                    </button>
                </>
            );
        } else if (htoken) {
            return (
                <>
                    <button onClick={() => toast.info('Hirer profile page is still in the making', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    })}
                     className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                    Visit Profile
                </button >
                    <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                        Logout
                    </button>
                </>
            );
        } else {
    return (
        <>
            <button onClick={toSignin} className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                Log in
            </button>
            <button onClick={toChoose} className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
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
            <button onClick={() => navigate("/")} className="font-bold text-xl text-white hover:text-gray-200 max-w-xs transition duration-300 ease-in-out hover:scale-110">
                JobJolt v1.0
            </button>
            <button className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                Hire
            </button>
            <button className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                Work
            </button>
            <button onClick={toAboutUs} className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
                About Us
            </button>
            <button onClick={toWhyPage} className="py-2 px-4 rounded-lg text-sm font-medium text-white max-w-xs transition duration-300 ease-in-out hover:scale-110">
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
