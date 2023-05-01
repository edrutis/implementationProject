import axios from "axios";
import React, { useEffect } from "react";
import LocationCard from "../components/LocationCard";
import { Location, validateLocation, validateLocationArray } from "../types/Location";

export default function ViewLocations() {
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
            const locs  = res.data.found
            validateLocationArray(locs)
            setLocations(locs);
            setLoaded(true);
          }
        })();
      }, []);

      if(!loaded){
        return <div>Loading, please wait</div>
      }

return (
  <div className="grid grid-cols-2">
    {locations.map((location) =>  <LocationCard city={location.city} code={location.storeNumber} state={location.state} airport={location.airport}/>)}
  </div>);
}
