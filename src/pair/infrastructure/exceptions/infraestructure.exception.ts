export enum InfrastructureExceptionCode {
  Default = 'DEFAULT_INFRA_EXCEPTION',
  ListPairsDatabaseExceptionCode = 'LIST_USERS_DATABASE_EXCEPTION',
  AddPairDatabaseExceptionCode = 'ADD_PAIR_DATABASE_EXCEPTION',
  UpdatePairDatabaseExceptionCode = 'UPDATE_PAIR_DATABASE_EXCEPTION',
  RemovePairDatabaseExceptionCode = 'REMOVE_PAIR_DATABASE_EXCEPTION',
  GetPairDatabaseExceptionCode = 'GET_PAIR_DATABASE_EXCEPTION',
  CalculateDatabaseExceptionCode = 'CALCULATE_DATABASE_EXCEPTION',
}

export abstract class InfrastructureException extends Error {
  code: string;

  constructor(message?: string) {
    super(message);

    this.code = InfrastructureExceptionCode.Default;
  }
}
