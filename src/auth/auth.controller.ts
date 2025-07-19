import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request as RequestType } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign up a new user',
    description: 'Creates a new user account with the provided information.',
  })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiUnauthorizedResponse({ description: 'Invalid input.' })
  @ApiBody({ type: SignUpDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    summary: 'Log in a user',
    description: 'Authenticates a user with the provided credentials.',
  })
  @ApiOkResponse({ description: 'User logged in successfully.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  @ApiBody({ type: LogInDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @ApiOperation({
    summary: 'Verify user authentication',
    description:
      'Verifies the authentication status of the current user using the provided JWT.',
  })
  @ApiOkResponse({ description: 'User is authenticated.' })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication token.',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('verify')
  verifyUser(@Request() req: RequestType) {
    return req['user'];
  }
}
