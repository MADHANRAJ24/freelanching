import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProposalStatus } from '@prisma/client';

@Controller('projects/:projectId/proposals')
export class ProposalsController {
    constructor(private readonly proposalsService: ProposalsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req: any, @Param('projectId') projectId: string, @Body() createProposalDto: CreateProposalDto) {
        // Should verify user is FREELANCER
        return this.proposalsService.create(createProposalDto, +projectId, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAllByProject(@Param('projectId') projectId: string) {
        // Should verify user is owner of project OR admin
        return this.proposalsService.findByProject(+projectId);
    }

    // To accept/reject, we might need a separate endpoint or stick it here
    // Route: PATCH /proposals/:id (this controller has prefix, so maybe a separate controller for generic proposal routes? Or keep nested?)
    // Keeping nested for now: PATCH /projects/:projectId/proposals/:id

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    updateStatus(@Param('id') id: string, @Body('status') status: ProposalStatus) {
        // Verify user is owner of project
        return this.proposalsService.updateStatus(+id, status);
    }
}
