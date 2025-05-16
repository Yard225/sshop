import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfirmPaymentUseCase } from '../core/usecases/confirm-payment.usecase';

export class ConfirmPaymentDto {
  paymentId!: string;
  externalRef!: string;
}

@Controller('payments/mobile-money')
export class ConfirmPaymentController {
  constructor(private readonly confirmUseCase: ConfirmPaymentUseCase) {}

  @Post('callback')
  @HttpCode(HttpStatus.ACCEPTED) // 202
  async handleCallback(@Body() dto: ConfirmPaymentDto): Promise<void> {
    await this.confirmUseCase.execute({
      paymentId: dto.paymentId,
      externalRef: dto.externalRef,
    });
    // 202 Accepted sans payload – le provider mobile-money n’a pas besoin de réponse détaillée
  }
}
