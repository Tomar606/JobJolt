import { useNavigate } from "react-router-dom";
import Footer from "@/components/footer";

export const Home = () => {
    let navigate = useNavigate();
    const toSignin = () => {
        let signin = "/signin";
        navigate(signin);
    }
    const toChoose = () => {
        let choose = "/choose";
        navigate(choose);
    }
    const toWhyPage = ()=> {
        navigate("/whyjobjolt")
    }

    return <div>
        <div className="flex justify-between items-center h-16 bg-white shadow-md px-5">
            <div className="flex items-center space-x-6">
                <div className="font-bold text-xl text-gray-800">JobJolt v1.0</div>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Hire</button>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Work</button>
                <button onClick={toWhyPage}  className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Why JobJolt</button>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={toSignin} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Log in</button>
                <button onClick={toChoose} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Sign up</button>
            </div>
        </div>
        <div
            className="w-full h-screen bg-cover bg-center flex items-center justify-center text-gray-900 text-center"
            style={{
                backgroundImage: 'url("https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            }}
        >
            <div className="space-y-4">
                <div className="text-5xl font-bold border-2 border-white p-4 rounded-lg bg-white bg-opacity-65">
                    Welcome to JobJolt
                </div>
                <div className="text-2xl border-2 border-white p-4 rounded-lg bg-white bg-opacity-65">
                    Stressing about Management? You got this!
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}