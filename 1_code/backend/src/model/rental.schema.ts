import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type RentalDocument = Rental & Document;
@Schema()
export class Rental {
    @Prop({required:true})
    start: Date;
    @Prop({required:true})
    end: Date;
    @Prop({required:true})
    pickup: string
    @Prop({required:true})
    dropoff: string
    @Prop({required:false})
    vehicle: string
    @Prop({required:true})
    finalized: boolean
    @Prop({required:true})
    customerEmail: string
}
export const RentalSchema = SchemaFactory.createForClass(Rental)