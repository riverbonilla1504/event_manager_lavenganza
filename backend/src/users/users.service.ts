import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as XLSX from 'xlsx';
import * as QRCode from 'qrcode';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService
  ){}


  async findOne(username: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { username, password } });
    return user;
  }

  async findAll(): Promise<User[]> {
    console.log('Fetching all users...');
    const users = await this.usersRepository.find();
    console.log('Users found:', users);
    return users;
  }

  async importUsers(file: Express.Multer.File) {
    console.log('Importing users...');
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetname = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetname];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const users = rows.slice(1).map((row) => ({
      
        username: row[0],
        password: row[1],
        email: row[2],
        role: "user",
    }));

    const savedUsers = [];
    for (const userData of users){
      const user = this.usersRepository.create(userData);
      savedUsers.push(await this.usersRepository.save(user));
    }

    return savedUsers;
  }

  async sendConfirmationCode(userId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      const qrCodeUrl = await QRCode.toDataURL("http://localhost:3000/confirm?idcode="+user.id);
      await this.mailService.sendEmail(user.email, qrCodeUrl);
    } catch (error) {

      console.error('Error sending confirmation code:', error.message);
      throw new Error('Failed to send confirmation code');
    }
  }
}