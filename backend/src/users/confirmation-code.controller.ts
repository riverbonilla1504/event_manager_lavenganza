import { Controller, Get, Param } from '@nestjs/common';
import { ConfirmationCodeService } from './confirmation-code.service';
import { UsersService } from './users.service';

@Controller('confirm')
export class ConfirmationCodeController {
  constructor(
    private confirmationCodeService: ConfirmationCodeService,
    private usersService: UsersService,
  ) {}

  @Get(':code')
  async confirmAttendance(@Param('code') code: string) {
    const confirmation = await this.confirmationCodeService.findByCode(code);

    if (confirmation) {
      await this.confirmationCodeService.confirmAttendance(confirmation.userId);
      return { message: 'Asistencia confirmada' };
    } else {
      return { message: 'Código inválido o ya utilizado' };
    }
  }
}
