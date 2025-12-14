import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsDateString } from 'class-validator';
import { BudgetType } from '@prisma/client';

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    budget: number;

    @IsEnum(BudgetType)
    budgetType: BudgetType;

    @IsArray()
    @IsString({ each: true })
    skillsRequired: string[];

    @IsDateString()
    @IsOptional()
    deadline?: string;
}
