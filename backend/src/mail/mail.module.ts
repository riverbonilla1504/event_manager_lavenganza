import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY, 
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
