import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username, password);
      if (user) {
        const { password, ...result } = user;
        return result;
      }
      console.log('User not found');
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new Error('Validation error'); 
    }
  }

  async login(user: any) {
    try {
      const payload = { username: user.username, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Unable to generate token'); // O una excepción personalizada
    }
  }
}