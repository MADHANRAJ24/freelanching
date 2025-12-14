import { IsNumber, IsString, IsOptional, IsEnum, Min } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreatePaymentDto {
    @IsNumber()
    @Min(1)
    amount: number; // In INR (will be converted to paise)

    @IsString()
    @IsOptional()
    description?: string;
}

export class VerifyPaymentDto {
    @IsString()
    razorpay_order_id: string;

    @IsString()
    razorpay_payment_id: string;

    @IsString()
    razorpay_signature: string;
}
