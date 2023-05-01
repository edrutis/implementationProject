import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { Rental } from "src/model/rental.schema";
import { RentalService } from "../service/rental.service";
import { VehicleService } from "src/service/vehicle.service";
import { JwtService } from '@nestjs/jwt'
import { VehicleController } from "./vehicle.controller";

@Controller('/api/v1/rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService,
        private jwtService: JwtService
    ) { }
    @Post('/newRental')
    async newRental(@Res() response, @Body() rental: Rental) {
        const newRental = await this.rentalService.newRental(rental);
        return response.status(HttpStatus.CREATED).json({
            newRental,
        })
    }
    @Post('/findByLicense')
    async getOne(@Res() response, @Body() {vehicle}) {
        console.log({vehicle})
        const foundRental = await this.rentalService.findByLicense({vehicle});
        return response.status(HttpStatus.OK).json({foundRental,})
    }
    @Post('/getMyRentals')
    async getMyRentals(@Res() response, @Body() rental: Rental) {
        const foundRentals = await this.rentalService.findByEmail(rental);
        return response.status(HttpStatus.OK).json({foundRentals,})
    }
    @Post('/findById')
    async findById(@Res() response, @Body() {id}) {
        const foundRental = await this.rentalService.findById({id});
        return response.status(HttpStatus.OK).json({foundRental,})
    }
    @Post('/pick')
    async pick(@Res() response, @Body() {id, license}) {
        const foundRental = await this.rentalService.pick({id, license});
        return response.status(HttpStatus.OK).json({foundRental,})
    }
}