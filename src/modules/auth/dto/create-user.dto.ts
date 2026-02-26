import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // Adjusted import path for standard Prisma setups
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserType } from 'prisma/generated';

export class CreateUserDto {
  @ApiProperty({
    example: 'MD Tajul',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Islam',
    description: 'The last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'dev.demo@gmail.com',
    description: 'The unique email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Earshad Nagar, Tongi, Gazipur, Bangladesh',
    description: 'The physical address of the user',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'The secure password for the user (minimum 8 characters)',
  })
  @IsString()
  @MinLength(8, { message: 'Password should be minimum 8 characters' })
  password: string;

  @ApiPropertyOptional({
    enum: UserType,
    default: UserType.CLIENT,
    description: 'The authorization level/role of the user',
  })
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;
}
