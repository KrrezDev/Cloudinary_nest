import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'helpers/pagination.dto';
import { AuthGuard } from './guards/auth.guard';
import { Token } from './decorators/token.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.regiterUser(registerUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Body() login: LoginUserDto) {
    return this.userService.loginUser(login);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/verify')
  @ApiOperation({ summary: 'Verify user token' })
  @ApiResponse({ status: 200, description: 'Token is valid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  verifyToken(@Token() token: string) {
    return this.userService.verfyToken(token);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
