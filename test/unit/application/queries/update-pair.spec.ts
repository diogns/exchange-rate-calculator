import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  UpdatePairHandler,
  UpdatePairQuery,
} from '@pair/application/queries/update-pair';

import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { UpdatePairDatabaseException } from '@pair/infrastructure/exceptions/pair.exception';
import { PairModule } from '@pair/infrastructure/nestjs/pair.module';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
import { err, ok } from 'neverthrow';

let moduleRef: TestingModule;
let updatePairHandler: UpdatePairHandler;
let pairQuery: PairQueriesRepository;

describe('UpdatePairHandler.execute', () => {
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PairModule],
    }).compile();
  });

  beforeEach(async () => {
    updatePairHandler = moduleRef.get<UpdatePairHandler>(UpdatePairHandler);
    pairQuery = moduleRef.get<PairQueriesImplement>(PairQueriesImplement);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should throw an InternalServerErrorException when repository return a database error', async () => {
    // Arrange
    jest
      .spyOn(pairQuery, 'updatePair')
      .mockImplementation(async () => err(new UpdatePairDatabaseException()));

    //Act
    let exception: Error;
    try {
      const query = new UpdatePairQuery(0, '');
      await updatePairHandler.execute(query);
    } catch (error) {
      exception = error;
    }

    // Assert
    expect(exception).toBeInstanceOf(InternalServerErrorException);
    expect(exception.message).toBe(UpdatePairDatabaseException.getMessage());
  });

  it('should throw ok with UpdatePairResponseDTO when repository return success', async () => {
    // Arrange
    jest.spyOn(pairQuery, 'updatePair').mockImplementation(async () => {
      return ok(true);
    });

    //Act
    const query = new UpdatePairQuery(0, '');
    const response = await updatePairHandler.execute(query);

    // Assert
    expect(response).not.toBeNull();
    expect(response).toEqual({ value: 0, pair: '' });
  });
});
