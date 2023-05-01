import React from 'react'
import { useNavigate } from 'react-router-dom'
import plane from '../assets/plane.png'
type LocationProps = {
    code: string,
    city: string, 
    state: string
    airport: boolean
}

export default function LocationCard({code, city, state, airport}: LocationProps){
    let navigate = useNavigate()
    return <div key={code} className=' cursor-pointer hover:scale-105 transition duration-150 bg-white rounded-3xl grid grid-cols-2 text-black p-5 m-5' onClick={()=>navigate(`/viewLocation/${code}`)}>
        <div className='rounded-l-2xl text-center bg-black text-white uppercase text-5xl'>{code}</div>
        <div className='grid grid-cols-2 justify-items-end'><span>{city}, {state}</span> {airport? <img width="50px"src={plane} alt="plane icon"/>: ""}</div>
    </div>
}