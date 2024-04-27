import { useNavigate } from "react-router-dom";
import Footer from "@/components/footer";
import homegraphic2 from "@/assets/homegraphic2.png"

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
    const toWhyPage = () => {
        navigate("/whyjobjolt")
    }
    const toProfile = () => {
        navigate("/profile")
    }
    const logout = () => {
        window.alert("Successfully logged out.")
        localStorage.clear()
        window.location.reload(false)
    }

    const ProfileButtons = () => {
        const wtoken = localStorage.getItem("wtoken")
        const htoken = localStorage.getItem("htoken")
        if (wtoken) {
            return <>
                <button onClick={toProfile} className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200">Visit Profile</button>
                <button onClick={logout} className="py-2 px-4 border-solid border-2 rounded-full text-sm font-medium text-white hover:bg-gray-200">Logout</button>
            </>
        }
        else if (htoken) {
            return <>
                <button onClick={() => window.alert("Hirer profile page is still in the making")} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Visit Profile</button>
                <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-200 ">Logout</button>
            </>
        }
        else {
            return <>
                <button onClick={toSignin} className="py-2 px-4 border-solid border-2 rounded-full text-sm font-medium text-white hover:bg-gray-200">Log in</button>
                <button onClick={toChoose} className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200">Sign up</button>
            </>
        }

    }
    const toAboutUs = () => {
        navigate("/aboutus")
    }




    function ConditionalButtons() {
        const wtoken = localStorage.getItem("wtoken")
        const htoken = localStorage.getItem("htoken")

        if (wtoken) {
            return <>
                <button className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200">Visit Profile</button>
                <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Log Out</button>
            </>
        }
        else if (htoken) {
            return <>
                <button className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Visit Profile</button>
                <button onClick={logout} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Log Out</button>
            </>
        }
        else {
            return <>
                <button onClick={toSignin} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Log in</button>
                <button onClick={toChoose} className="py-2 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">Sign up</button>
            </>
        }

    }

    return <div>
        <div className="flex justify-between items-center h-16 bg-black shadow-md px-5">
            <div className="flex items-center space-x-6">
                <div className="font-bold text-xl text-white">JobJolt v1.0</div>
                <button className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900">Hire</button>
                <button className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200">Work</button>
                <button onClick={toAboutUs} className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200">
                    About Us
                </button>
                <button onClick={toWhyPage} className="py-2 px-4 rounded-full text-sm font-medium text-white hover:bg-gray-200">Why JobJolt</button>
            </div>
            <div className="flex items-center space-x-4">

                <ProfileButtons />

            </div>
        </div>
        <div className="w-full h-screen bg-cover bg-black bg-center flex justify-between items-center pl-20 pr-20 text-white text-center">
        <div className="w-full h-screen bg-cover bg-black bg-center flex justify-between items-center pl-20 pr-20 text-white text-center">
  <div className="flex flex-col justify-center items-start space-y-4">
    <div className="text-5xl font-bold p-4 rounded-lg bg-black bg-opacity-65">
      Welcome to JobJolt
    </div>
    <div className="text-2xl p-4 pb-0 pt-0 rounded-lg bg-black bg-opacity-65">
      Stressing about Management?
    </div>
    <div className="text-2xl p-4 pt-0 rounded-lg bg-black bg-opacity-65">
      You got this!
    </div>
  </div>
  <div className="flex justify-center items-center">
    <img
      src={homegraphic2}
      alt="image"
      className="object-cover h-96" 
    />
  </div>
</div>

</div>



        <Footer />
    </div>
}