import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PairQueriesRepository } from '@pair/domain/repositories/pair';
import { PairQueriesImplement } from '@pair/infrastructure/repositories/pair';
import { CalculateResponseDTO } from '@pair/interfaces/http/v1/calculate/dto/calculate.response';
import { PairNotFoundException } from '@pair/domain/exceptions/pair.exception';

export class CalculateQuery {
  constructor(
    readonly monto: number,
    readonly monedaOrigen: string,
    readonly monedaDestino: string,
  ) {}
}

@QueryHandler(CalculateQuery)
export class CalculateHandler
  implements IQueryHandler<CalculateQuery, CalculateResponseDTO>
{
  constructor(
    @Inject(PairQueriesImplement)
    private readonly pairQuery: PairQueriesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(calculateQuery: CalculateQuery): Promise<CalculateResponseDTO> {
    console.log('calculateQuery:', calculateQuery);

    const getPairResult = await this.pairQuery.getPair({
      monto: calculateQuery.monto,
      monedaOrigen: calculateQuery.monedaOrigen,
      monedaDestino: calculateQuery.monedaDestino,
    });

    if (getPairResult.isErr()) {
      this.logger.warn(getPairResult.error, 'CalculateHandler.execute');
      throw new InternalServerErrorException(
        getPairResult.error.message,
        getPairResult.error.code,
      );
    }
    const pair = getPairResult.value;
    if (!pair) throw new PairNotFoundException();

    const result = await this.pairQuery.calculate(
      {
        monto: calculateQuery.monto,
        monedaOrigen: calculateQuery.monedaOrigen,
        monedaDestino: calculateQuery.monedaDestino,
      },
      pair,
    );

    if (result.isErr()) {
      this.logger.warn(result.error, 'CalculateHandler.execute');
      throw new InternalServerErrorException(
        result.error.message,
        result.error.code,
      );
    }
    const value = result.value;

    return new CalculateResponseDTO(
      value.monto,
      value.montoConTipoDeCambio,
      value.monedaOrigen,
      value.monedaDestino,
      value.tipoDeCambio,
    );
  }
}
