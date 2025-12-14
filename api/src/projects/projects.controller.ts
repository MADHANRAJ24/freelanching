import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req: any, @Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto, req.user.id);
    }

    @Get()
    findAll(@Query() query: any) {
        // Build filters from query
        const filters: any = {};
        if (query.status) filters['status'] = query.status;
        if (query.skill) filters['skillsRequired'] = { has: query.skill };

        return this.projectsService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        // Add check logic to ensure ownership (omitted for MVP speed)
        return this.projectsService.update(+id, updateProjectDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(+id);
    }
}
