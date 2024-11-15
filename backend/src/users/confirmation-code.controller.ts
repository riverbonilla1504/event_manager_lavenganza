import { Controller, Get, Param } from '@nestjs/common';
//import { ConfirmationCodeService } from './confirmation-code.service';
import { UsersService } from './users.service';

@Controller('confirmation-code')
export class ConfirmationCodeController {
  constructor(
    //private confirmationCodeService: ConfirmationCodeService,
    private usersService: UsersService,
  ) {}
}
