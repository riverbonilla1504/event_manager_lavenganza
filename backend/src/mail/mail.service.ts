import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class MailService {
  constructor(private sendGridService: SendGridService) {}

  async sendEmail(to: string, qrCodeUrl: string): Promise<void> {
    const msg = {
      to: to,
      from: process.env.EMAIL, 
      subject: 'Tu Código QR',
      text: 'Aquí tienes tu código QR.',
      html: `<p>Aquí tienes tu código QR:</p><img src="${qrCodeUrl}" alt="Código QR" />`,
    };

    await this.sendGridService.send(msg);
  }
}
