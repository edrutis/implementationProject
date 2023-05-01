import axios from "axios";
import React, { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import getUserType from "../functions/getUserType";
import { validateVehicle, Vehicle } from "../types/Vehicle";

export default function ViewVehicle() {
    const { license } = useParams();
    const userType = getUserType();
    const [vehicle, setVehicle] = React.useState({})
    const [loaded, setLoaded] = React.useState(false)
    let navigate = useNavigate();

    const historyPage = () => {
      navigate(`/vehicleHistory/${license}`)
    }
    const fetchVehicle = async () => {
        try {
          let response = await axios.post(
            "http://localhost:3001/api/v1/vehicle/getOne",
            { license: license }
          );
          let json = await response.data;
          return { success: true, data: json };
        } catch (error) {
          console.log(error);
          return { success: false };
        }
    };
    useEffect(() => {
        (async () => {
          setLoaded(false);
          let res = await fetchVehicle();
          if (res.success) {
            const veh = res.data.foundVehicle;
            validateVehicle(veh);
            setVehicle(veh);
          }
          setLoaded(res.success);
        })();
      }, []);
    validateVehicle(vehicle)
    if(!loaded){
        return <div>Loading...</div>
    }
    if (userType === 'Customer' || userType === undefined) {
        return (
            <div className="bg-white rounded-3xl grid grid-cols-1 text-black max-w-lg justify-items-center">
                <img src={vehicle.photo} alt={`Picture of ${vehicle.model}`}/>
                <p>This {vehicle.year} {vehicle.make} {vehicle.model} will set you back ${vehicle.basePrice}.00 per day.</p>
            </div>
        )
    }
    return <div className="grid grid-cols-1 justify-items-center"><div className="bg-white text-black grid grid-cols-2 justify-items-center p-10 m-10 rounded-3xl">
        <label>Make:</label>{vehicle.make}
        <label>Model:</label>{vehicle.model}
        <label>Year:</label>{vehicle.year}
        <label>Base Price:</label>{vehicle.basePrice}
        <label>Current Location:</label>{vehicle.currentHome}
        

    </div>
    <button onClick={historyPage}>View/Add History</button>
    <img src={vehicle.photo} alt={`Picture of ${vehicle.model}`}/>
    </div>
}