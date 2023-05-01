import React from 'react';
import RentalCard from '../components/RentalCard';
import VehicleCard from '../components/VehicleCard';

const RentCar = ( ) => {
    const x = new Date("4/12/2023");

 return (
    <div className="max-w-screen max-h-screen flex flex-col">
    <h1 className="text-left text-6xl m-5 text-transparent bg-clip-text inline-block bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">Select your car:</h1>
    <RentalCard fromDate={x} fromLocation={"Tampa Bay"} toLocation={undefined} toDate={undefined}/>
  <div className='w-full grid md:grid-cols-2 md:gap-x-2 p-2 md:gap-y-10 gap-y-5 justify-center overflow-y-auto'>
    <VehicleCard make="Lamborghini" model="Murcielago" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
    <VehicleCard make="Ford" model="Focus" year={2012} image="https://www.roscoes.net/wp-content/uploads/2018/05/30704675_768375540008477_4777063845829017600_n.jpg"/>
  </div></div>
 )
}

export default RentCar;