import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, VerifyPaymentDto } from './dto/payment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create-order')
    createOrder(@Request() req: any, @Body() dto: CreatePaymentDto) {
        return this.paymentsService.createOrder(dto, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verify')
    verifyPayment(@Request() req: any, @Body() dto: VerifyPaymentDto) {
        return this.paymentsService.verifyPayment(dto, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('transactions')
    getTransactions(@Request() req: any) {
        return this.paymentsService.getTransactions(req.user.id);
    }
}
