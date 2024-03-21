import React from "react"


export const Appbar = () => {
    return <div className="flex justify-between h-16">
        <div className="flex justify-between items-center space-x-5">
            <div className="font-league-spartan">jobjolt</div>    
            <button className="item-center pl-3 pr-3 ">Hire</button>
            <button className="item-center pl-3 pr-3 ">Work</button>
            <button className="item-center pl-3 pr-3">Why JobJolt</button>
        </div>
        <div className="flex items-center pr-5">
            <div> 
            </div>
        </div>
    </div>
}