import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from 'src/model/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async newCar(vehicle: Vehicle): Promise<Vehicle> {
    const reqBody = {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      basePrice: vehicle.basePrice,
      mileage: vehicle.mileage,
      mpg: vehicle.mpg,
      vin: vehicle.vin,
      license: vehicle.license,
      classification: vehicle.classification,
      seats: vehicle.seats,
      photo: vehicle.photo,
      currentHome: vehicle.currentHome,
      history:[]
    };
    const newVehicle = new this.vehicleModel(reqBody);
    return newVehicle.save();
  }

  async getOne(license): Promise<Vehicle> {
    return await this.vehicleModel.findOne({ license }).exec();
  }

  async findAt({ currentHome }): Promise<Vehicle[]> {
    return await this.vehicleModel.find({ currentHome: currentHome }).exec();
  }

  async findByLicense({ license }): Promise<Vehicle> {
    return await this.vehicleModel.findOne({ license: license }).exec();
  }

  async newHistory({ license, newHistory }) {
    return await this.vehicleModel.updateOne({ license:license }, {$set:{ history: newHistory }}).exec();
  }

  async pick ({license, loc}) {
    return await this.vehicleModel.updateOne({ license:license}, {$set:{currentHome:loc}}).exec()
  }
}
