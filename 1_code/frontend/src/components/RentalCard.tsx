import React from "react";

type RentalCardProps = {
    fromLocation:string,
    toLocation:string | null | undefined,
    fromDate:Date,
    toDate:Date | null | undefined,
}

function RentalCard({fromLocation, toLocation, fromDate, toDate}: RentalCardProps) {
    return (
        <div className="bg-white p-5 text-black rounded-3xl">
            <p> The following are vehicles that are available for your rental 
                <span>{toLocation ? "starting " : ""}</span> at <span>{fromLocation} </span> 
                <span>{toLocation ? "and ending at " + toLocation : ""}</span>
                <span>{toDate ? "from " : "on "}</span> 
                <span>{fromDate.toDateString()}</span> 
                <span>{toDate ? "to " + toDate : ""}.</span> 
            </p>
        </div>
    )
}

export default RentalCard;