import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
//import { ConfirmationCode } from './confirmation-code.entity';
//import { ConfirmationCodeService } from './confirmation-code.service';
import { ConfirmationCodeController } from './confirmation-code.controller';
import { MailService } from 'src/mail/mail.service';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,  MailService],
  exports: [UsersService ],
  controllers: [UsersController, ConfirmationCodeController],

})
export class UsersModule {}
