import { Logger, Module } from '@nestjs/common';
import { PairQueriesImplement } from '../repositories/pair';
import { CqrsModule } from '@nestjs/cqrs';

import { CalculateController } from '../../interfaces/http/v1/calculate/calculate.controller';
import { CalculateHandler } from '../../application/queries/calculate';
import { AddPairController } from '../../interfaces/http/v1/add-pair/add-pair.controller';
import { AddPairHandler } from '../../application/queries/add-pair';
import { UpdatePairController } from '../../interfaces/http/v1/update-pair/update-pair.controller';
import { UpdatePairHandler } from '../../application/queries/update-pair';

const controllers = [
  CalculateController,
  AddPairController,
  UpdatePairController,
];

const infrastructure = [PairQueriesImplement];

const domain = [];

const application = [CalculateHandler, AddPairHandler, UpdatePairHandler];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class PairModule {}
