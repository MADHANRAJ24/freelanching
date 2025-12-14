import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProposalStatus } from '@prisma/client';

@Injectable()
export class ProposalsService {
    constructor(private prisma: PrismaService) { }

    create(createProposalDto: CreateProposalDto, projectId: number, freelancerId: number) {
        return this.prisma.proposal.create({
            data: {
                ...createProposalDto,
                projectId,
                freelancerId,
            },
        });
    }

    findByProject(projectId: number) {
        return this.prisma.proposal.findMany({
            where: { projectId },
            include: { freelancer: { select: { id: true, name: true, skills: true } } },
        });
    }

    updateStatus(id: number, status: ProposalStatus) {
        return this.prisma.proposal.update({
            where: { id },
            data: { status },
        });
    }

    findOne(id: number) {
        return this.prisma.proposal.findUnique({ where: { id } });
    }
}
