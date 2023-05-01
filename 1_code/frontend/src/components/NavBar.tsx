import React from "react";
import getUserType from "../functions/getUserType";

type NavProps = {
    userType : 'Employee' | 'Admin' | 'Customer' | null
}

function NavBar() {
    const userType = getUserType();

    if (userType === 'Employee') {
        return (
            <div className="max-w-7xl top-0 sticky w-screen px-8 py-5 bg-indigo-400 grid grid-cols-2 z-50 drop-shadow-2xl rounded-b-3xl">
                <div></div>
                <div className="text-right"><a className="navLink" href="/checkIn">Check In Vehicles</a> <a className="navLink" href="/viewLocations">View Locations</a> <a className="navLink" href="/logout">Log Out</a></div>
            </div>
        )
    }else if (userType === 'Admin') {
        return (
            <div className="max-w-7xl top-0 sticky w-screen px-8 py-5 bg-indigo-400 grid grid-cols-2 z-50 drop-shadow-2xl rounded-b-3xl">
                <div></div>
                <div className="text-right"><a className="navLink" href="/checkIn">Check In Vehicles</a> <a className="navLink" href="/newCar">New Vehicle</a> <a className="navLink" href="/newLocation">New Location</a> <a className="navLink" href="/viewLocations">View Locations</a><a className="navLink" href="/logout">Log Out</a></div>
            </div>
        )        
    }else if (userType === 'Customer') {
        return (
            <div className="max-w-7xl top-0 sticky w-screen px-8 py-5 bg-indigo-400 grid grid-cols-2 z-50 drop-shadow-2xl rounded-b-3xl">
                <div></div>
                <div className="text-right"><a className="navLink" href="/newRental">New Reservation</a> <a className="navLink" href="/MyRentals">View Reservations</a>  <a className="navLink" href="/logout">Log Out</a></div>
            </div>
        )
    }else {
        return (
            <div className="max-w-7xl top-0 sticky w-screen px-8 py-5 bg-indigo-400 grid grid-cols-2 z-50 drop-shadow-2xl rounded-b-3xl">
                <div></div>
                <div className="text-right"><a className="navLink" href="/register">Sign Up</a> <a className="navLink" href="/login">Login</a></div>
            </div>
        )
    }
}

export default NavBar;