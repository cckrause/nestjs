import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
  Patch,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body.email, body.password);

    if (!user) {
      throw new BadRequestException('User already exists');
    }

    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), body);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    const users = await this.usersService.find(email);

    if (users.length === 0) {
      throw new NotFoundException('users not found');
    }

    return users;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.remove(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
