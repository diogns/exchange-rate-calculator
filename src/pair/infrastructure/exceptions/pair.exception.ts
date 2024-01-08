import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from './infraestructure.exception';

export class ListPairsDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(ListPairsDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.ListPairsDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when listing pairs';
  }
}

export class GetPairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(GetPairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.GetPairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when getting pair';
  }
}

export class AddPairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(AddPairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.AddPairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when add pair';
  }
}

export class UpdatePairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(UpdatePairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.UpdatePairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when update pair';
  }
}

export class RemovePairDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemovePairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.RemovePairDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when remove pair';
  }
}

export class CalculateDatabaseException extends InfrastructureException {
  code: string;
  constructor() {
    super(RemovePairDatabaseException.getMessage());
    this.code = InfrastructureExceptionCode.CalculateDatabaseExceptionCode;
  }
  static getMessage(): string {
    return 'There was an error in the database when calculate pair';
  }
}
