import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-users.dto';
import { UpdateUserDto } from './dtos/update-users.dto';
import { UserI } from './interfaces/users.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<UserI>) {}

  async getUsers(): Promise<UserI[]> {
    try {
      const users: UserI[] = await this.userModel.find();
      return users;
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(id: string): Promise<UserI> {
    try {
      const user: UserI = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`No se encontró el id ${id}`);
      }
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserI> {
    try {
      const { password } = createUserDto;
      const salt: string = await bcrypt.genSalt();
      const newUser: UserI = new this.userModel(createUserDto);
      newUser.password = await this.hasPassword(password, salt);
      return await newUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<UserI> {
    try {
      const updateUser: UserI = await this.userModel.findByIdAndUpdate(
        id,
        userDto,
        {
          new: true,
        },
      );
      if (!updateUser) {
        throw new NotFoundException(`No se encontró el id ${id}`);
      }
      return await updateUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(id: string): Promise<UserI> {
    try {
      const deleteUser: UserI = await this.userModel.findByIdAndDelete(id);
      if (!deleteUser) {
        throw new NotFoundException(`No se encontró el id ${id}`);
      }
      return deleteUser;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(username: string): Promise<UserI> {
    try {
      const findUser: UserI = await this.userModel.findOne({
        username: `${username}`,
      });
      if (!findUser) {
        throw new NotFoundException(`No se encontró el user ${username}`);
      }
      return findUser;
    } catch (e) {
      console.log(e);
    }
  }

  private async hasPassword(password: string, salt: string): Promise<string> {
    try {
      const hash: string = await bcrypt.hash(password, salt);
      return hash;
    } catch (e) {
      console.log(e);
    }
  }
}
