import axios, { AxiosResponse } from "axios"
export interface Vehicle {
    make:string
    model:string
    year:number
    mileage:number
    mpg:number
    classification:string
    vin:string
    license:string
    seats:number
    photo:string
    currentHome:string
    basePrice:number
    history:string[]
}

export function validateVehicle(response:AxiosResponse['data']):asserts response is Vehicle{ }

export function validateVehicleArray(response:AxiosResponse['data']):asserts response is Vehicle[]{ }
