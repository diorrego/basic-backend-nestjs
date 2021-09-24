import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      password;
      return result;
    }
    return null;await
  }

  async login(user: any) {
    const payload = {
      username: user._doc.username,
      createdAt: user._doc.createdAt,
    };
    return {
      accesss_token: this.jwtService.sign(payload),
    };
  }
}
