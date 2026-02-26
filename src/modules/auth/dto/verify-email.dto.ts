import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address to verify',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The verification token sent to the user email',
  })
  @IsNotEmpty()
  token: string;
}
