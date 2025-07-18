import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @ValidateIf((r) => r === 'freelancer' || r === 'customer')
  role: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
