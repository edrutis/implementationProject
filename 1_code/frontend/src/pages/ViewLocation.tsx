import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import getUserType from "../functions/getUserType";
import { Location, validateLocation } from "../types/Location";
import { validateVehicle, validateVehicleArray, Vehicle } from "../types/Vehicle";

export default function viewLocation() {
  let navigate = useNavigate();
  let user = getUserType()
  if (user == undefined){
    navigate('/')
  }
  const { locID } = useParams();
  const [loaded, setLoaded] = React.useState(false);
  const [location, setLocation] = React.useState({});
  const dummy: Vehicle[] = []
  const [vehicleArray, setVehicleArray] = React.useState(dummy)

  const deleteLocation = async () => {

    if(confirm("Are you sure you want to delete " + locID + "?")){
      if(vehicleArray.length > 0){
        alert("You can't delete a location with vehicles. Please move them to another location or delete them altogether.")
        return
      }
      await axios.delete("http://localhost:3001/api/v1/location/deleteOne", { data: { storeNumber: locID }}).then(()=>navigate('/viewLocations'))
    }
  }
  const fetchLocations = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3001/api/v1/location/getOne",
        { storeNumber: locID }
      );
      let json = await response.data;
      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const fetchVehicles = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3001/api/v1/vehicle/findAt",
        { currentHome: locID }
      );
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
      let res = await fetchLocations();
      let res2 = await fetchVehicles();
      if (res.success) {
        const loc = res.data.find;
        validateLocation(loc);
        setLocation(loc);
      }
      if (res2.success) {
        const veh = res2.data.foundVehicles;
        validateVehicleArray(veh)
        setVehicleArray(veh)
      }
      setLoaded(res.success && res2.success);
    })();
  }, []);
  validateLocation(location);
  if (!loaded) {
    return <div>Loading, please wait</div>;
  }
  if (getUserType() === 'Customer') {
    return (
      <div className="bg-slate-500 w-full text-black rounded-3xl p-10 pt-5 gap-5  my-10 grid grid-cols-1">
        <h1 className="text-3xl text-white ">Checked in Cars:</h1>
                <div className="grid grid-cols-2 gap-5">
                  {vehicleArray.map((car) => <VehicleCard license={car.license} image={car.photo} make={car.make} model={car.model} year={car.year}/>)}
                </div>
        </div>
    )

  }

  return (
    <div className="grid grid-cols-2 justify-items-center">
      <div className="">
      <div className="bg-white text-black p-10 m-5 text-left rounded-3xl grid grid-cols-2 gap-2">
        <label>Store Number:</label>
        {location.storeNumber}
        <label>Address:</label>
        {location.address}
        <label>City:</label>
        {location.city}
        <label>State:</label>
        {location.state}
        <label>ZIP Code:</label>
        {location.zip}
        <label>Phone:</label>
        {location.phone}
        <label>Capacity:</label>
        {location.capacity}
        <label>Airport Located:</label>
        {location.airport ? "Yes" : "No"}
      </div>
      {user === 'Admin' ? <button onClick={deleteLocation}>Delete this location?</button> : ""}
      {user !== 'Customer' ? <button onClick={()=>navigate(`/checkOut/${location.storeNumber}`)} >Check out vehicles here</button> : ""}
      </div>
      <div className="bg-slate-500 w-full text-black rounded-3xl p-10 pt-5 gap-5 m-5 grid grid-cols-1">
        <h1 className="text-3xl text-white ">Checked in Cars:</h1>
                  {vehicleArray.map((car) => <VehicleCard license={car.license} image={car.photo} make={car.make} model={car.model} year={car.year}/>)}

        </div>
    </div>
  );
}

