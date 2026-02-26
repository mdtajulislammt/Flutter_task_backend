import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserType } from 'prisma/generated';

export class BaseResponseDto {
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

export class UserDataDto {
  @ApiProperty({
    example: 'clq1234567890',
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'avatar.png',
    nullable: true,
    description: 'Filename of the user avatar',
  })
  avatar: string | null;

  @ApiProperty({
    example: '123 Main St',
    description: 'Physical address of the user',
  })
  address: string;

  @ApiProperty({ example: 'CLIENT', description: 'Role or type of the user' })
  type: string;
}

export class MeResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates if the operation was successful',
  })
  success: boolean;

  @ApiProperty({ type: UserDataDto, description: 'User profile data' })
  data: UserDataDto;
}

export class LoginAuthorizationDto {
  @ApiProperty({
    example: 'bearer',
    description: 'Type of the authentication token',
  })
  type: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  refresh_token: string;
}

export class LoginResponse {
  @ApiProperty({
    type: LoginAuthorizationDto,
    description: 'Authentication credentials',
  })
  authorization: LoginAuthorizationDto;

  @ApiProperty({ example: 'CLIENT', description: 'User role' })
  @IsEnum(UserType)
  type: UserType;
}

export class RefreshAuthorizationDto {
  @ApiProperty({ example: 'bearer', description: 'Token type' })
  type: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'New JWT access token',
  })
  access_token: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ example: true, description: 'Success status' })
  success: boolean;

  @ApiProperty({
    type: RefreshAuthorizationDto,
    description: 'Updated authentication credentials',
  })
  authorization: RefreshAuthorizationDto;
}

export class TwoFactorSecretDto {
  @ApiProperty({
    example: 'JBSWY3DPEHPK3PXP',
    description: 'Base32 encoded 2FA secret',
  })
  secret: string;

  @ApiProperty({
    example:
      'otpauth://totp/MyApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=MyApp',
    description: 'OTP Auth URL for QR code generation',
  })
  otpauth_url: string;
}

export class TwoFactorSecretResponseDto {
  @ApiProperty({ example: true, description: 'Success status' })
  success: boolean;

  @ApiProperty({ example: 'JBSWY3DPEHPK3PXP', description: '2FA secret' })
  data: TwoFactorSecretDto;
}
export class LoginDto {
  @ApiProperty({
    example: 'dev.demo@.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password' })
  password: string;
}
