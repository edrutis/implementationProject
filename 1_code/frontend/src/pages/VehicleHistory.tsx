import axios from "axios";
import React, { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import getUserType from "../functions/getUserType";
import { validateVehicle, Vehicle } from "../types/Vehicle";

export default function VehicleHistory() {
    const { license } = useParams();
    const userType = getUserType();
    const [vehicle, setVehicle] = React.useState({})
    const [loaded, setLoaded] = React.useState(false)
    const [exHistory, setExHistory] = React.useState([''])
    const [newHistory, setNewHistory] = React.useState("")
    const [message, setMessage] = React.useState("")
    let navigate= useNavigate();
    if (userType === 'Customer'){
        redirect('/')
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
    //@ts-ignore
    const validateThenSubmit = async(e) => {
        e.preventDefault();
        if (newHistory === ''){
            return
        }else {
            const hist = exHistory
            hist.push(newHistory)
            await axios
            .post("http://localhost:3001/api/v1/vehicle/newHistory", {license:license, newHistory:hist})
            .then(() => {
              navigate(`/viewVehicle/${license}`)
            })
            .catch(() => {
              setMessage(`Could not add history to ${license}`);
            });
        }
    }

    useEffect(() => {
        (async () => {
          setLoaded(false);
          let res = await fetchVehicle();
          if (res.success) {
            const veh = res.data.foundVehicle;
            validateVehicle(veh);
            setVehicle(veh);
            setExHistory(veh.history)
          }
          setLoaded(res.success);
        })();
      }, []);
    validateVehicle(vehicle)
    if(!loaded){
        return <div>Loading...</div>
    }

    return <div className="grid grid-cols-1 justify-items-center">
        <h1 className="text-7xl">License # {vehicle.license} <br/>Facts and History:</h1>
        <div className="grid grid-cols-2 gap-10">
        <div className="bg-white text-black grid grid-cols-2 justify-items-center p-10 m-10 rounded-3xl">
        <label>Make:</label>{vehicle.make}
        <label>Model:</label>{vehicle.model}
        <label>Year:</label>{vehicle.year}
        <label>Base Price:</label>{vehicle.basePrice}
        <label>Current Location:</label>{vehicle.currentHome}
        </div>
    <form className="grid grid-cols-1 bg-white text-black gap-10 m-10 rounded-3xl p-10" onSubmit={(e)=>validateThenSubmit(e)}>
        <label>History: </label>
        <textarea defaultValue={vehicle.history.join("\n")} disabled={true}/>
        <label>New history: </label>
        <textarea onChange={(e) => setNewHistory(e.target.value)}/>
        <button type="submit">Submit</button>
    </form></div>
    {message}
    
    </div>
}