import { AuthDto } from 'src/dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { domainToASCII } from 'url';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto) {
    try {
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
    } catch(err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials exception');
        }
      }
      throw err;
    }
  }
  async signIn(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) {
      throw new ForbiddenException('Crendentials incorrect');
    }
    const pwdMatches = await argon.verify(user.hash, dto.password);
    if (!pwdMatches) {
      throw new ForbiddenException(
        'Crendentials Incorrect'
      )
    } 
    delete user.hash;
    return user;
  }
}
