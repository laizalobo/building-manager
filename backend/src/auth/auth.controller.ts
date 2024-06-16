import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { RequestAuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
    description: 'The authentication has been successfully.',
    type: RequestAuthDto,
  })
  async create(
    @Body() auth: RequestAuthDto,
  ): Promise<{ message?: string; data?: User }> {
    return this.authService.signIn(auth.email, auth.password);
  }
}
