import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type VehicleDocument = Vehicle & Document;
@Schema()
export class Vehicle {
    @Prop({required:true})
    make: string;
    @Prop({required:true})
    model: string;
    @Prop({required:true})
    year: number
    @Prop({required:true})
    mileage: number
    @Prop({required:true})
    mpg: number
    @Prop({required:true, length:17})
    vin: string
    @Prop({required:true, unique:true})
    license: string
    @Prop({required:true})
    classification: string
    @Prop({required:true})
    seats: number
    @Prop({required:true})
    basePrice: number
    @Prop({required:true})
    photo: string
    @Prop({required:true})
    currentHome: string
    @Prop({required:true})
    history: string[]
}
export const VehicleSchema = SchemaFactory.createForClass(Vehicle)