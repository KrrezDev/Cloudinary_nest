import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'helpers/pagination.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config/envs';
import { AuthGuard } from './guards/auth.guard';
@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UserService');
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDb connected');
  }
  async usernameUser(username: string) {
    const user = await this.user.findUnique({
      where:{username: username}
    })
    if (user){
      throw new HttpException('username already exists', HttpStatus.BAD_REQUEST);
    }
    return user
  }
  async emailUser(email: string){
    const user = await this.user.findUnique({
      where: {email}
    })
    if (user){
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    return user
  }
  async regiterUser(registerUserDto: RegisterUserDto) {
    const { full_name, username, email, password } = registerUserDto;
    try {
      await this.usernameUser(username);
      await this.emailUser(email);
      const newUser = await this.user.create({
        data: {
          full_name: full_name,
          username: username,
          email: email,
          password: bcrypt.hashSync(password, 10),
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: __,created_at:_created_at, ...rest } = newUser;
      return {
        user: rest,
        token: await this.signJWT(rest),
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
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(
          'email/password not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: __, created_at: _created_at, ...rest } = user;
      return {
        user: rest,
        token: await this.signJWT(rest),
      };
    } catch (error) {
      throw error;
    }
  }

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async verfyToken(token: string){
    try {
  
      const {sub, iat, exp, ...user} = this.jwtService.verify(token,{
        secret: envs.jwtSecret,
      });
      return {
        user: user,
        token: await this.signJWT(user),
      }
    } catch (error) {
      throw error;
    }
  }
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.user.count();
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.user.findMany({
        select: {
          id: true,
          full_name: true,
          username: true,
          email: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.user.findUnique({
      where: {
        id: id,
      }
    })
    if  (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const {password, created_at, ...rest} = user;
    return {
      user: rest,
    }
  }

 async remove(id: string) {
    const user = await this.user.delete({
      where: {id: id}
    })
    if (!user){
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }
    return true;
  }
}
