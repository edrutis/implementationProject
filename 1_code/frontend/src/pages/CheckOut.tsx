import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateLocation } from "../types/Location";
import { Vehicle, validateVehicleArray } from "../types/Vehicle";
import React from "react";
import { locationCodeKeys } from "../constants/locationCode";
import VehicleCardCheckout from "../components/VehicleCardCheckout";

const CheckOut = () => {
    const [loaded, setLoaded] = React.useState(false)
    const nav = useNavigate()
    const dummy : Vehicle[] = []
    const [vehicleArray, setVehicleArray] = React.useState(dummy)
    let { locId } = useParams()
    locId = locId ?? ''
    //@ts-ignore
    const locationName = locationCodeKeys[locId]
    locId += 'co'
    const fetchVehicles = async() => {
        try {
            let response = await axios.post(
              "http://localhost:3001/api/v1/vehicle/findAt",
              { currentHome: locId }
            );
            let json = await response.data;
            return { success: true, data: json };
          } catch (error) {
            console.log(error);
            return { success: false };
          }
    }
    const checkOut = async(license:string) => {
        let res = await axios.post('http://localhost:3001/api/v1/vehicle/pick', { license:license, loc:"cousa" })
        nav('/')
    }
    useEffect(() => {
        (async () => {
          setLoaded(false);
          let res = await fetchVehicles();
          if (res.success) {
            const veh = res.data.foundVehicles;
            validateVehicleArray(veh)
            setVehicleArray(veh)
          }
          setLoaded(res.success);
        })();
      }, []);

      if(!loaded){
        return <h1>LOADING NOW PLEASE WAIT</h1>
      }

      return <div>
      <div className="bg-slate-500 w-full text-black rounded-3xl p-10 pt-5 gap-5  my-10 grid grid-cols-1">
      <h1 className="text-3xl text-white ">Selected vehicles at {locationName}:</h1>
              <div className="grid grid-cols-2 gap-5">
                {vehicleArray.map((car) => <VehicleCardCheckout license={car.license} image={car.photo} make={car.make} model={car.model} year={car.year} checkoutFunct={checkOut}/>)}
              </div>
      </div>
  </div>

}

export default CheckOut