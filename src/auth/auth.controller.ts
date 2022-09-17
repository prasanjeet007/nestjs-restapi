import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('signup')
  getSignUpData() {
    return this.auth.signUp();
  }

  @Post('signin')
  getSignInData() {
    return this.auth.signIn();
  }
}
