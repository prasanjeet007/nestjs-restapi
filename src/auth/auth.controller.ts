import { AuthDto } from './../dto/auth.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('signup')
  getSignUpData(@Body() dto: AuthDto) {
    return this.auth.signUp(dto);
  }

  @Post('signin')
  getSignInData() {
    return this.auth.signIn();
  }
}
