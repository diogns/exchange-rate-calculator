import { Logger, Module } from '@nestjs/common';
import {
  PairQueriesImplement,
} from '../repositories/pair';
import { CqrsModule } from '@nestjs/cqrs';

import { CalculateController } from '../../interfaces/http/v1/calculate/calculate.controller';
import { CalculateHandler } from '../../application/queries/calculate';

// import { ListPairsController } from '../../interfaces/http/v1/list-pairs/list-pairs.controller';
// import { ListPairsHandler } from '../../application/queries/list-pairs';
// import { AddPairController } from '../../interfaces/http/v1/add-pair/add-pair.controller';
// import { AddPairHandler } from '../../application/commands/add-pair';
// import { UpdatePairController } from '../../interfaces/http/v1/update-pair/update-pair.controller';
// import { RemovePairController } from '../../interfaces/http/v1/remove-pair/remove-pair.controller';
// import { UpdatePairHandler } from '../../application/commands/update-pair';
// import { RemovePairHandler } from '../../application/commands/remove-pair';
// import { GetPairHandler } from '../../application/queries/get-pair-by-code';
// import { GetPairController } from '../../interfaces/http/v1/get-pair-by-code/get-pair-by-code.controller';

const controllers = [
  CalculateController,
  // ListPairsController,
  // GetPairController,
  // AddPairController,
  // UpdatePairController,
  // UpdatePairController,
  // RemovePairController,
];

const infrastructure = [PairQueriesImplement];

const domain = [];

const application = [
  CalculateHandler,
  // ListPairsHandler,
  // GetPairHandler,
  // AddPairHandler,
  // UpdatePairHandler,
  // UpdatePairHandler,
  // RemovePairHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class PairModule {}
