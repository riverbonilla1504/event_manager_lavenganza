import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetname = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetname];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      const users = rows.slice(1).map((row) => ({
        username: row[0],
        password: row[1],
        email: row[2],
        role: "user",
        attendanceConfirmed: false,
      }));
  
      const savedUsers = [];
      for (const userData of users) {
        const user = this.usersRepository.create(userData);
        savedUsers.push(await this.usersRepository.save(user));
      }
  
      return savedUsers;
    } catch (error) {
      console.error('Error importing users:', error);
      throw new Error('Error importing users: ' + error.message);
    }
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

  async confirmAttendance( idcode: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: idcode } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    

    if (user.attendanceConfirmed===true) {
      // Si la asistencia ya fue confirmada, devolver nulo o un mensaje
      
      throw new Error('Attendance already confirmed');
    }

    // Marcar la asistencia como confirmada
    user.attendanceConfirmed = true;
    await this.usersRepository.save(user);

    return user; // Devolver el usuario con la asistencia actualizada
  }
}