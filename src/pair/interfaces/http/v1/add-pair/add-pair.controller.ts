import { Body, Controller, Post, Version } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDescription } from '../response-description';
import { GeneralResponse } from '../../general.response';
import { AddPairQuery } from '@pair/application/queries/add-pair';
import { AddPairRequestDTO } from './dto/add-pair.request';
import { AddPairResponseDTO } from './dto/add-pair.response';

@ApiTags('Pair')
@Controller('pair')
export class AddPairController {
  constructor(readonly queryBus: QueryBus) {}

  @Version('1')
  @Post()
  @ApiCreatedResponse({
    description: ResponseDescription.OK,
    type: AddPairResponseDTO,
  })
  @ApiBadRequestResponse({
    description: ResponseDescription.BAD_REQUEST,
    type: GeneralResponse,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
    type: GeneralResponse,
  })
  async addUser(@Body() body: AddPairRequestDTO) {
    const query = new AddPairQuery(body.pair, body.value);
    return this.queryBus.execute(query);
  }
}
