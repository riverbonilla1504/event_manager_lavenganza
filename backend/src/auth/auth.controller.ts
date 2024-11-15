import { Controller, Post, Body, UseGuards , Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    if (body.username === 'admin123*' && body.password === 'admin') {
      return this.authService.login();
    }
    else {
      return { message: 'Invalid credentials' };
    }
     
//    const user = await this.authService.validateUser(body.username, body.password);
//    if (!user) {
//      return { message: 'Invalid credentials' };
//    }
//    return this.authService.login(user);
  
}

}