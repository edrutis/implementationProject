import LocationCard from '../components/LocationCard'
import NavBar from '../components/NavBar'
import VehicleCard from '../components/VehicleCard'
import { render, fireEvent, screen } from "@testing-library/react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
const lc  = {
    code: 'Test',
    city: 'Test', 
    state: 'Test',
    airport: false
}

const vc = {
    make: 'Brand',
    model: 'Model',
    year: 1969,
    image: 'https://i.redd.it/w3kr4m2fi3111.png',
    license: 'PlateNo'
}

test("increments counter", () => {
    // render the component on virtual dom
    render(<LocationCard city={lc.city} state={lc.state} airport={lc.airport} code={lc.code}/>);

    //assert the expected result
    expect()
    });