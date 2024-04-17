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

    const toHome = ()=> {
        navigate("/")
    }
    const toAboutUs = ()=> {
        navigate("/aboutus")
    }
    return (
        <div className="flex justify-between items-center h-16 bg-white shadow-md px-5">
            <div className="flex items-center space-x-6">
                <button onClick={toHome} className="font-bold text-xl text-gray-800">JobJolt v1.0</button>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Hire</button>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Work</button>
                <button onClick={toAboutUs} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                    About Us
                </button>
                <button onClick={toWhyPage} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Why JobJolt
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={toSignin} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Log in
                </button>
                <button onClick={toChoose} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default Navbar;
