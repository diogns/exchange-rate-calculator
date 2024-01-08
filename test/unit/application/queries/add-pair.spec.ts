import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddPairHandler } from '@pair/application/queries/add-pair';
import { PairEntity } from '@pair/domain/entities/pair.entity';
import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { AddPairDatabaseException } from '@pair/infrastructure/exceptions/pair.exception';
import { PairModule } from '@pair/infrastructure/nestjs/pair.module';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
import { err, ok } from 'neverthrow';

let moduleRef: TestingModule;
let addPairHandler: AddPairHandler;
let pairCommand: PairQueriesRepository;

describe('AddPairHandler.execute', () => {
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PairModule],
    }).compile();
  });

  beforeEach(async () => {
    addPairHandler = moduleRef.get<AddPairHandler>(AddPairHandler);
    pairCommand = moduleRef.get<PairQueriesImplement>(PairQueriesImplement);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });
  /*
  it('should throw an InternalServerErrorException when repository return a database error', async () => {
    // Arrange
    jest
      .spyOn(pairCommand, 'addPair')
      .mockImplementation(async () => err(new AddPairDatabaseException()));

    //Act
    let exception: Error;
    try {
      const command = new AddPairCommand('', '', '');
      await addPairHandler.execute(command);
    } catch (error) {
      exception = error;
    }

    // Assert
    expect(exception).toBeInstanceOf(InternalServerErrorException);
    expect(exception.message).toBe(AddPairDatabaseException.getMessage());
  });
  */

  it('should throw ok with AddPairResponseDTO when repository return success', async () => {
    // Arrange
    jest.spyOn(pairQuerie, 'addPair').mockImplementation(async () => {
      return ok(new PairEntity(1, '', '', ''));
    });

    //Act
    const command = new AddPairCommand('', '', '');
    const response = await addPairHandler.execute(command);

    // Assert
    expect(response).not.toBeNull();
    expect(response.success).toBe(true);
    expect(Object.keys(response.pair)).toEqual(
      expect.arrayContaining([
        'pair_code',
        'pair_name',
        'pair_lastname',
        'pair_email',
      ]),
    );
  });
});
