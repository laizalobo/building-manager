import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  apNumber: z.number(),
  type: z.string(),
});

export class CreateUserDto extends createZodDto(createUserSchema) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  apNumber: number;

  @ApiProperty()
  password: string;

  @ApiProperty()
  type?: 'MANAGER' | 'USER';
}
