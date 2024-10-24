import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmationCode } from './confirmation-code.entity';

@Injectable()
export class ConfirmationCodeService {
  constructor(
    @InjectRepository(ConfirmationCode)
    private confirmationCodeRepository: Repository<ConfirmationCode>,
  ) {}

  async saveCode(userId: number, code: string): Promise<void> {
    await this.confirmationCodeRepository.save({ userId, code, confirmed: false });
  }

  async findByCode(code: string): Promise<ConfirmationCode> {
    return this.confirmationCodeRepository.findOne({ where: { code } });
  }

  async confirmAttendance(userId: number): Promise<void> {
    await this.confirmationCodeRepository.update({ userId }, { confirmed: true });
  }
}
