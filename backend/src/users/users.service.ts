import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt();
    const hashedPassword = await hash(createUserDto.password, salt);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    return { ...savedUser, password: undefined };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
