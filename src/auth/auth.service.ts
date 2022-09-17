import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  helloWorld() {
    return 'Hello World';
  }
}
