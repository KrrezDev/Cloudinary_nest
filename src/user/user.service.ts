import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UserService');
  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDb connected');
  }

  async regiterUser(registerUserDto: RegisterUserDto) {
    const { full_name, username, email, password } = registerUserDto;
    try {
      const user = await this.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }
      const newUser = await this.user.create({
        data: {
          full_name: full_name,
          username: username,
          email: email,
          password: bcrypt.hashSync(password, 10),
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: __, ...rest } = newUser;
      return {
        user: rest,
        token: 'ABC',
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUser: LoginUserDto) {
    const { email, password } = loginUser;
    try {
      const user = await this.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new HttpException(
          'User/password not valid ',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPasswordValid = bcrypt.compareSync(
        password,
        (await user).password,
      );
      if (!isPasswordValid) {
        throw new HttpException(
          'email/password not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log('properties: ', user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: __, ...rest } = user;
      return {
        user: rest,
        token: 'ABC',
      };
    } catch (error) {
      throw error;
    }
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
