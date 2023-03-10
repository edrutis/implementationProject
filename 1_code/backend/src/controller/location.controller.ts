import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Location } from 'src/model/location.schema';
import { LocationService } from '../service/location.service';
import { JwtService } from '@nestjs/jwt';

@Controller('/api/v1/location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private jwtService: JwtService,
  ) {}
  @Post('/newLocation')
  async newLocation(@Res() response, @Body() location: Location) {
    const newLocation = await this.locationService.newLocation(location);
    return response.status(HttpStatus.CREATED).json({
      newLocation,
    });
  }
  @Post('/getOne')
  async getOne(@Res() response, @Body() location: Location) {
    const find = await this.locationService.getOne(location);
    return response.status(HttpStatus.CREATED).json({
      find,
    });
  }
  @Get('/getAll')
  async getAll(@Res() response, @Body() location: Location) {
    const found = await this.locationService.getAll();
    return response.status(HttpStatus.CREATED).json({
      found,
    });
  }
  @Delete('/deleteOne')
  async deleteOne(@Res() response, @Body() location: Location) {
    const respo = await this.locationService.deleteLocation(location);
    return response.status(HttpStatus.CREATED).json({
      respo,
    });
  }
}
