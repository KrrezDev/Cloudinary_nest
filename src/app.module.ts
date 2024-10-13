import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ImagesModule } from './images/images.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [ImagesModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}