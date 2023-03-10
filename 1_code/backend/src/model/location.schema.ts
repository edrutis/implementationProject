import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type LocationDocument = Location & Document;
@Schema()
export class Location {
    @Prop({required:true})
    address: string;
    @Prop({required:true})
    city: string;
    @Prop({required:true})
    state: string
    @Prop({required:true})
    capacity: number
    @Prop({required:true})
    airport: boolean
    @Prop({required:true})
    zip: string
    @Prop({required:true})
    phone: string
    @Prop({required:true, unique:true})
    storeNumber: string
}
export const LocationSchema = SchemaFactory.createForClass(Location)