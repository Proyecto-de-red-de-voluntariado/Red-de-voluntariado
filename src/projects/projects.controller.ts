import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { QueryProjectsDto } from './dto/query-projects.dto';

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
}