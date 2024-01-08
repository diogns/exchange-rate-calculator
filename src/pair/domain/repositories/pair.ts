import { Result } from 'neverthrow';
import { PairEntity } from '../entities/pair.entity';
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
export type GetPairResult = Result<
  PairEntity | null,
  GetPairDatabaseException
>;
export type AddPairResult = Result<
  boolean | null,
  AddPairDatabaseException
>;
export type UpdatePairResult = Result<
  boolean | null,
  UpdatePairDatabaseException
>;

export type CalculateResult = Result<
  any | null,
  CalculateDatabaseException
>;

export interface PairQueriesRepository {
  getPair: (pair: any) => Promise<GetPairResult>;
  listPairs: () => Promise<ListPairsResult>;
  addPair: (pair: PairEntity) => Promise<AddPairResult>;
  updatePair: (pair: PairEntity) => Promise<UpdatePairResult>;
  calculate: (body: any) => Promise<CalculateResult>;
}
