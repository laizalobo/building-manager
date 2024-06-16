import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return {
        message: 'Email não encontrado',
      };
    }
    const validPassword = await compare(password, user.password);

    if (validPassword) {
      return {
        data: {
          ...user,
          password: undefined,
        },
      };
    }
    return {
      message: 'Senha inválida',
    };
  }
}
