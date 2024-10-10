import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/images'),
    ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
