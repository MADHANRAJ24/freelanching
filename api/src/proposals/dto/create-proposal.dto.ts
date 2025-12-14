import { IsString, IsNumber, IsInt, Min } from 'class-validator';

export class CreateProposalDto {
    @IsString()
    coverLetter: string;

    @IsNumber()
    @Min(0)
    bidAmount: number;

    @IsInt()
    @Min(1)
    estimatedDays: number;
}
