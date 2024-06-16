import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const requestAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class RequestAuthDto extends createZodDto(requestAuthSchema) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
