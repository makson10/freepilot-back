import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUp } from './interfaces/signUp.interface';
import { LogIn } from './interfaces/logIn.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: SignUp): Promise<{ access_token: string }> {
    const newUser = await this.usersService.createNewUser(user);
    if (!newUser.id) throw new UnauthorizedException();

    const payload = { id: newUser.id, email: newUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logIn({ email, password }: LogIn): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== password) throw new UnauthorizedException();

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
