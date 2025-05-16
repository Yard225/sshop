import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PaymentModuleTest } from '../../payment.module';
import { InMemoryPaymentRepository } from '../../adapters/out/in-memory-payment.repository';
import { InitiatePaymentUseCase } from '../../core/usecases/initiate-payment.usecase';

describe('Feature: HTTP Callback → ConfirmPaymentController', () => {
  let app: INestApplication;
  let repository: InMemoryPaymentRepository;
  let initiateUsecase: InitiatePaymentUseCase;
  let paymentId: string;

  beforeEach(async () => {
    repository = new InMemoryPaymentRepository();
    initiateUsecase = new InitiatePaymentUseCase(repository);

    const modRef = await Test.createTestingModule({
      imports: [PaymentModuleTest],
      providers: [
        {
          provide: InMemoryPaymentRepository,
          useFactory: () => repository,
        },
      ],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Scenario: Happy Path', () => {
    it('sets status CONFIRMED and returns 202', async () => {
      // Fixures – 1 transaction PENDING
      const res = await initiateUsecase.execute({
        orderId: 'order-456',
        amountCfa: 45_000,
        phone: '+2250700000000',
      });

      paymentId = res.paymentId;

      const response = await request(app.getHttpServer())
        .post('/payments/mobile-money/callback')
        .send({ paymentId, externalRef: 'MM-TXN-99' })
        .expect(202);

      const txn = await repository.findById(paymentId);
      expect(txn!.props.status).toBe('CONFIRMED');
    });
  });
});
