import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  list(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  // Solo ONGs autenticadas pueden crear proyectos
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() dto: CreateProjectDto) {
    // Validar que el usuario sea ONG
    if (req.user.role !== 'ong') {
      return { error: 'Solo ONGs pueden crear proyectos.' };
    }
    // orgId se toma del JWT
    return this.projectsService.create({ ...dto, orgId: req.user.userId });
  }
}