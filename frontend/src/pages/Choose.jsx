import { Appbar } from "../components/AppBar";
import { useNavigate } from "react-router-dom";


export const Choose = () => {
    let navigate = useNavigate();
    const toSignin = () => {
      let signin = "/signin";
      navigate(signin);
    }

    const toSignup = () => {
        let signup = "/signup";
        navigate(signup);
    }

    const toHSignup = () => {
        let hsignup = "/hsignup";
        navigate(hsignup);
    }

    return <div className="">
        <div className="flex justify-between h-16">
        <div className="flex justify-between items-center space-x-5">
            <div className="font-league-spartan">jobjolt</div>
        </div>
        <div className="flex items-center pr-5">
            <div> 
            </div>
        </div>
    </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hiring or Looking for a job ?
            </h2>
            <br></br>
            <br></br>
            <div className="flex justify-between">
            <button className="w-52 h-48 shadow"
            onClick={toHSignup}>
               I'm hiring for a project. 
            </button>
            <button className="w-52 h-48 shadow"
            onClick={toSignup}>
                I'm looking for work.
            </button>
            <div/>
          </div>
        </div>
    </div>
    Already have an account ? <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={toSignin}>
        Login
    </button>
    </div>
}