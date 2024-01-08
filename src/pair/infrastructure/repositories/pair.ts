import { Inject, Logger } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { err, ok } from 'neverthrow';

import { PairEntity } from '@pair/domain/entities/pair.entity';
import { PairInputEntity } from '@pair/domain/entities/pair-input.entity';
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
      const result = await this.dynamoDBDocument.query({
        TableName: Constants.pairsTable,
      });

      const pair = result.Items as PairEntity[];
      return ok(pair);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.listPairs');
      return err(new ListPairsDatabaseException());
    }
  }

  async getPair(input: PairInputEntity): Promise<GetPairResult> {
    try {
      const result = await this.dynamoDBDocument.query({
        TableName: Constants.pairsTable,
        ExpressionAttributeValues: {
          ':pair': `${input.monedaOrigen}-${input.monedaDestino}`,
        },
        KeyConditionExpression: 'pair = :pair',
      });

      const pair = result.Items[0] as PairEntity;
      return ok(pair);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.listPairs');
      return err(new GetPairDatabaseException());
    }
  }

  async addPair(pair: PairEntity): Promise<AddPairResult> {
    try {
      this.dynamoDBDocument.put({
        TableName: Constants.pairsTable,
        Item: {
          pair: pair.pair,
          value: pair.value,
        },
      });
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.addPair');
      return err(new AddPairDatabaseException());
    }
  }

  async updatePair(pair: PairEntity): Promise<UpdatePairResult> {
    try {
      await this.dynamoDBDocument.update({
        TableName: Constants.pairsTable,
        Key: {
          pair: pair.pair,
        },
        UpdateExpression: 'set value = :value',
        ExpressionAttributeValues: {
          ':value': pair.value,
        },
        ConditionExpression: 'attribute_exists (pair)',
      });
      return ok(true);
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.listPairs');
      return err(new UpdatePairDatabaseException());
    }
  }

  async calculate(
    input: PairInputEntity,
    pair: PairEntity,
  ): Promise<CalculateResult> {
    try {
      return ok({
        monto: input.monto,
        montoConTipoDeCambio: pair.value * input.monto,
        monedaOrigen: input.monedaOrigen,
        monedaDestino: input.monedaDestino,
        tipoDeCambio: pair.pair,
      });
    } catch (error) {
      this.logger.error(error, 'PairQueriesImplement.calculate');
      return err(new CalculateDatabaseException());
    }
  }
}
