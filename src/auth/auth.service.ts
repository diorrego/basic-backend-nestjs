import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserI } from '../users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user: UserI = await this.usersService.findOne(username);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        password;
        return result;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  }

  async login(user: any): Promise<{ accesss_token: string }> {
    try {
      const payload: any = {
        username: user._doc.username,
        createdAt: user._doc.createdAt,
      };
      return {
        accesss_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log(e);
    }
  }
}
