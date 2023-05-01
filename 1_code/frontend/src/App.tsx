import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentCar from "./pages/RentCar";
import NewCar from "./pages/NewCar";
import NewRental from "./pages/NewRental";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import checklogin from "./functions/checklogin";
import Logout from "./pages/Login/Logout";
import NewLocation from "./pages/NewLocation";
import ViewLocations from "./pages/ViewLocations";
import ViewLocation from "./pages/ViewLocation";
import ViewVehicle from "./pages/ViewVehicle";
import getUserType from "./functions/getUserType";
import VehicleHistory from "./pages/VehicleHistory";
import MyRentals from "./pages/MyRentals";
import ViewRental from "./pages/ViewRental";
import CheckOut from "./pages/CheckOut";
import CheckIn from "./pages/CheckIn";


function App() {
  const user = getUserType() 
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(checklogin());
  let home = <Login setIsLoggedIn={setIsLoggedIn}/>
  if (user === 'Admin'){
    home = <ViewLocations/>
  }else if (user === 'Customer'){
    home = <NewRental/>
  }else if (user === 'Employee'){
    home = <NewLocation/>
  }
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={home} />
        <Route path="/viewLocations" element={<ViewLocations />} />
        <Route path="/newLocation" element={<NewLocation />} />
        <Route path="/rentCar" element={<RentCar />} />
        <Route path="/newCar" element={<NewCar />} />
        <Route path="/newRental" element={<NewRental />} />
        <Route path="/myRentals" element={<MyRentals />} />
        <Route path="/viewRental/:rid" element={<ViewRental/>}/>
        <Route path="/checkOut/:locId" element={<CheckOut/>}/>
        <Route path="/checkIn" element={<CheckIn/>}/>

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/logout"
          element={<Logout setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/viewLocation/:locID" element={<ViewLocation/>}/>
        <Route path="/viewVehicle/:license" element={<ViewVehicle/>}/>
        <Route path="/vehicleHistory/:license" element={<VehicleHistory/>}/>

      </Routes>
    </Router>
  );
}

export default App;
