import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rental, RentalDocument } from 'src/model/rental.schema';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel(Rental.name) private rentalModel: Model<RentalDocument>,
  ) {}

  async newRental(rental: Rental): Promise<Rental> {
    const reqBody = {
      start: rental.start,
      end: rental.end,
      pickup: rental.pickup,
      dropoff: rental.dropoff,
      finalized: false,
      customerEmail: rental.customerEmail,
    };

    const newRental = new this.rentalModel(reqBody);
    return newRental.save();
  }

  async getOne(license): Promise<Rental> {
    return await this.rentalModel.findOne({ license }).exec();
  }


  async findByLicense({ vehicle }): Promise<Rental> {
    let x = vehicle
    return await this.rentalModel.findOne({ vehicle:x }).exec();
  }

  async findByEmail({customerEmail}): Promise<Rental[]> {
    return await this.rentalModel.find({customerEmail:customerEmail}).exec();
  }

  async findById({id}):Promise<Rental>{
    return await this.rentalModel.findOne({_id:id}).exec();
  }

  async pick({id, license}){
    return await this.rentalModel.updateOne({_id:id},{$set:{vehicle:license}}).exec();
  }

}
