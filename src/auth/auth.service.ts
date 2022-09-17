import { AuthDto } from 'src/dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash
      },
      select: {
        id:true,
        email: true,
        createdAt: true
      }
    })
    return user;
  }
  signIn() {
    return 'I am signin';
  }
}
