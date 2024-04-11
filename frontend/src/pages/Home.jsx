import { useEffect } from "react";
import { Appbar } from "../components/AppBar";
import { useNavigate } from "react-router-dom";

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

    const token = localStorage.getItem("token")
    const navigatedashboard = () => {
        if(token){
            navigate("/dashboard")
        }
    }

    useEffect(()=>{navigatedashboard()},[])
   

    return <div>
        <div className="flex justify-between h-16">
            <div className="flex justify-between items-center space-x-5">
                <div className="font-league-spartan">jobjolt</div>
                <button className="item-center pl-3 pr-3 ">Hire</button>
                <button className="item-center pl-3 pr-3 ">Work</button>
                <button className="item-center pl-3 pr-3">Why JobJolt</button>
            </div>
            <div className="flex items-center pr-5">
                <div>
                    <button onClick={toSignin} className="item-center pl-3 pr-3 "> Log in</button>
                    <button onClick={toChoose} className="item-center pl-3 pr-3 "> Sign up</button>
                </div>
            </div>
        </div>
        hello
    </div>
}