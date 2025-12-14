import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, VerifyPaymentDto } from './dto/payment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create-order')
    createOrder(@Request() req, @Body() dto: CreatePaymentDto) {
        return this.paymentsService.createOrder(dto, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verify')
    verifyPayment(@Request() req, @Body() dto: VerifyPaymentDto) {
        return this.paymentsService.verifyPayment(dto, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('transactions')
    getTransactions(@Request() req) {
        return this.paymentsService.getTransactions(req.user.id);
    }
}
