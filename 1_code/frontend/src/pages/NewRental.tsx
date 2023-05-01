import axios from "axios";
import React, { useEffect } from "react";
import getLoggedInEmail from "../functions/getLoggedInEmail";
import { validateLocationArray, Location } from "../types/Location";
function NewRental() {
    //@ts-ignore
    const verifyAndSubmit = async(e) => {
        e.preventDefault();
        if (!start || !end || !pickup || !dropoff) {
            alert("Please fill out all fields")
            return
        }
        if (start>end){
          alert("Please select an end date that is after your start date")
          return
        }
        const form = {
            start: start,
            end: end,
            pickup: pickup,
            dropoff: dropoff,
            finalized: false,
            customerEmail: getLoggedInEmail(),
        }
        await axios
        .post("http://localhost:3001/api/v1/rental/newRental", form)
        .then(() => {
            setMessage(`Successfully created new Rental from ${start} to ${end}`);
        })
        .catch(() => {
            setMessage(`Could not create new location rental`);
        });
    }
    const [message, setMessage] = React.useState('')
    const [start, setStart] = React.useState(new Date)
    const [end, setEnd] = React.useState(new Date)
    const [pickup, setPickup] = React.useState('')
    const [dropoff, setDropoff] = React.useState('')
    const [loaded, setLoaded] = React.useState(false)
    const dummy : Location[] = []
    const [locations, setLocations] = React.useState(dummy)
    const fetchLocations = async () => {
        try {
          let response = await fetch('http://localhost:3001/api/v1/location/getAll');
          let json = await response.json();
          return { success: true, data: json };
        } catch (error) {
          console.log(error);
          return { success: false };
        }
      }
      useEffect(() => {
        (async () => {
          setLoaded(false);
          let res = await fetchLocations();
          if (res.success) {
            let locs  = res.data.found
            validateLocationArray(locs)
            locs = locs.filter((loc) => loc.state.toLowerCase() != 'usa')
            setLocations(locs);
            setLoaded(true);
          }
        })();
      }, []);
      
    return(
        <div className="grid grid-cols-1 place-items-center">
            <h1 className="text-7xl">Make a new Reservation</h1>
        <form className="grid grid-cols-1 bg-white text-black rounded-3xl m-20 p-20" onSubmit={verifyAndSubmit}>
            <div><label>Rental starts on:</label> <input type="date" onChange={(e) => setStart(new Date(e.target.value))} /></div>
            <div><label>Rental ends on:</label> <input type="date" onChange={(e) => setEnd(new Date(e.target.value))}/></div>
            {loaded ? <div><label>Rental starts at:</label> <select onChange={(e) => setPickup(e.target.value)}>{locations!.map((loc) => <option key={loc.storeNumber} value={loc.storeNumber}>{loc.city}, {loc.state}</option>)}</select></div> : ''}
            {loaded ? <div><label>Rental ends at:</label> <select onChange={(e) => setDropoff(e.target.value)}>{locations!.map((loc) => <option key={loc.storeNumber} value={loc.storeNumber}>{loc.city}, {loc.state}</option>)}</select></div> : ''}

            <button type="submit">Submit</button>
        </form>
            {message}
        </div>
    )   

}

export default NewRental;