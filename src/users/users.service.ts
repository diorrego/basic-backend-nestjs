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
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<UserI> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`No se encontró el id ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserI> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const newUser = new this.userModel(createUserDto);
    newUser.password = await this.hasPassword(password, salt);
    return await newUser.save();
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<UserI> {
    const updateUser = await this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });
    if (!updateUser) {
      throw new NotFoundException(`No se encontró el id ${id}`);
    }
    return await updateUser.save();
  }

  async deleteUser(id: string): Promise<UserI> {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new NotFoundException(`No se encontró el id ${id}`);
    }
    return deleteUser;
  }

  async findOne(username: string): Promise<UserI> {
    const findUser = await this.userModel.findOne({ username: `${username}` });
    if (!findUser) {
      throw new NotFoundException(`No se encontró el user ${username}`);
    }
    return findUser;
  }

  private async hasPassword(password: string, salt: string): Promise<string> {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
