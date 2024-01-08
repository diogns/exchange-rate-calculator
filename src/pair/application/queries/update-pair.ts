import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
import { UpdatePairResponseDTO } from '@pair/interfaces/http/v1/update-pair/dto/update-pair.response';

export class UpdatePairQuery {
  constructor(
    readonly value: number,
    readonly pair: string,
  ) {}
}

@QueryHandler(UpdatePairQuery)
export class UpdatePairHandler
  implements IQueryHandler<UpdatePairQuery, UpdatePairResponseDTO>
{
  constructor(
    @Inject(PairQueriesImplement)
    private readonly pairQuery: PairQueriesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    updatePairQuery: UpdatePairQuery,
  ): Promise<UpdatePairResponseDTO> {
    console.log('UpdatePairHandler:', updatePairQuery);

    const result = await this.pairQuery.updatePair({
      value: updatePairQuery.value,
      pair: updatePairQuery.pair,
    });
    if (result.isErr()) {
      this.logger.warn(result.error, 'UpdatePairHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }
    return new UpdatePairResponseDTO(
      updatePairQuery.value,
      updatePairQuery.pair,
    );
  }
}
