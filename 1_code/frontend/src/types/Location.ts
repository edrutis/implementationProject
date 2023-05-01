import axios, { AxiosResponse } from "axios"
export interface Location {
    address:string
    city:string
    state:string
    zip:string
    capacity:number
    airport:boolean
    storeNumber:string
    phone:number
}

export function validateLocation(data: AxiosResponse['data']): asserts data is Location {}

export function validateLocationArray(data: AxiosResponse['data']): asserts data is Location[] {}