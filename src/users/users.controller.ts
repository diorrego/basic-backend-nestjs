import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserI } from './interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response): Promise<UserI[]> {
    try {
      const users: UserI[] = await this.usersService.getUsers();
      res.status(HttpStatus.OK).json({
        message: 'Users',
        users,
      });
      return users;
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: 'id', @Res() res: Response): Promise<UserI> {
    try {
      const user: UserI = await this.usersService.getUser(id);
      res.status(HttpStatus.OK).json({
        message: 'User',
        user,
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<UserI> {
    try {
      const newUser: UserI = await this.usersService.createUser(createUserDto);
      console.log(newUser);
      res.status(HttpStatus.OK).json({
        message: 'New user',
        user: newUser,
      });
      return newUser;
    } catch (e) {
      console.log(e);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<UserI> {
    try {
      const updateUser: UserI = await this.usersService.updateUser(id, userDto);
      res.status(HttpStatus.OK).json({
        message: 'Update user',
        user: updateUser,
      });
      return updateUser;
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<UserI> {
    try {
      const deleteUser: UserI = await this.usersService.deleteUser(id);
      res.status(HttpStatus.OK).json({
        message: 'Update user',
        user: deleteUser,
      });
      return deleteUser;
    } catch (e) {
      console.log(e);
    }
  }
}
