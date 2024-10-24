import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', 
    password: '', 
    database: 'event_manager_venganza',
    entities: [User],
    synchronize: true, 
  }),
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    AuthModule, 
    UsersModule,
    MailModule
  ],
  controllers: [AppController, UsersController ],
  providers: [AppService, UsersModule],
})
export class AppModule {}
