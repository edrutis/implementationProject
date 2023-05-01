import { AxiosResponse } from "axios"

export interface Rental{
    pickup:string
    dropoff:string
    start: Date
    end: Date
    email: string
    _id?: string
    vehicle?:string
}
export function validateRental(data: AxiosResponse['data']):asserts data is Rental {} 
export function validateRentalArray(data: AxiosResponse['data']):asserts data is Rental[] {} 