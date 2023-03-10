import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from 'src/model/location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async newLocation(location: Location): Promise<Location> {
    const reqBody = {
      address: location.address,
      city: location.city,
      state: location.state,
      zip: location.zip,
      capacity: location.capacity,
      airport: location.airport,
      storeNumber: location.storeNumber,
      phone: location.phone,
    };
    const newLocation = new this.locationModel(reqBody);
    return newLocation.save();
  }

  async getOne({ storeNumber }): Promise<Location> {
    return await this.locationModel
      .findOne({ storeNumber: storeNumber })
      .exec();
  }

  async getAll(): Promise<Location[]> {
    return await this.locationModel.find().exec();
  }

  async deleteLocation({storeNumber}){
    return await this.locationModel.deleteOne({storeNumber:storeNumber}).exec();
  }
}
