import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, VerifyPaymentDto } from './dto/payment.dto';
import { TransactionType, TransactionStatus } from '@prisma/client';
import * as crypto from 'crypto';

// Razorpay SDK
const Razorpay = require('razorpay');

@Injectable()
export class PaymentsService {
    private razorpay: any;

    constructor(private prisma: PrismaService) {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXX',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret',
        });
    }

    async createOrder(dto: CreatePaymentDto, userId: number) {
        const amountInPaise = dto.amount * 100; // Razorpay expects paise

        const order = await this.razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId.toString(),
                description: dto.description || 'Wallet Deposit',
            },
        });

        // Create a pending transaction
        await this.prisma.transaction.create({
            data: {
                amount: dto.amount,
                currency: 'INR',
                type: TransactionType.DEPOSIT,
                status: TransactionStatus.PENDING,
                razorpayOrderId: order.id,
                description: dto.description,
                userId,
            },
        });

        return {
            orderId: order.id,
            amount: dto.amount,
            currency: 'INR',
            key: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXX',
        };
    }

    async verifyPayment(dto: VerifyPaymentDto, userId: number) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = dto;

        // Verify Signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            // Update transaction as failed
            await this.prisma.transaction.updateMany({
                where: { razorpayOrderId: razorpay_order_id },
                data: { status: TransactionStatus.FAILED },
            });
            return { success: false, message: 'Invalid signature' };
        }

        // Update transaction as SUCCESS
        const tx = await this.prisma.transaction.updateMany({
            where: { razorpayOrderId: razorpay_order_id },
            data: {
                status: TransactionStatus.SUCCESS,
                razorpayPaymentId: razorpay_payment_id,
            },
        });

        // Add amount to user wallet
        const transaction = await this.prisma.transaction.findFirst({
            where: { razorpayOrderId: razorpay_order_id },
        });

        if (transaction) {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    walletBalance: { increment: transaction.amount },
                },
            });
        }

        return { success: true, message: 'Payment verified and wallet updated' };
    }

    async getTransactions(userId: number) {
        return this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
