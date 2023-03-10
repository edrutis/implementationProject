import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { Vehicle } from "src/model/vehicle.schema";
import { VehicleService } from "../service/vehicle.service";
import { JwtService } from '@nestjs/jwt'

@Controller('/api/v1/vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService,
        private jwtService: JwtService
    ) { }
    @Post('/newCar')
    async newCar(@Res() response, @Body() vehicle: Vehicle) {
        const newVehicle = await this.vehicleService.newCar(vehicle);
        return response.status(HttpStatus.CREATED).json({
            newVehicle,
        })
    }
    @Post('/findAt')
    async findAt(@Res() response, @Body() vehicle: Vehicle) {
        const foundVehicles = await this.vehicleService.findAt(vehicle);
        return response.status(HttpStatus.OK).json({
            foundVehicles,
        })
    }
    @Post('/getOne')
    async getOne(@Res() response, @Body() vehicle: Vehicle) {
        const foundVehicle = await this.vehicleService.findByLicense(vehicle);
        return response.status(HttpStatus.OK).json({foundVehicle,})
    }
}