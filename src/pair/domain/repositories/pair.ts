import { Result } from 'neverthrow';
import { PairEntity } from '../entities/pair.entity';
import { PairInputEntity } from '../entities/pair-input.entity';
import {
  AddPairDatabaseException,
  ListPairsDatabaseException,
  UpdatePairDatabaseException,
  GetPairDatabaseException,
  CalculateDatabaseException,
} from '@pair/infrastructure/exceptions/pair.exception';

export type ListPairsResult = Result<
  PairEntity[] | null,
  ListPairsDatabaseException
>;
export type GetPairResult = Result<PairEntity | null, GetPairDatabaseException>;
export type AddPairResult = Result<boolean | null, AddPairDatabaseException>;
export type UpdatePairResult = Result<
  boolean | null,
  UpdatePairDatabaseException
>;

export type CalculateResult = Result<
  {
    monto: number;
    montoConTipoDeCambio: number;
    monedaOrigen: string;
    monedaDestino: string;
    tipoDeCambio: string;
  },
  CalculateDatabaseException
>;

export interface PairQueriesRepository {
  getPair: (pair: any) => Promise<GetPairResult>;
  listPairs: () => Promise<ListPairsResult>;
  addPair: (pair: PairEntity) => Promise<AddPairResult>;
  updatePair: (pair: PairEntity) => Promise<UpdatePairResult>;
  calculate: (
    input: PairInputEntity,
    pair: PairEntity,
  ) => Promise<CalculateResult>;
}
