import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { isAuthenticated } from './app.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User, UserSchema } from './model/user.schema';
import { Vehicle, VehicleSchema } from './model/vehicle.schema';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './controller/vehicle.controller';
import { Location, LocationSchema } from './model/location.schema';
import { LocationService } from './service/location.service';
import { LocationController } from './controller/location.controller';
import { Rental, RentalSchema } from './model/rental.schema';
import { RentalService } from './service/rental.service';
import { RentalController } from './controller/rental.controller';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://main:pass@cluster0.fw6wrvn.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema}]),
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema}]),
    MongooseModule.forFeature([{ name: Rental.name, schema: RentalSchema}]),

    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      })
    }),
    JwtModule.register({
     secret,
     signOptions: { expiresIn: '2h' },
   }),
   ServeStaticModule.forRoot({
     rootPath: join(__dirname, '..', 'public'),
   }),
  ],
  controllers: [AppController, UserController, VehicleController, LocationController, RentalController],
  providers: [AppService, UserService, VehicleService, LocationService, RentalService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
      )
      
  }
}

