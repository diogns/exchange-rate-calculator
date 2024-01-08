import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
// import { ListPairsResponseDTO } from '@pair/interfaces/http/v1/list-pairs/dto/list-pairs.response';
// ListPairsResponseDTO[]

export class ListPairsQuery {
  constructor() {}
}

@QueryHandler(ListPairsQuery)
export class ListPairsHandler
  implements IQueryHandler<ListPairsQuery, []>
{
  constructor(
    @Inject(PairQueriesImplement)
    private readonly pairQuery: PairQueriesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(): Promise<[]> {
    const result = await this.pairQuery.listPairs();
    if (result.isErr()) {
      this.logger.warn(result.error, 'ListPairsHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }
    return [];
  }
}
