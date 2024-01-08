import { Inject, Logger } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { err, ok } from 'neverthrow';

import { PairEntity } from '@pair/domain/entities/pair.entity';
import {
  AddPairResult,
  GetPairResult,
  ListPairsResult,
  PairQueriesRepository,
  UpdatePairResult,
  CalculateResult,
} from '@pair/domain/repositories/pair';
import {
  AddPairDatabaseException,
  ListPairsDatabaseException,
  CalculateDatabaseException,
  UpdatePairDatabaseException,
  GetPairDatabaseException,
} from '../exceptions/pair.exception';
import Constants from '../../../shared/constants';

let pairDataBase: PairEntity[] = [];

export class PairQueriesImplement implements PairQueriesRepository {
  @Inject()
  private readonly logger: Logger;
  private ddbConf: any = {
    region: Constants.aws_region,
  };
  private client: DynamoDBClient;
  private dynamoDBDocument: DynamoDBDocument;

  constructor() {
    this.client = new DynamoDBClient(this.ddbConf);
    const marshallOptions = {
      convertEmptyValues: false,
      removeUndefinedValues: false,
      convertClassInstanceToMap: false,
    };
    const unmarshallOptions = {
      wrapNumbers: false,
    };
    const translateConfig = { marshallOptions, unmarshallOptions };
    this.dynamoDBDocument = DynamoDBDocument.from(this.client, translateConfig);
  }

  async listPairs(): Promise<ListPairsResult> {
    try {
      return ok(pairDataBase);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.listPairs');
      return err(new ListPairsDatabaseException());
    }
  }

  async getPair(pairCode: any): Promise<GetPairResult> {
    try {
      const pair: any = {};
      return ok(pair);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.listPairs');
      return err(new GetPairDatabaseException());
    }
  }

  async addPair(pair: PairEntity): Promise<AddPairResult> {
    try {
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.addPair');
      return err(new AddPairDatabaseException());
    }
  }

  async updatePair(pair: PairEntity): Promise<UpdatePairResult> {
    try {
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.listPairs');
      return err(new UpdatePairDatabaseException());
    }
  }

  async calculate(input: {
    monto: number,
    monedaOrigen: string,
    monedaDestino: string,
  }): Promise<CalculateResult> {
    try {
      console.log(input.monto)
      return ok({});
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.calculate');
      return err(new CalculateDatabaseException());
    }
  }
}
