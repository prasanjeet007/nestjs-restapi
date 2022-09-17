import { AuthService } from './auth.service';
import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Get()
  getHelloService() {
    return this.auth.helloWorld();
  }
}
