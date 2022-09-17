import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, BookMark } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private prima: PrismaService) {}
  signUp() {
    return 'I am signup';
  }
  signIn() {
    return 'I am signin';
  }
}
