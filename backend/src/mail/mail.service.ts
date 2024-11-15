import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import * as fs from 'fs';

@Injectable()
export class MailService {
  constructor(private sendGridService: SendGridService) {}

  async sendEmail(to: string, imagePath: string): Promise<void> {
    // Leer el archivo de imagen y convertirlo en base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const msg = {
      to: to,
      from: process.env.EMAIL,
      subject: 'Tu Código QR',
      text: 'Aquí tienes tu código QR.',
      html: `<p>Aquí tienes tu código QR:</p>`,
      attachments: [
        {
          content: base64Image,
          filename: 'codigo-qr.jpeg',
          type: 'image/jpeg',
          disposition: 'attachment',
        },
      ],
    };

    await this.sendGridService.send(msg);
  }
}
