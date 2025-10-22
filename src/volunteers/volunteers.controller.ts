import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { VolunteersService } from './volunteers.service';

@UseGuards(JwtAuthGuard)
@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.volunteersService.getMe(req.user.userId);
  }

  @Put('me')
  updateMe(@Req() req: any, @Body() dto: UpdateVolunteerDto) {
    return this.volunteersService.updateMe(req.user.userId, dto);
  }
}