import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CalculateHandler,
  CalculateQuery,
} from '@pair/application/queries/calculate';

import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { CalculateDatabaseException } from '@pair/infrastructure/exceptions/pair.exception';
import { PairNotFoundException } from '@pair/domain/exceptions/pair.exception';
import { PairModule } from '@pair/infrastructure/nestjs/pair.module';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
import { err, ok } from 'neverthrow';

let moduleRef: TestingModule;
let calculateHandler: CalculateHandler;
let pairQuery: PairQueriesRepository;

describe('AddPairHandler.execute', () => {
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PairModule],
    }).compile();
  });

  beforeEach(async () => {
    calculateHandler = moduleRef.get<CalculateHandler>(CalculateHandler);
    pairQuery = moduleRef.get<PairQueriesImplement>(PairQueriesImplement);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should throw an PairNotFoundException when repository return not found a pair', async () => {
    // Arrange
    jest.spyOn(pairQuery, 'getPair').mockImplementation(async () => {
      return ok(undefined);
    });

    //Act
    let exception: Error;
    try {
      const query = new CalculateQuery(10, 'A', 'B');
      await calculateHandler.execute(query);
    } catch (error) {
      exception = error;
    }

    // Assert
    expect(exception).toBeInstanceOf(PairNotFoundException);
    expect(exception.message).toBe(PairNotFoundException.getMessage());
  });

  it('should throw an InternalServerErrorException when repository return a database error', async () => {
    // Arrange
    jest.spyOn(pairQuery, 'getPair').mockImplementation(async () => {
      return ok({
        value: 1.22,
        pair: 'A-B',
      });
    });

    jest
      .spyOn(pairQuery, 'calculate')
      .mockImplementation(async () => err(new CalculateDatabaseException()));

    //Act
    let exception: Error;
    try {
      const query = new CalculateQuery(10, 'A', 'B');
      await calculateHandler.execute(query);
    } catch (error) {
      exception = error;
    }

    // Assert
    expect(exception).toBeInstanceOf(InternalServerErrorException);
    expect(exception.message).toBe(CalculateDatabaseException.getMessage());
  });

  it('should throw ok with CalculateResponseDTO when repository return success', async () => {
    // Arrange
    jest.spyOn(pairQuery, 'getPair').mockImplementation(async () => {
      return ok({
        value: 1.22,
        pair: 'A-B',
      });
    });

    jest.spyOn(pairQuery, 'calculate').mockImplementation(async () => {
      return ok({
        monto: 10,
        montoConTipoDeCambio: 12.2,
        monedaOrigen: 'A',
        monedaDestino: 'B',
        tipoDeCambio: 'A-B',
      });
    });
    //Act
    const query = new CalculateQuery(10, 'A', 'B');
    const response = await calculateHandler.execute(query);

    // Assert
    expect(response).not.toBeNull();
    expect(response).toEqual({
      monto: 10,
      monto_con_tipo_de_cambio: 12.2,
      moneda_origen: 'A',
      moneda_destino: 'B',
      tipo_de_cambio: 'A-B',
    });
  });
});
