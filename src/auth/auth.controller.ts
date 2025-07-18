import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign up a new user',
    description: 'Creates a new user account with the provided information.',
  })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @ApiBody({ type: SignUpDto })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    summary: 'Log in a user',
    description: 'Authenticates a user with the provided credentials.',
  })
  @ApiOkResponse({ description: 'User logged in successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  @ApiBody({ type: LogInDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }
}
