import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateOrgDto } from './dto/update-org.dto';

@UseGuards(JwtAuthGuard)
@Controller('orgs')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.orgsService.getMe(req.user.userId);
  }

  @Put('me')
  updateMe(@Req() req: any, @Body() dto: UpdateOrgDto) {
    return this.orgsService.updateMe(req.user.userId, dto);
  }
}