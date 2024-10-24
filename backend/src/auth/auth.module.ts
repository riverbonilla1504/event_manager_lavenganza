import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Módulo de usuarios (lo crearemos después)

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, 
      signOptions: { expiresIn: '60m' }, // El token expira en 60 minutos
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}