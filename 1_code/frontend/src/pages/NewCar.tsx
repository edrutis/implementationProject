import React from "react";
import { useState } from 'react';
import { classifications } from "../types/classifications";
import RentCar from "./RentCar";
import axios from "axios";


const NewCar = () => {
    const  [location, setLocation] = useState("");
    const  [make, setMake] = useState("");
    const  [model, setModel] = useState("");
    const  [year, setYear] = useState(2023);
    const  [mileage, setMileage] = useState(0);
    const  [vin, setVin] = useState("");
    const  [license, setLicense] = useState("");
    const  [classification, setClassification] = useState("Sedan");
    const  [seats, setSeats] = useState(2);
    const  [mpg, setMpg] = useState(20);
    const  [basePrice, setBasePrice] = useState(100);
    const  [photo, setPhoto] = useState('');
    const  [message, setMessage] = useState('');
    //@ts-ignore
    const verifyVehicle = async (e) => {
        e.preventDefault()
        if (location === "") {
            alert("Must provide valid location")
            return
        }
        if (make === "") {
            alert("Must provide valid make")
            return
        }
        if (model === "") {
            alert("Must provide valid model")
            return
        }
        if (year < 1999 || year > 2024) {
            alert("Must provide valid year of manufacture")
            return
        }
        if (mileage < 0) {
            alert("Must provide valid mileage")
            return
        }
        if (vin === "" || vin.length !== 17) {
            alert("Must provide valid VIN (17 characters)")
            return
        }
        if (license === "") {
            alert("Must provide valid License Plate ")
            return
        }
        if (!classifications.includes(classification)) {
            alert("Must provide valid classification")
            return
        }
        if (seats < 2 || seats === 3 || seats > 8) {
            alert("Must provide number of seats >=2 <=8 !==3")
            return 
        }
        if (mpg < 10 || mpg > 50) {
            alert("Must provide valid fuel efficiency")
            return
        } 
        if (basePrice < 50 || basePrice > 400) {
            alert("Must provide valid base price 50 < x < 400")
            return
        }
        if (!photo) {
            alert("Must provide a photo for listing ")
            return
        }
        const form = {
            make: make,
            model: model,
            year: year,
            basePrice: basePrice,
            mileage: mileage,
            mpg: mpg,
            vin: vin,
            license: license,
            classification: classification,
            seats: seats,
            photo: photo,
            currentHome: location
        }
        const { data } = await axios.post("http://localhost:3001/api/v1/location/getOne", {storeNumber: location})
        if (!data) {
            setMessage(`${location} does not exist, please enter a valid storeNumber`)
            return
        }
        if (data.status === parseInt('401')) {
            setMessage(data.response)
            return 
        } 
        await axios.post("http://localhost:3001/api/v1/vehicle/newCar", form).then(() => setMessage("Successfully added vehicle"))
    }
    return (
        <div className="grid p-5 lg:p-10">
            
            <form onSubmit={(e) => verifyVehicle(e)} className="text-center max-w-7xl bg-white text-slate-800 rounded-3xl p-5 gap-5 justify-center">
                <div className="text-right grid grid-cols-2 gap-5">
                <label>Rental Location:</label><input type="text" name="location" onChange={(e) => setLocation(e.target.value)}/>
                <label>Make:</label><input type="text" name="make" onChange={(e) => setMake(e.target.value)}/>
                <label>Model:</label><input type="text" name="model" onChange={(e) => setModel(e.target.value)}/>
                <label>Year:</label><input type="number" name="year" defaultValue={2023} onChange={(e) => setYear(parseInt(e.target.value))}/>
                <label>Milege:</label><input type="number" name="mileage" defaultValue={0} onChange={(e) => setMileage(parseInt(e.target.value))}/>
                <label>VIN:</label><input type="text" name="VIN" onChange={(e) => setVin(e.target.value)}/>
                <label>License Plate:</label><input type="text" name="license" onChange={(e) => setLicense(e.target.value)}/>
                <label>Class:</label>
                <select name="class" onChange={(e) => setClassification(e.target.value)}>
                    <option value="sedan">Sedan</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    <option value="suv">SUV</option>
                    <option value="crossover">Crossover</option>
                </select>
                <label>Seats:</label>
                <select name="class" onChange={(e) => setSeats(parseInt(e.target.value))}>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                </select>
                <label>MPG:</label><input type="number" name="mpg" defaultValue={20} onChange={(e) => setMpg(parseInt(e.target.value))}/>
                <label>Base Price:</label><input type="number" name="basePrices" defaultValue={100} onChange={(e) => setBasePrice(parseInt(e.target.value))}/>
                <label>Photo Upload:</label><input type="text" onChange={(e) => setPhoto(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="text-white">{message}</div>
        </div>

    )
}

export default NewCar;