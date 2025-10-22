import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterVolunteerDto } from './dto/register-volunteer.dto';
import { RegisterOngDto } from './dto/register-ong.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /api/auth/register/volunteer
  @Post('register/volunteer')
  async registerVolunteer(@Body() dto: RegisterVolunteerDto) {
    return this.authService.registerVolunteer(dto);
  }

  // POST /api/auth/register/ong
  @Post('register/ong')
  async registerOng(@Body() dto: RegisterOngDto) {
    return this.authService.registerOng(dto);
  }

  // POST /api/auth/login
  @HttpCode(HttpStatus.OK) // Retorna 200 en lugar de 201
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // GET /api/auth/me (requiere JWT)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user; // { userId, role, email } desde JwtStrategy.validate
  }
}