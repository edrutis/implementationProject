import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rental, validateRental } from "../types/Rental";
import { Vehicle, validateVehicleArray } from "../types/Vehicle";
import VehicleCardRent from "../components/VehicleCardRent";

const ViewRental = () => {
    const nav = useNavigate();
    //@ts-ignore
    const dummy: Rental = {}
    const oneDays = 60*60*24*1000
    const today = new Date()
    const vehDummy: Vehicle[] =[]
    const { rid } = useParams();
    const [loaded, setLoaded] = React.useState(false)
    const [rental, setRental] = React.useState(dummy)
    const [start, setStart] = React.useState(new Date)
    const [vehicles, setVehicles] = React.useState(vehDummy)
    const [days, setDays] = React.useState(1)
    const [end, setEnd] = React.useState(new Date)

    const fetchRental = async() => {
        try {
            let response = await axios.post('http://localhost:3001/api/v1/rental/findById', { id: rid });
            let json = await response.data;
            return { success: true, data: json };
          } catch (error) {
            console.log(error);
            return { success: false };
          }
    }


  const checkOut = async(license:string) => {
    try {
      let response = await axios.post('http://localhost:3001/api/v1/rental/pick', { id: rid, license:license, location:rental.pickup+"co" });
      
      if (response) {
        await axios.post('http://localhost:3001/api/v1/vehicle/pick', { license:license, loc:rental.pickup+"co" })
      }
      nav('/')
    }catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  const fetchVehicles = async (locId:string) => {
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
    useEffect(() => {
        (async () => {
          setLoaded(false);
          let res = await fetchRental();
          if (res.success) {
            let rents  = res.data.foundRental
            validateRental(rents)
            setRental(rents)
            setStart(new Date(rents.start))
            setEnd(new Date(rents.end))
            let vehicles = await fetchVehicles(rents.pickup)
            if (vehicles.success){
              let cars = vehicles.data.foundVehicles
              validateVehicleArray(cars)
              setVehicles(cars)
            }
            setLoaded(true);
          }
        })();
      }, []);
    
    
    if (!loaded) {
        return <h1>Loading! Please wait...</h1>
    }
    if (start.getTime() - today.getTime() > oneDays) {
        return <div className="grid grid-cols-1 place-content-center p-10">
            <p>This rental is not eligible to select a vehicle yet. Please return with &lt;= one day left</p>
            <button onClick={()=>nav('/myRentals')}>Go back?</button>
        </div>
    }
    if (rental.vehicle) {
      return <div>You are renting {rental.vehicle} from {start} to {end} starting in {rental.pickup} and ending in {rental.dropoff} </div>
    }
    
    return <div>
        <div className="bg-slate-500 w-full text-black rounded-3xl p-10 pt-5 gap-5  my-10 grid grid-cols-1">
        <h1 className="text-3xl text-white ">Checked in Cars:</h1>
                <div className="grid grid-cols-2 gap-5">
                  {vehicles.map((car) => <VehicleCardRent license={car.license} image={car.photo} make={car.make} model={car.model} year={car.year} price={car.basePrice * (end.getDate()-start.getDate())} checkoutFunct={checkOut}/>)}
                </div>
        </div>
    </div>

    
}

export default ViewRental
