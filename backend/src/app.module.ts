import { Module } from '@nestjs/common';
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
      type: 'mysql', // Este sigue siendo 'mysql'
      driver: require('mysql2'), // Asegúrate de que estás usando mysql2 como driver
      host: 'autorack.proxy.rlwy.net',
      port: 27197,
      username: 'root',
      password: 'RyjPhRrobXyHaOagxnFHIWOLAsKkwYFA',
      database: 'railway',
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
  controllers: [ UsersController ],
  providers: [UsersModule],
})
export class AppModule {}

