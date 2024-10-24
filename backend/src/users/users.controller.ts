import { Controller, Get, Post, UploadedFile, UseInterceptors, Param, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importUsers(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.importUsers(file);
  }

  @Post(':id/send-confirmation-code')
  async sendConfirmationCode(
    @Param('id') userId: number,
  ): Promise<void> {
    await this.usersService.sendConfirmationCode(userId);
  }

}
