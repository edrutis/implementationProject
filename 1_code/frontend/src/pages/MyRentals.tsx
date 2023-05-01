import React, { useEffect } from "react";
import getLoggedInEmail from "../functions/getLoggedInEmail";
import { Rental, validateRentalArray } from "../types/Rental";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { locationCodeKeys } from "../constants/locationCode";

const MyRentals = () => {
    const [loaded, setLoaded] = React.useState(false)
    const email = getLoggedInEmail()
    const dummy: Rental[] = []
    const [rentals, setRentals] = React.useState(dummy)

    const nav = useNavigate();
    const fetchRentals = async () => {
        try {
          let response = await axios.post('http://localhost:3001/api/v1/rental/getMyRentals', {customerEmail:email});
          let json = await response.data;
          return { success: true, data: json };
        } catch (error) {
          console.log(error);
          return { success: false };
        }
      }
    useEffect(() => {
        (async () => {
          setLoaded(false);
          let res = await fetchRentals();
          if (res.success) {
            let rents  = res.data.foundRentals
            validateRentalArray(rents)
            setRentals(rents)
            setLoaded(true);
          }
        })();
      }, []);

      if (!loaded) {
        return <div><h1>Loading Please wait</h1></div>
      }
      return <div className="bg-white text-black text-center align-center p-10 m-10 rounded-3xl gap-5 grid grid-cols-1 place-content-center">
        <table>
            <thead className="bg-black text-white rounded-full"><th>Start Date</th><th>End Date</th><th>Pickup At</th><th>Drop off At</th><th>View?</th></thead><tbody>
             {rentals.map((rental) => <tr><td>{rental.start.split('T')[0]}</td><td>{rental.end.split('T')[0]}</td><td>{locationCodeKeys[rental.pickup]}</td><td>{locationCodeKeys[rental.dropoff]}</td><td><button onClick={()=>nav(`/viewRental/${rental._id!}`)}>View</button></td></tr>)}
            </tbody>
        </table>
      </div>

}

export default MyRentals;