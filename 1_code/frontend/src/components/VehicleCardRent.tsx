import React from "react";
import { useNavigate } from "react-router-dom";

type vCardProps = {
  make: string;
  model: string;
  year: number;
  image: string;
  license: string;
  price: number;
  checkoutFunct: (license:string)=>{}
};

function VehicleCardRent({ make, model, year, image, license, price, checkoutFunct }: vCardProps) {
    const navigate= useNavigate()
    
  return (
    <div key={license} className="justify-center justify-items-center items-center">
      <div onClick={() => {let a = confirm(`Would you like to rent this car for ${price}`); if(a) checkoutFunct(license) }} className="cursor-pointer hover:scale-105 transition duration-500  bg-white md:w-full  w-screen rounded-md aspect-square text-black max-w-xl">
        <div className="h-5/6">
          <img className="w-full" src={image} alt="Picture of a vehicle" />
        </div>
        <div className="text-left text-xl md:text-3xl py-2 px-1">
          <b>
            {year} {make}
          </b>{" "}
          <em>{model}</em>
          <div>${price} Total</div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCardRent;
