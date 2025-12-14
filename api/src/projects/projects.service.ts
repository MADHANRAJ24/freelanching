import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    create(createProjectDto: CreateProjectDto, userId: number) {
        return this.prisma.project.create({
            data: {
                ...createProjectDto,
                clientId: userId,
            },
        });
    }

    findAll(filters?: any) {
        // Basic filter implementation can be expanded
        return this.prisma.project.findMany({
            where: filters,
            include: { client: { select: { name: true, id: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }

    findOne(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                client: { select: { name: true, id: true } },
                proposals: true
            }
        });
    }

    update(id: number, updateProjectDto: UpdateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
        });
    }

    remove(id: number) {
        return this.prisma.project.delete({ where: { id } });
    }
}
