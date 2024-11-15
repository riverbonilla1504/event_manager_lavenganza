import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as XLSX from 'xlsx';
import * as QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { MailService } from '../mail/mail.service';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService
  ){}


  async findOne(username: string) {
    const user = await this.usersRepository.findOne({ where: { username} });
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

      const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/confirm-attendance?idcode=${user.id}`);
      const imagePath = await this.generateBadgeImage(user, qrCodeUrl);

      await this.mailService.sendEmail(user.email, imagePath);
    } catch (error) {
      console.error('Error sending confirmation code:', error.message);
      throw new Error('Failed to send confirmation code');
    }
  }

  private async generateBadgeImage(user: User, qrCodeUrl: string): Promise<string> {
    const canvas = createCanvas(400, 600); 
    const ctx = canvas.getContext('2d');
    const baseImagePath = path.resolve(__dirname, '../../escarapela.jpg');
  

    const baseImage = await loadImage(baseImagePath);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);


    const qrImage = await loadImage(qrCodeUrl);
    ctx.drawImage(qrImage, 20, 265, 150, 150);


    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(user.username, 200, 320);
    ctx.fillText(`Código: ${user.id}`, 200, 350);


    const filePath = `./badges/${user.id}.jpg`;
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, buffer);

    return filePath;
  }

  async confirmAttendance( idcode: number, AttendanceNumber: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: idcode } });

    if (AttendanceNumber === 1) {
      if (user.attendanceConfirmed1===true) {
      
        throw new Error('Attendance already confirmed');
      }
      user.attendanceConfirmed1 = true;
      console.log('Attendance confirmed');
    }
    if (AttendanceNumber === 2) {
      if (user.attendanceConfirmed2===true) {
      
        throw new Error('Attendance already confirmed');
      }
      user.attendanceConfirmed2 = true;
      console.log('Attendance confirmed');
    }
    if (AttendanceNumber === 3) {
      if (user.attendanceConfirmed3===true) {
      
        throw new Error('Attendance already confirmed');
      }
      user.attendanceConfirmed3 = true;
      console.log('Attendance confirmed');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }




    console.log('Attendance confirmed', AttendanceNumber);
    await this.usersRepository.save(user);
    return user;
  }
}