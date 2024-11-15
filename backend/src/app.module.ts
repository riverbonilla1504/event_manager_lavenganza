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
      type: 'mysql', 
      driver: require('mysql2'), 
      host: 'junction.proxy.rlwy.net',
      port: 34172,
      username: 'root',
      password: 'LXvReEHjcbalTzqhAmLWKQzIjjgWsyEV',
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

