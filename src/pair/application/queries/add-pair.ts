import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
import { AddPairResponseDTO } from '@pair/interfaces/http/v1/add-pair/dto/add-pair.response';

export class AddPairQuery {
  constructor(
    readonly value: number,
    readonly pair: string,
  ) {}
}

@QueryHandler(AddPairQuery)
export class AddPairHandler
  implements IQueryHandler<AddPairQuery, AddPairResponseDTO>
{
  constructor(
    @Inject(PairQueriesImplement)
    private readonly pairQuery: PairQueriesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(addPairQuery: AddPairQuery): Promise<AddPairResponseDTO> {
    console.log('AddPairHandler:', addPairQuery);

    const result = await this.pairQuery.addPair({
      value: addPairQuery.value,
      pair: addPairQuery.pair,
    });
    if (result.isErr()) {
      this.logger.warn(result.error, 'AddPairHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }
    return new AddPairResponseDTO(addPairQuery.value, addPairQuery.pair);
  }
}
