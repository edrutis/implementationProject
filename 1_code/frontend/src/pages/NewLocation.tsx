import axios from "axios";
import React from "react";

export default function NewLocation() {
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [capacity, setCapacity] = React.useState(0);
  const [airport, setAirport] = React.useState(false);
  const [storeNumber, setStoreNumber] = React.useState("");
  const [message, setMessage] = React.useState("");
  //@ts-ignore
  const newLocation = async (e) => {
    e.preventDefault();
    if (
      address === "" ||
      city === "" ||
      state === "" ||
      zip === "" ||
      phone === "" ||
      capacity === 0 ||
      storeNumber === ""
    ) {
      alert("Please fill in all fields");
    }
    const form = {
      address: address,
      city: city,
      state: state,
      zip: zip,
      capacity: capacity,
      airport: airport,
      storeNumber: storeNumber,
      phone: phone,
    };
    await axios
      .post("http://localhost:3001/api/v1/location/newLocation", form)
      .then(() => {
        setMessage(`Successfully created new Location ${city}`);
      })
      .catch(() => {
        setMessage(`Could not create new location ${city}`);
      });
  };
  return (
    <div className="grid p-5 lg:p-10">
      <form
        onSubmit={(e) => newLocation(e)}
        className="text-center max-w-7xl bg-white text-slate-800 rounded-3xl p-5 gap-5 justify-center"
      >
        <div className="text-right grid grid-cols-2 gap-5">
          <label>Street Address:</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>City:</label>
          <input
            type="text"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <label>State:</label>
          <input
            type="text"
            name="state"
            onChange={(e) => setState(e.target.value)}
          />
          <label>ZIP Code:</label>
          <input
            type="text"
            name="zip"
            onChange={(e) => setZip(e.target.value)}
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Capacity:</label>
          <input
            type="number"
            name="cap"
            onChange={(e) => setCapacity(parseInt(e.target.value))}
          />
          <label>Store Number:</label>
          <input
            type="text"
            name="license"
            onChange={(e) => setStoreNumber(e.target.value)}
          />
          <label>Airport Location?:</label>
          <input
            type="checkbox"
            name="airport"
            onChange={(e) => setAirport(!airport)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="text-white">{message}</div>
    </div>
  );
}
