import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The updated full name of the user',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'John',
    description: 'The updated first name of the user',
  })
  @IsOptional()
  first_name?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'The updated last name of the user',
  })
  @IsOptional()
  last_name?: string;

  @ApiPropertyOptional({
    example: '123 Dhaka, Bangladesh',
    description: 'The updated address of the user',
  })
  @IsOptional()
  address?: string;
}
