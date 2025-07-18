import { Injectable } from '@nestjs/common';
import { SignUp } from '../auth/interfaces/signUp.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createNewUser(user: SignUp) {
    const newUser = this.usersRepository.create({ ...user });
    return await this.usersRepository.save(newUser, { reload: true });
  }

  public async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
