import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsArray, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { KycStatus } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skills?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    languages?: string[];

    @IsOptional()
    @IsNumber()
    hourlyRate?: number;

    // Admin only fields ideally, but simplifying for MVP
    @IsOptional()
    @IsEnum(KycStatus)
    kycStatus?: KycStatus;
}
