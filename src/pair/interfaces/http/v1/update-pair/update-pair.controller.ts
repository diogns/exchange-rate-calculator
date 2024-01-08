import { Body, Controller, Patch, Version } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDescription } from '../response-description';
import { GeneralResponse } from '../../general.response';
import { UpdatePairQuery } from '@pair/application/queries/update-pair';
import { UpdatePairRequestDTO } from './dto/update-pair.request';
import { UpdatePairResponseDTO } from './dto/update-pair.response';

@ApiTags('Pair')
@Controller('pair')
export class UpdatePairController {
  constructor(readonly queryBus: QueryBus) {}

  @Version('1')
  @Patch()
  @ApiCreatedResponse({
    description: ResponseDescription.OK,
    type: UpdatePairResponseDTO,
  })
  @ApiBadRequestResponse({
    description: ResponseDescription.BAD_REQUEST,
    type: GeneralResponse,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
    type: GeneralResponse,
  })
  async updateUser(@Body() body: UpdatePairRequestDTO) {
    const query = new UpdatePairQuery(body.pair, body.value);
    return this.queryBus.execute(query);
  }
}
