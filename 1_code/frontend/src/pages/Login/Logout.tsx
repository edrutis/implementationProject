import React from "react";
//@ts-ignore
export default function Logout({setIsLoggedIn}) {
    setIsLoggedIn(false)
    localStorage.clear()
    return(<div className="text-black text-xl grid grid-cols-1 justify-items-center text-center p-30 m-30">
        <span className="max-w-lg bg-white p-5 m-10 rounded-full ">Thank you for logging out. If you would like to use the app, please log in again.</span>
    </div>)
}