import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin', 
      role: 'admin',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}